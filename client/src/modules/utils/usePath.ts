import { useMemo } from "react";
import { useLocation, useParams } from "react-router";
import type { Path } from "router";

export const usePath = () => {
  const { pathname, search } = useLocation();
  const params = useParams();

  const dynamicPathname = useMemo(() => {
    if (typeof params !== "object") return pathname;

    let reconstructedPath = "";
    const routeSegments = pathname.split("/");

    for (const segment of routeSegments) {
      const matchingKey = Object.keys(params).find((key) => params[key] === segment);

      if (matchingKey) {
        reconstructedPath += `/:${matchingKey}`;
      } else if (segment !== "") {
        reconstructedPath += `/${segment}`;
      }
    }

    if (reconstructedPath === "") return "/";

    return reconstructedPath;
  }, [pathname, params]);

  return {
    pathname: dynamicPathname as Path,
    search,
  };
};
