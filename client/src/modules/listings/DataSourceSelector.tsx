import { useActiveServer } from "modules/utils/useActiveServer";
import { useSearchParams } from "react-router";

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
    <div className="relative pt-2 container-lg">
      <div className="scroll-blob-l"></div>
      <div className="scroll-blob-r"></div>
      <div className="scroll-inner">
        {activeServer?.dataSources.map((dataSource) => (
          <button
            className={`chip-input ${dataSource.key === activeKey ? "active" : ""}`.trim()}
            key={`dataSource-${dataSource.key}`}
            onClick={() => handleClick(dataSource.key)}
          >
            <span className="plate">
              <img
                src={dataSource.iconUrl}
                alt={dataSource.name}
                className="w-4 h-4 rounded-sm bg-gray-200"
              />
            </span>
            <span>{dataSource.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
