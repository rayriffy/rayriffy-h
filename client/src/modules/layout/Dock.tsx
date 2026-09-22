import { BookmarkIcon, CogIcon, HomeIcon } from "lucide-react";
import { usePath } from "modules/utils/usePath";
import type { FunctionComponent, PropsWithChildren, ComponentProps } from "react";
import { Link, type Path } from "router";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router";

type LinkProps = ComponentProps<typeof Link>;
interface IconProps extends PropsWithChildren, Pick<LinkProps, "to" | "params"> {
  routes: Path[];
}

const DockButton: FunctionComponent<IconProps> = ({ routes, children, ...rest }) => {
  const { pathname } = usePath();
  const navigate = useNavigate();

  return (
    <Button
      isIconOnly
      variant={routes.includes(pathname) ? "primary" : "ghost"}
      aria-label={String(rest.to)}
      onPress={() => navigate(rest.to as string)}
    >
      {children}
    </Button>
  );
};

export const Dock: FunctionComponent = () => {
  return (
    <nav className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-fit gap-2 rounded-2xl border border-default bg-surface/85 p-2 shadow-lg backdrop-blur-xl">
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
