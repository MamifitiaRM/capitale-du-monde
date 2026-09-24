import { Link } from "react-router-dom";
import { Title } from "#components";

const NotFound = () => (
  <div className="page max-w-3xl space-y-8">
    <Title />
    <div className="space-y-4 text-center">
      <h1>Page introuvable</h1>
      <Link className="font-semibold text-primary-dark underline" to="/">
        Retourner à l'accueil
      </Link>
    </div>
  </div>
);

export default NotFound;
