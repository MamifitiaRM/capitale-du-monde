import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { Button, OnPlay, OnStop, Title } from "#components";
import { continentLabels, levelLabels } from "#data";
import usePlayStore from "#store/usePlayStore";

const COUNTDOWN_START = 3;

const Countdown = ({ onDone }) => {
  const [count, setCount] = useState(COUNTDOWN_START);

  useEffect(() => {
    if (count === 0) {
      onDone();
      return;
    }
    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onDone]);

  return (
    <div className="grid space-y-2 pt-20 text-center text-green-800">
      <span className="text-7xl" role="timer">
        {count}
      </span>
      <span className="text-4xl">Soyez prêt !</span>
    </div>
  );
};

const Play = () => {
  const { continent, level } = useParams();
  const navigate = useNavigate();
  const { status, current, start, reset, beginPlaying } = usePlayStore();
  const isValid = Boolean(continentLabels[continent] && levelLabels[level]);

  useEffect(() => {
    if (!isValid) return;
    start(continent, level);
    return reset;
  }, [continent, level, isValid, start, reset]);

  if (!isValid) return <Navigate to="/" replace />;

  const renderContent = () => {
    switch (status) {
      case "countdown":
        return <Countdown onDone={beginPlaying} />;
      case "playing":
        return <OnPlay key={current} />;
      case "finished":
        return <OnStop />;
      case "empty":
      case "error":
        return (
          <div className="card space-y-5 px-4 py-8 text-center">
            <p className="text-lg">
              {status === "empty"
                ? "Aucune question n'est disponible pour ce niveau."
                : "Impossible de charger le quiz."}
            </p>
            <Button onClick={() => navigate(`/continent/${continent}`)}>
              Retour aux niveaux
            </Button>
          </div>
        );
      default:
        return (
          <div
            className="flex items-center justify-center gap-4 pt-20"
            role="status"
          >
            <Loader className="animate-spin" size={32} />
            <span>{status === "saving" ? "Enregistrement..." : "Chargement..."}</span>
          </div>
        );
    }
  };

  return (
    <div className="page max-w-3xl space-y-6">
      <header className="space-y-3">
        <Title />
        <Link
          to={`/continent/${continent}`}
          className="inline-block text-sm text-primary-dark underline"
        >
          Quitter le quiz : {continentLabels[continent]} -{" "}
          {levelLabels[level].toLowerCase()}
        </Link>
      </header>
      {renderContent()}
    </div>
  );
};

export default Play;
