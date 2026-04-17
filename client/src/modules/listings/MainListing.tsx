import { useQuery } from "@tanstack/react-query";
import { CenterLayout } from "modules/layout/CenterLayout";
import { useActiveServer } from "modules/utils/useActiveServer";
import { useEden } from "modules/utils/useEden";
import { useSearchParams } from "react-router";
import { Loading } from "./Loading";
import { Failure } from "./Failure";
import { ListingResultRenderer } from "./ListingResultRenderer";
import { Empty } from "./Empty";

export const MainListing = () => {
  const [searchParams] = useSearchParams();
  const activeServer = useActiveServer();
  const eden = useEden();

  const query = searchParams.get("q");
  const activeKey = searchParams.get("k") || activeServer?.dataSources?.[0]?.key;
  const page = Number(searchParams.get("p")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["listing", query, activeKey, page],
    queryFn: async () => {
      const response = await eden!.listing.get({
        query: {
          query: query || undefined,
          page,
          dataSource: activeKey!,
        },
      });

      return response.data;
    },
  });

  if (isLoading)
    return (
      <CenterLayout className="min-h-[calc(100dvh-9.75rem)]">
        <Loading />
      </CenterLayout>
    );

  if (error)
    return (
      <CenterLayout className="min-h-[calc(100dvh-9.75rem)]">
        <Failure error={error} />
      </CenterLayout>
    );

  if (data?.galleries.length === 0)
    return (
      <CenterLayout className="min-h-[calc(100dvh-9.75rem)]">
        <Empty />
      </CenterLayout>
    );

  return <ListingResultRenderer result={data!} />;
};
