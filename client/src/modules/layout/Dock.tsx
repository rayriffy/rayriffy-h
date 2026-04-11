import { BookmarkIcon, CogIcon, HomeIcon } from "lucide-react";
import { usePath } from "modules/utils/usePath";
import type { FunctionComponent, PropsWithChildren, ComponentProps } from "react";
import { Link, type Path } from "router";

type LinkProps = ComponentProps<typeof Link>;
interface IconProps extends PropsWithChildren, Pick<LinkProps, "to" | "params"> {
  routes: Path[];
}

const DockButton: FunctionComponent<IconProps> = ({ routes, children, ...rest }) => {
  const { pathname } = usePath();

  return (
    <Link
      {...rest}
      className={routes.includes(pathname) ? "dock-active" : undefined}
      to={rest.to as any}
    >
      {children}
    </Link>
  );
};

export const Dock: FunctionComponent = () => {
  return (
    <nav className="dock dock-sm bg-base-100/80 backdrop-blur-lg container-lg">
      <DockButton to="/" routes={["/"]}>
        <HomeIcon className="h-5 w-5" />
      </DockButton>
      <DockButton to="/collection" routes={["/collection"]}>
        <BookmarkIcon className="h-5 w-5" />
      </DockButton>
      <DockButton to="/settings" routes={["/settings"]}>
        <CogIcon className="h-5 w-5" />
      </DockButton>
    </nav>
  );
};
