import { useNavigate } from "react-router-dom";
import { Button } from "#components";
import { continentLabels, levelLabels } from "#data";
import usePlayStore from "#store/usePlayStore";

const OnStop = () => {
  const navigate = useNavigate();
  const { summary, continent, level, start } = usePlayStore();
  const { point, correct, answered, bonus, best, isNewBest, saved, unlocked } =
    summary;

  return (
    <section className="space-y-5">
      <div className="card space-y-4 px-4 py-8 text-center font-semibold md:text-xl">
        <h2>Jeu terminé !</h2>
        {isNewBest && (
          <div className="font-bold text-amber-600">Nouveau record !</div>
        )}
        <div className="text-primary-dark">
          Bonnes réponses : {correct} / {answered}
        </div>
        <div className="text-red-500">Mauvaises réponses : {answered - correct}</div>
        <div>
          Points obtenus : {point} pts
          {bonus > 0 && ` (dont ${bonus} pts de bonus)`}
        </div>
        {saved ? (
          <div className="text-gray-500">Meilleur score : {best} pts</div>
        ) : (
          <div className="text-red-500">
            Ce score n'a pas pu être enregistré.
          </div>
        )}
        {unlocked.length > 0 && (
          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-primary-dark">
            <div>Nouveau niveau débloqué :</div>
            <ul>
              {unlocked.map((item) => (
                <li key={`${item.continent}-${item.level}`}>
                  {continentLabels[item.continent]} - {levelLabels[item.level]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Button onClick={() => start(continent, level)}>Rejouer</Button>
        <Button variant="ghost" onClick={() => navigate(`/continent/${continent}`)}>
          Retour aux niveaux
        </Button>
      </div>
    </section>
  );
};

export default OnStop;
