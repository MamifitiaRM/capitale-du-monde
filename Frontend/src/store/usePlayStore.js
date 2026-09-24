import axios, { getErrorMessage } from "#lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import { computeScore, QUESTIONS_PER_GAME } from "#lib/score";
import useLevelStore from "#store/useLevelStore";
import useUserStore from "#store/useUserStore";

const initialState = {
  status: "idle",
  continent: "",
  level: "",
  questions: [],
  current: 0,
  results: [],
  summary: null,
};

let lastRequest = 0;

const levelKey = ({ continent, level }) => `${continent}:${level}`;

const usePlayStore = create((set, get) => ({
  ...initialState,

  start: async (continent, level) => {
    const request = ++lastRequest;
    set({ ...initialState, continent, level, status: "loading" });
    try {
      const { data } = await axios.get("/question/random", {
        params: { continent, difficulty: level, limit: QUESTIONS_PER_GAME },
      });
      if (request !== lastRequest) return;
      set({
        questions: data.questions,
        status: data.questions.length ? "countdown" : "empty",
      });
    } catch (error) {
      if (request !== lastRequest) return;
      toast.error(getErrorMessage(error));
      set({ status: "error" });
    }
  },

  reset: () => {
    lastRequest++;
    set(initialState);
  },

  beginPlaying: () => set({ status: "playing" }),

  answer: async (answer) => {
    const { questions, current, results } = get();
    const question = questions[current];
    try {
      const { data } = await axios.post("/question/check", {
        questionId: question._id,
        answer,
      });
      set({
        results: [
          ...results,
          { questionId: question._id, answer, correct: data.correct },
        ],
      });
      return data.correctAnswer;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return null;
    }
  },

  next: () => set((state) => ({ current: state.current + 1 })),

  finish: async () => {
    const { results, continent, level } = get();
    const { point, correct } = computeScore(results);
    const localSummary = {
      point,
      correct,
      bonus: 0,
      answered: results.length,
      best: point,
      isNewBest: false,
      saved: false,
      unlocked: [],
    };

    if (!results.length) {
      set({ status: "finished", summary: localSummary });
      return;
    }

    set({ status: "saving" });
    try {
      const previousLevels = useLevelStore.getState().levelInfos ?? [];
      const { data } = await axios.put("/question/applyPoint", {
        continent,
        level,
        answers: results.map(({ questionId, answer }) => ({
          questionId,
          answer,
        })),
      });
      useUserStore.getState().setUser(data.user);
      const levels = await useLevelStore.getState().getLevels();

      const wasLocked = new Set(
        previousLevels.filter((item) => item.isLocked).map(levelKey)
      );
      const unlocked = (levels ?? []).filter(
        (item) => !item.isLocked && wasLocked.has(levelKey(item))
      );

      set({
        status: "finished",
        summary: {
          point: data.point,
          correct: data.correct,
          bonus: data.bonus,
          answered: data.answered,
          best: data.best,
          isNewBest: data.isNewBest,
          saved: true,
          unlocked,
        },
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
      set({ status: "finished", summary: localSummary });
    }
  },
}));

export default usePlayStore;
