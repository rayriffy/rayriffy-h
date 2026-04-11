import { CenterLayout } from "modules/layout/CenterLayout";
import { SearchBar } from "modules/layout/SearchBar";
import { useEden } from "modules/utils/useEden";
import { Fragment } from "react";
import { DataSourceSelector } from "modules/listings/DataSourceSelector";
import { MainListing } from "modules/listings/MainListing";
import { MissingServer } from "modules/listings/MissingServer";

const Page = () => {
  const eden = useEden();

  if (eden === null)
    return (
      <CenterLayout className="h-[calc(100dvh-4rem)]">
        <MissingServer />
      </CenterLayout>
    );

  return (
    <Fragment>
      <SearchBar />
      <DataSourceSelector />
      <MainListing />
    </Fragment>
  );
};

export default Page;
