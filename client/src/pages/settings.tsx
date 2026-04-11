import { SafeMode } from "modules/settings/SafeMode";
import { Servers } from "modules/settings/Servers";

const Page = () => {
  return (
    <div className="p-4 space-y-4 container-lg">
      <SafeMode />
      <Servers />
    </div>
  );
};

export default Page;
