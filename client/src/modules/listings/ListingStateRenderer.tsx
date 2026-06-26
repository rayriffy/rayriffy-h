import { CenterLayout } from "modules/layout/CenterLayout";
import { Loading } from "./Loading";
import { Failure } from "./Failure";
import { Empty } from "./Empty";
import { ListingResultRenderer } from "./ListingResultRenderer";
import type { ListingResult } from "@riffyh/commons";
import type { FunctionComponent } from "react";

interface Props {
  loading: boolean;
  error: Error | null;
  data: ListingResult;
}

export const ListingStateRenderer: FunctionComponent<Props> = ({ data, error, loading }) => {
  if (loading)
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

  return <ListingResultRenderer result={data} />;
};
