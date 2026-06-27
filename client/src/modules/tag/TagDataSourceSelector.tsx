import { useActiveServer } from "modules/utils/useActiveServer";
import { useNavigate, useParams } from "router";
import { DataSourceSelectorUI } from "modules/listings/DataSourceSelectorUI";

export const TagDataSourceSelector = () => {
  const activeServer = useActiveServer();
  const navigate = useNavigate();
  const { key, id } = useParams("/t/:key/:id");

  // If there's no store datasource, we don't render the selector
  const storeDataSource = activeServer?.dataSources.find((ds) => ds.key === "store");
  if (!storeDataSource) return null;

  // Determine the original datasource and original id
  let originalKey = key;
  let originalId = id;

  if (key === "store" && id) {
    const parts = id.split(";");
    if (parts.length === 2) {
      originalKey = parts[0];
      originalId = parts[1];
    }
  }

  // Find the original datasource object
  const originalDataSource = activeServer?.dataSources.find((ds) => ds.key === originalKey);
  if (!originalDataSource) return null;

  const choices = [originalDataSource, storeDataSource];

  const handleClick = (targetKey: string) => {
    if (targetKey === key) return; // already active

    if (targetKey === "store") {
      navigate("/t/:key/:id", { params: { key: "store", id: `${originalKey};${originalId}` } });
    } else {
      navigate("/t/:key/:id", { params: { key: originalKey, id: originalId } });
    }
  };

  return <DataSourceSelectorUI dataSources={choices} activeKey={key} onSelect={handleClick} />;
};
