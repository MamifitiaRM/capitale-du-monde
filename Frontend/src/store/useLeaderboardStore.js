import axios, { getErrorMessage } from "#lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const useLeaderboardStore = create((set) => ({
  leaderboard: [],
  me: null,
  loading: true,

  getLeaderboard: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get("/leaderboard");
      set({ leaderboard: data.leaderboard, me: data.me });
    } catch (error) {
      toast.error(getErrorMessage(error), { id: "leaderboard" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useLeaderboardStore;
