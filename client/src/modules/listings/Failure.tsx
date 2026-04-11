import { ServerCrashIcon } from "lucide-react";
import type { FunctionComponent } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  error: Error;
}

export const Failure: FunctionComponent<Props> = ({ error }) => (
  <Fragment>
    <ServerCrashIcon className="w-8 h-8" />
    <p className="pt-4 font-medium text-content">Unable to fetch data</p>
    <p className="text-sm">{error.message}</p>
  </Fragment>
);
