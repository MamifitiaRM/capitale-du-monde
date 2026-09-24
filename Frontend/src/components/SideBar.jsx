import { NavLinks } from "#components";

const SideBar = () => (
  <nav
    aria-label="Navigation principale"
    className="card hidden self-start p-3 md:sticky md:top-4 md:col-span-2 md:block"
  >
    <ul className="space-y-3">
      <NavLinks />
    </ul>
  </nav>
);

export default SideBar;
