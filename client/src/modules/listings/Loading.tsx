import { Fragment, type FunctionComponent } from "react";
import { Spinner } from "@heroui/react";

export const Loading: FunctionComponent = () => (
  <Fragment>
    <Spinner size="lg" />
    <p className="pt-3 text-sm text-muted">Loading…</p>
  </Fragment>
);
