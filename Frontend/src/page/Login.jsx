import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthAside, Button, Input } from "#components";
import useUserStore from "#store/useUserStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="authentication-main">
      <AuthAside />
      <div className="authentication-children">
        <h1>Se connecter</h1>
        <form className="space-y-5 md:space-y-8" onSubmit={handleSubmit}>
          <Input
            title="Email"
            placeholder="Entrez votre adresse email"
            type="email"
            autoComplete="email"
            setUserData={setEmail}
            inputValue={email}
          />
          <Input
            title="Mot de passe"
            placeholder="Entrez votre mot de passe"
            type="password"
            autoComplete="current-password"
            setUserData={setPassword}
            inputValue={password}
          />
          <Button type="submit" loading={loading}>
            Se connecter
          </Button>
          <div className="text-center italic">
            Vous n'avez pas de compte ?{" "}
            <Link className="font-semibold text-primary-dark underline" to="/signup">
              S'inscrire
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
