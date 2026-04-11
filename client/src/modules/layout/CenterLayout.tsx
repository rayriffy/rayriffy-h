import type { FunctionComponent, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className: string;
}

export const CenterLayout: FunctionComponent<Props> = ({ className, children }) => (
  <section className={`flex flex-col items-center justify-center ${className}`}>{children}</section>
);
