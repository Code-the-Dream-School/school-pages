/**
 * Dumb anchor tag wrapper which applies tailwind styles; not a fancy router
 * link or anything like that!
 */
export const Link = (props: {
  className?: string;
  href: string;
  children: React.ReactNode;
}) => (
  <a
    className={"text-blue-500 visited:text-purple-500" + props.className || ""}
    href={props.href}
  >
    {props.children}
  </a>
);
