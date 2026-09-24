import { Link } from "react-router-dom";
import { LockKeyhole, UnlockKeyhole } from "lucide-react";
import { levelLabels } from "#data";
import { describeUnlock, getUnlockProgress } from "#lib/progress";
import useUserStore from "#store/useUserStore";

const LevelCard = ({ continent, level, isLocked, best, unlock }) => {
  const { user } = useUserStore();
  const title = (
    <h4 className="text-2xl">
      Niveau : <b>{levelLabels[level]}</b>
    </h4>
  );

  if (isLocked) {
    const { current, goal } = getUnlockProgress(unlock, user);
    return (
      <div
        className="level-card border-gray-700 bg-gray-400 text-gray-900 shadow-[4px_4px_8px_gray]"
        aria-disabled="true"
      >
        {title}
        <p>{describeUnlock(unlock)}</p>
        <div className="w-full max-w-xs">
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-gray-700"
              style={{ width: `${Math.min((current / goal) * 100, 100)}%` }}
            />
          </div>
          <div className="mt-1 text-sm">
            {current} / {goal} pts
          </div>
        </div>
        <LockKeyhole size={30} />
      </div>
    );
  }

  return (
    <Link
      to={`/play/${continent}/${level}`}
      className="level-card border-green-800 bg-primary text-emerald-950 shadow-[4px_4px_8px_green] duration-200 hover:scale-[1.03]"
    >
      {title}
      <p>
        {best > 0
          ? `Meilleur score : ${best} pts`
          : "Commencez et gagnez le plus de points possible !"}
      </p>
      <UnlockKeyhole size={30} />
    </Link>
  );
};

export default LevelCard;
