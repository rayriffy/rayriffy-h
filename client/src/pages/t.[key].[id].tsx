import { TagListing } from "modules/tag/TagListing";
import { TagDataSourceSelector } from "modules/tag/TagDataSourceSelector";

const Page = () => {
  return (
    <>
      <TagDataSourceSelector />
      <TagListing />
    </>
  );
};

export default Page;
