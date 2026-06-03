import { SafeMode } from "modules/settings/SafeMode";
import { Servers } from "modules/settings/Servers";
import { CollectionSync } from "modules/settings/CollectionSync";

const Page = () => {
  return (
    <div className="p-4 space-y-4 container-lg">
      <SafeMode />
      <Servers />
      <CollectionSync />
    </div>
  );
};

export default Page;
