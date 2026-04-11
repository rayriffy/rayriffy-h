import { useState } from "react";
import {
  InfoIcon,
  PlusIcon,
  RefreshCcwIcon,
  PencilIcon,
  Trash2Icon,
  CheckCircleIcon,
  ServerIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  useServersAtom,
  removeServer,
  setActiveServer,
  updateServer,
} from "modules/atoms/serversAtom";
import { ServerModal } from "./ServerModal";
import { treaty } from "@elysiajs/eden";
import type { Server as AppServer } from "@riffyh/server";
import type { Server } from "modules/types/Server";

export const Servers = () => {
  const servers = useServersAtom();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editServerIndex, setEditServerIndex] = useState<number | undefined>(undefined);
  const [refreshingIndex, setRefreshingIndex] = useState<number | null>(null);
  const [refreshError, setRefreshError] = useState<string | null>(null);

  const handleAdd = () => {
    setEditServerIndex(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (index: number) => {
    setEditServerIndex(index);
    setIsModalOpen(true);
  };

  const handleRefresh = async (index: number, server: Server) => {
    setRefreshingIndex(index);
    setRefreshError(null);
    try {
      const api = treaty<AppServer>(server.config.baseUrl, {
        headers: server.config.headers,
      });

      const { data, error } = await api.dataSources.get();

      if (error) {
        setRefreshError(
          `Failed to refresh data sources: ${error.status} ${JSON.stringify(error.value)}`,
        );
      } else if (data) {
        updateServer(index, {
          ...server,
          dataSources: data,
        });
      }
    } catch (err) {
      setRefreshError(
        "Failed to connect to server: " + (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setRefreshingIndex(null);
    }
  };

  return (
    <section className="card bg-base-100 border border-base-300">
      <div className="card-body">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="card-title">Servers</h2>
              <p>Configure available servers, and select the server to use.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>
              <PlusIcon className="w-4 h-4" />
              Add Server
            </button>
          </div>

          <div role="alert" className="alert">
            <InfoIcon className="stroke-info h-6 w-6 shrink-0" />
            <span>You can follow this instruction to host your own server.</span>
          </div>

          {refreshError && (
            <div className="alert alert-error text-sm p-3 flex justify-between">
              <div className="flex gap-2 items-center">
                <AlertCircleIcon className="w-5 h-5 shrink-0" />
                <span>{refreshError}</span>
              </div>
              <button
                onClick={() => setRefreshError(null)}
                className="btn btn-ghost btn-xs btn-circle"
              >
                ✕
              </button>
            </div>
          )}

          <div className="space-y-3 mt-4">
            {servers.length === 0 ? (
              <div className="text-center py-8 text-base-content/50 border border-dashed border-base-300 rounded-box">
                <ServerIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>No servers configured.</p>
              </div>
            ) : (
              servers.map((server, index) => (
                <div
                  key={`${server.config.baseUrl}-${index}`}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-box gap-4 ${
                    server.active ? "border-primary bg-primary/5" : "border-base-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <ServerIcon
                        className={`w-5 h-5 ${server.active ? "text-primary" : "text-base-content/50"}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        {server.config.baseUrl}
                        {server.active && (
                          <span className="badge badge-primary badge-sm">Active</span>
                        )}
                      </h3>
                      <p className="text-sm opacity-70">
                        {server.dataSources.length} data source
                        {server.dataSources.length !== 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <div className="tooltip" data-tip="Refresh Data Sources">
                      <button
                        className="btn btn-sm btn-ghost btn-circle"
                        onClick={() => handleRefresh(index, server)}
                        disabled={refreshingIndex === index}
                      >
                        {refreshingIndex === index ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <RefreshCcwIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Edit">
                      <button
                        className="btn btn-sm btn-ghost btn-circle"
                        onClick={() => handleEdit(index)}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="tooltip" data-tip="Remove">
                      <button
                        className="btn btn-sm btn-ghost btn-circle text-error hover:bg-error/20"
                        onClick={() => removeServer(index)}
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </button>
                    </div>
                    {!server.active && (
                      <button
                        className="btn btn-sm btn-outline ml-2"
                        onClick={() => setActiveServer(index)}
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Set Active
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ServerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editServerIndex={editServerIndex}
        initialServer={editServerIndex !== undefined ? servers[editServerIndex] : undefined}
      />
    </section>
  );
};
