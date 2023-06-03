import { HamburgerIcon } from "./hamburger";
import { navLocations } from "./nav";

export const Header = () => (
  <header className="flex gap-3 p-4 bg-salmon-300">
    <a href="/">
      <img
        className="sm:w-48 bg-salmon-100 p-2 rounded-xl"
        src="/ctdLogo.webp"
      />
    </a>
    <div className="gap-2 items-center sm:flex hidden">
      {navLocations.map(({ href, display }) =>
        typeof display === "string" ? (
          <NavLink key={href} href={href}>
            {display}
          </NavLink>
        ) : (
          display
        )
      )}
    </div>
    <a className="sm:hidden" href="/mobile-nav">
      <HamburgerIcon />
    </a>
  </header>
);

// This lives here because we probably only want this styling in the header
const NavLink = (props: { children: React.ReactNode; href: string }) => (
  <a
    className="underline font-bold hover:bg-salmon-100 rounded p-1 transition"
    href={props.href}
  >
    {props.children}
  </a>
);
