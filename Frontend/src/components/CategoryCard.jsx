import { Link } from "react-router-dom";
import { continentLabels } from "#data";

const CategoryCard = ({ continent, description, color, points }) => (
  <Link
    to={`/continent/${continent}`}
    className={`flex flex-col justify-between gap-4 rounded-sm border-2 px-6 py-7 text-left text-white duration-300 hover:scale-[1.02] ${color}`}
  >
    <div className="space-y-3">
      <h3>{continentLabels[continent]}</h3>
      <p className="text-lg">{description}</p>
    </div>
    <span className="text-sm font-semibold">
      {points > 0 ? `${points} pts gagnés` : "Pas encore joué"}
    </span>
  </Link>
);

export default CategoryCard;
