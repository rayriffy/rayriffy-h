import { CircleQuestionMarkIcon } from "lucide-react";
import type { FunctionComponent } from "react";
import { Fragment } from "react/jsx-runtime";

export const Empty: FunctionComponent = () => (
  <Fragment>
    <CircleQuestionMarkIcon className="w-8 h-8" />
    <p className="pt-4 font-medium text-content">Query returned empty results</p>
    <p className="text-sm">Please adjust your search query, and try again.</p>
  </Fragment>
);
