import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthAside, Button, Input } from "#components";
import useUserStore from "#store/useUserStore";

const Signup = () => {
  const { register, loading } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <div className="authentication-main">
      <AuthAside />
      <div className="authentication-children">
        <h1>S'inscrire</h1>
        <form className="space-y-5 md:space-y-8" onSubmit={handleSubmit}>
          <Input
            title="Nom"
            placeholder="Entrez votre nom"
            autoComplete="name"
            setUserData={setName}
            inputValue={name}
          />
          <Input
            title="Email"
            placeholder="Entrez votre email"
            type="email"
            autoComplete="email"
            setUserData={setEmail}
            inputValue={email}
          />
          <Input
            title="Mot de passe (8 caractères minimum)"
            placeholder="Entrez un mot de passe"
            type="password"
            autoComplete="new-password"
            minLength={8}
            setUserData={setPassword}
            inputValue={password}
          />
          <Button type="submit" loading={loading}>
            S'inscrire
          </Button>
          <div className="text-center italic">
            Vous avez déjà un compte ?{" "}
            <Link className="font-semibold text-primary-dark underline" to="/login">
              Se connecter
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
