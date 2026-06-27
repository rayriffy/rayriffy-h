import type { FunctionComponent } from "react";

export interface DataSourceChoice {
  key: string;
  name: string;
  iconUrl: string;
}

interface Props {
  dataSources: DataSourceChoice[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export const DataSourceSelectorUI: FunctionComponent<Props> = ({
  dataSources,
  activeKey,
  onSelect,
}) => {
  if (!dataSources || dataSources.length === 0) return null;

  return (
    <div className="relative pt-2 container-lg">
      <div className="scroll-blob-l"></div>
      <div className="scroll-blob-r"></div>
      <div className="scroll-inner">
        {dataSources.map((dataSource) => (
          <button
            className={`chip-input ${dataSource.key === activeKey ? "active" : ""}`.trim()}
            key={`dataSource-${dataSource.key}`}
            onClick={() => onSelect(dataSource.key)}
          >
            <span className="plate">
              <img src={dataSource.iconUrl} alt="" className="w-4 h-4 rounded-sm bg-gray-200" />
            </span>
            <span>{dataSource.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
