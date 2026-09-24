import { Link, useLocation } from "react-router-dom";
import { Home, LogOut, Trophy, User } from "lucide-react";
import useUserStore from "#store/useUserStore";

const items = [
  {
    to: "/",
    label: "Accueil",
    icon: Home,
    isActive: (path) =>
      path === "/" || path.startsWith("/continent") || path.startsWith("/play"),
    idle: "text-primary-dark hover:bg-primary hover:text-emerald-950",
    active: "bg-primary-dark text-white",
  },
  {
    to: "/classement",
    label: "Classement",
    icon: Trophy,
    isActive: (path) => path === "/classement",
    idle: "text-amber-600 hover:bg-amber-400 hover:text-white",
    active: "bg-amber-600 text-white",
  },
  {
    to: "/account",
    label: "Mon compte",
    icon: User,
    isActive: (path) => path === "/account",
    idle: "text-gray-800 hover:bg-gray-800 hover:text-white",
    active: "bg-gray-800 text-white",
  },
];

const NavLinks = ({ onNavigate }) => {
  const { logout } = useUserStore();
  const { pathname } = useLocation();

  return (
    <>
      {items.map((item) => {
        const { to, label, isActive, idle, active } = item;
        const Icon = item.icon;
        const current = isActive(pathname);
        return (
          <li key={to}>
            <Link
              to={to}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={`nav-link ${current ? active : idle}`}
            >
              <Icon size={30} />
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
      <li>
        <button
          type="button"
          className="nav-link text-red-600 hover:bg-red-600 hover:text-white"
          onClick={logout}
        >
          <LogOut size={30} />
          <span>Se déconnecter</span>
        </button>
      </li>
    </>
  );
};

export default NavLinks;
