import { useSearchParams } from "react-router";

interface Props {
  max: number;
}

export const Pagination = ({ max }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const current = Number(searchParams.get("p")) || 1;

  const pageLength = max > 5 ? 5 : max;
  const pageStartAt =
    max > 5
      ? current - 2 < 1
        ? 0
        : current + 2 > max
          ? max - pageLength
          : current - (pageLength - 2)
      : 0;

  const handlePaginate = (page: number) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (page === 1) {
          next.delete("p");
        } else {
          next.set("p", page.toString());
        }
        return next;
      },
      { preventScrollReset: false },
    );
  };

  if (max <= 1) return null;

  return (
    <div className="join">
      {Array.from({ length: pageLength }).map((_, i) => {
        const page = i + pageStartAt + 1;
        return (
          <button
            key={page}
            className={`join-item btn btn-sm${page === current ? " btn-active" : ""}`}
            onClick={() => handlePaginate(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
