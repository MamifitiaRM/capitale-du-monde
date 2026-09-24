import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { LevelCard, MainView } from "#components";
import { continentLabels, levelOrder } from "#data";
import useLevelStore from "#store/useLevelStore";

const Continent = () => {
  const { id } = useParams();
  const { levelInfos } = useLevelStore();

  if (!continentLabels[id]) return <Navigate to="/" replace />;

  const levels = (levelInfos ?? [])
    .filter((item) => item.continent === id)
    .sort((a, b) => levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level));

  return (
    <MainView>
      <div className="space-y-6 text-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary-dark hover:underline"
        >
          <ArrowLeft size={20} />
          Retour à l'accueil
        </Link>
        <h2 className="md:py-4">
          {id === "all"
            ? continentLabels.all
            : `Continent : ${continentLabels[id]}`}
        </h2>
        {levelInfos ? (
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-x-8">
            {levels.map((item) => (
              <LevelCard key={item.level} {...item} />
            ))}
          </div>
        ) : (
          <Loader className="mx-auto animate-spin" size={32} />
        )}
      </div>
    </MainView>
  );
};

export default Continent;
