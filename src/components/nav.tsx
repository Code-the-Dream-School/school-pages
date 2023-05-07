import { HamburgerIcon } from "./hamburger";
import { Link } from "./link";

export const navLocations: {
  href: string;
  display: string | React.ReactNode;
}[] = [
  {
    display: "Home",
    href: "/",
  },
  {
    display: "Node/Express Course",
    href: "/node-express",
  },
  {
    display: "Homework Tips",
    href: "/general/homework-tips",
  },
];

export const MobileNavPage = () => (
  <div className="h-screen bg-salmon-50 flex flex-col items-end pt-4 pr-4 gap-3">
    <a href="javascript:history.back()">
      <HamburgerIcon />
    </a>
    {navLocations.map(({ href, display }) =>
      typeof display === "string" ? (
        <Link className="text-lg" href={href}>
          {display}
        </Link>
      ) : (
        display
      )
    )}
  </div>
);
