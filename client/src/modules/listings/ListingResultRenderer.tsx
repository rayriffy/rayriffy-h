import type { ListingResult } from "@riffyh/commons";
import { Fragment, type FunctionComponent } from "react";
import { Pagination } from "./Pagination";
import { Link } from "router";
import { Poster } from "./Poster";

interface Props {
  result: ListingResult;
}

export const ListingResultRenderer: FunctionComponent<Props> = ({ result }) => {
  const pagination = (
    <section className="flex justify-center py-6">
      <Pagination max={result.maximumPages || 1} />
    </section>
  );

  return (
    <Fragment>
      {pagination}
      <section className="gallery-grid">
        {result.galleries.map((gallery) => (
          <Link key={gallery.id} to="/g/:key/:id" params={{ key: gallery.key, id: gallery.id }}>
            <Poster gallery={gallery} />
          </Link>
        ))}
      </section>
      {pagination}
    </Fragment>
  );
};
