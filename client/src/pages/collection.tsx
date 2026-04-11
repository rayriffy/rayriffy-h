import { CenterLayout } from "modules/layout/CenterLayout";
import { SearchBar } from "modules/layout/SearchBar";
import { Failure } from "modules/listings/Failure";
import { ListingResultRenderer } from "modules/listings/ListingResultRenderer";
import { Loading } from "modules/listings/Loading";
import { useCollectionListing } from "modules/listings/useCollectionListing";
import { Fragment } from "react";

const Page = () => {
  const { data, isLoading, error } = useCollectionListing();
  return (
    <Fragment>
      <SearchBar />

      {isLoading ? (
        <CenterLayout className="min-h-[calc(100dvh-7.75rem)]">
          <Loading />
        </CenterLayout>
      ) : error ? (
        <CenterLayout className="min-h-[calc(100dvh-7.75rem)]">
          <Failure error={error} />
        </CenterLayout>
      ) : (
        <ListingResultRenderer result={data!} />
      )}
    </Fragment>
  );
};

export default Page;
