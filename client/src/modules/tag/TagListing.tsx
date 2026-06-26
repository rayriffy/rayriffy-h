import { useQuery } from "@tanstack/react-query";
import { ListingStateRenderer } from "modules/listings/ListingStateRenderer";
import { useEden } from "modules/utils/useEden";
import { useSearchParams } from "react-router";
import { useParams } from "router";

export const TagListing = () => {
  const { key, id } = useParams("/t/:key/:id");
  const [searchParams] = useSearchParams();
  const eden = useEden();

  const page = Number(searchParams.get("p")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["tagListing", id, key, page],
    queryFn: async () => {
      const response = await eden!.tag.get({
        query: {
          id: id,
          page,
          dataSource: key,
        },
      });

      return response.data;
    },
  });

  return <ListingStateRenderer loading={isLoading} error={error} data={data!} />;
};
