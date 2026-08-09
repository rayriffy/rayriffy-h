import type { Gallery } from "@riffyh/commons";
import { useEffect, useRef, type FunctionComponent } from "react";
import { BlurredImage } from "modules/layout/BlurredImage";

interface Props {
  dataSource: string;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  pages: Gallery["pages"];
}

export const GalleryPages: FunctionComponent<Props> = ({
  dataSource,
  error,
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
  pages,
}) => {
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onLoadMore();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <section className="overflow-hidden container-4xl">
      {pages.map((page) => (
        <BlurredImage
          key={`reader-${page.order}`}
          dataSource={dataSource}
          src={page.src}
          width={page.width}
          height={page.height}
          alt={`page ${page.order}`}
        />
      ))}
      {error && (
        <div className="alert alert-error mx-auto my-8 max-w-xl" role="alert">
          <span>{error.message}</span>
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center py-8">
          <button
            ref={loadMoreRef}
            type="button"
            className="btn btn-primary min-w-40"
            disabled={isFetchingNextPage}
            onClick={onLoadMore}
          >
            {isFetchingNextPage ? "Loading pages…" : "Load more"}
          </button>
        </div>
      )}
      {!hasNextPage && pages.length === 0 && !error && (
        <p className="py-12 text-center text-sm text-base-content/60">This gallery has no pages.</p>
      )}
    </section>
  );
};
