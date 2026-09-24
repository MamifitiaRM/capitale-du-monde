import { useCallback, useEffect, useState } from "react";
import { Button } from "#components";
import usePlayStore from "#store/usePlayStore";
import {
  computeScore,
  STREAK_LENGTH,
  TIME_PER_QUESTION,
} from "#lib/score";

const OnPlay = () => {
  const { questions, current, results, answer, next, finish } = usePlayStore();
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [feedback, setFeedback] = useState(null);
  const [pending, setPending] = useState(false);

  const question = questions[current];
  const isLast = current === questions.length - 1;
  const { point, streak } = computeScore(results);
  const lastResult = feedback ? results[results.length - 1] : null;
  const bonusEarned = lastResult?.correct && streak === 0;

  const submit = useCallback(
    async (option) => {
      setPending(true);
      const correctAnswer = await answer(option);
      setPending(false);
      setFeedback({ chosen: option, correctAnswer });
    },
    [answer]
  );

  useEffect(() => {
    if (feedback || pending) return;
    const expired = timeLeft === 0;
    const timer = setTimeout(
      () => (expired ? submit(null) : setTimeLeft((time) => time - 1)),
      expired ? 0 : 1000
    );
    return () => clearTimeout(timer);
  }, [timeLeft, feedback, pending, submit]);

  const optionStyle = (option) => {
    if (!feedback) return "border-gray-200 bg-white hover:bg-gray-100";
    if (option === feedback.correctAnswer) {
      return "border-primary-dark bg-primary-dark text-white";
    }
    if (option === feedback.chosen) return "border-red-500 bg-red-500 text-white";
    return "border-gray-200 bg-white text-gray-400";
  };

  const message = () => {
    if (!feedback) return "";
    if (feedback.correctAnswer === null) return "Réponse non enregistrée";
    if (feedback.chosen === null) return "Temps écoulé";
    if (!lastResult?.correct) return "Mauvaise réponse";
    return bonusEarned
      ? `Bonne réponse ! Série de ${STREAK_LENGTH}, points bonus gagnés`
      : "Bonne réponse !";
  };

  return (
    <section className="space-y-5">
      <div className="card grid grid-cols-3 gap-2 px-3 py-4 text-center font-semibold md:px-10 md:text-xl">
        <div>
          Points
          <div className="text-primary-dark">{point} pts</div>
        </div>
        <div>
          Temps
          <div className={timeLeft <= 3 ? "text-red-500" : "text-primary-dark"}>
            {timeLeft} s
          </div>
        </div>
        <div>
          Question
          <div className="text-primary-dark">
            {current + 1} / {questions.length}
          </div>
        </div>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-gray-200"
        role="presentation"
      >
        <div
          className={`h-full duration-1000 ease-linear ${
            timeLeft <= 3 ? "bg-red-500" : "bg-primary"
          }`}
          style={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
        />
      </div>

      <div className="card space-y-5 px-3 py-8 text-center md:px-8">
        <h2>
          Quelle est la capitale de :{" "}
          <span className="text-primary-dark">{question.country}</span>
        </h2>
        <ul className="space-y-3">
          {question.options.map((option) => (
            <li key={option}>
              <button
                type="button"
                disabled={Boolean(feedback) || pending}
                className={`option-button ${optionStyle(option)}`}
                onClick={() => submit(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex min-h-6 items-center justify-center gap-3">
          <div
            className="flex gap-1.5"
            aria-label={`Série : ${streak} sur ${STREAK_LENGTH}`}
          >
            {Array.from({ length: STREAK_LENGTH }, (_, index) => (
              <span
                key={index}
                className={`size-3 rounded-full ${
                  index < streak ? "bg-amber-400" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="font-semibold" role="status">
            {message()}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="danger" onClick={finish}>
          Arrêter
        </Button>
        <Button disabled={!feedback} onClick={isLast ? finish : next}>
          {isLast ? "Voir le résultat" : "Continuer"}
        </Button>
      </div>
    </section>
  );
};

export default OnPlay;
