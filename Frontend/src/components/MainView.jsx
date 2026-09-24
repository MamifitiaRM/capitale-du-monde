import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLinks, SideBar, Title } from "#components";

const MainView = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="page">
      <header className="space-y-4">
        <Title />
        <div className="relative md:hidden">
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-xl px-1 py-1 font-medium text-primary-dark"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={36} /> : <Menu size={36} />}
            Menu
          </button>
          <nav
            id="mobile-menu"
            aria-label="Navigation principale"
            className={`card absolute inset-x-0 top-full z-20 mt-2 p-3 ${
              menuOpen ? "" : "hidden"
            }`}
          >
            <ul className="space-y-1">
              <NavLinks onNavigate={() => setMenuOpen(false)} />
            </ul>
          </nav>
        </div>
      </header>

      <section className="mt-4 gap-5 md:grid md:grid-cols-12">
        <SideBar />
        <div className="min-w-0 md:col-span-10">{children}</div>
      </section>
    </div>
  );
};

export default MainView;
