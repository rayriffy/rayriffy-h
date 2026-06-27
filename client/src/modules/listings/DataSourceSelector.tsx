import { useActiveServer } from "modules/utils/useActiveServer";
import { useSearchParams } from "react-router";
import { DataSourceSelectorUI } from "./DataSourceSelectorUI";

export const DataSourceSelector = () => {
  const activeServer = useActiveServer();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeKey = searchParams.get("k") || activeServer?.dataSources?.[0]?.key;

  const handleClick = (key: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("k", key);
      return newParams;
    });
  };

  return (
    <DataSourceSelectorUI
      dataSources={activeServer?.dataSources ?? []}
      activeKey={activeKey ?? ""}
      onSelect={handleClick}
    />
  );
};
