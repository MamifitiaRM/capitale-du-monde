import { Flag } from "lucide-react";
import { Title } from "#components";

const AuthAside = () => (
  <aside className="flex flex-col justify-center lg:col-span-5 lg:space-y-10 lg:bg-primary lg:px-10 xl:px-24">
    <div className="lg:space-y-8">
      <Title />
      <h3 className="lg-only text-white">
        Testez vos connaissances et devinez toutes les capitales du monde !
      </h3>
      <p className="lg-only text-lg text-white">
        Connectez-vous pour enregistrer vos points et vous classer.
      </p>
    </div>
    <div className="hidden items-center justify-center gap-5 lg:flex">
      <Flag fill="red" />
      <Flag fill="blue" />
      <Flag fill="green" />
    </div>
  </aside>
);

export default AuthAside;
