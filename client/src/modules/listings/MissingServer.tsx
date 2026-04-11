import { ServerOffIcon } from "lucide-react";
import { Fragment } from "react";
import { Link } from "router";

export const MissingServer = () => (
  <Fragment>
    <ServerOffIcon className="w-8 h-8" />
    <p className="pt-4 font-medium text-content">No active server</p>
    <p className="text-sm">
      Please configure a server on the{" "}
      <Link to="/settings" className="text-primary">
        settings page
      </Link>
    </p>
  </Fragment>
);
