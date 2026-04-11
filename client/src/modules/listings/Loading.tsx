import { Fragment, type FunctionComponent } from "react";

export const Loading: FunctionComponent = () => (
  <Fragment>
    <progress className="progress w-56"></progress>
    <p className="pt-2 text-sm text-base-content">Loading...</p>
  </Fragment>
);
