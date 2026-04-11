import { useState, useEffect } from "react";
import { treaty } from "@elysiajs/eden";
import type { Server as AppServer } from "@riffyh/server";
import { addServer, updateServer } from "modules/atoms/serversAtom";
import type { Server } from "modules/types/Server";
import { AlertCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  editServerIndex?: number;
  initialServer?: Server;
}

export const ServerModal = ({
  isOpen,
  onClose,
  editServerIndex,
  initialServer,
}: ServerModalProps) => {
  const [baseUrl, setBaseUrl] = useState("");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialServer) {
        setBaseUrl(initialServer.config.baseUrl);
        const initialHeaders = Object.entries(initialServer.config.headers).map(([key, value]) => ({
          key,
          value,
        }));
        setHeaders(initialHeaders);
      } else {
        setBaseUrl("");
        setHeaders([]);
      }
      setError(null);
    }
  }, [isOpen, initialServer]);

  const handleSave = async () => {
    setError(null);
    setIsLoading(true);

    const parsedHeaders = headers.reduce(
      (acc, curr) => {
        const k = curr.key.trim();
        const v = curr.value.trim();
        if (k) {
          acc[k] = v;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    const cleanBaseUrl = baseUrl.trim().replace(/\/+$/, "");
    if (!cleanBaseUrl) {
      setError("Base URL is required.");
      setIsLoading(false);
      return;
    }

    try {
      const api = treaty<AppServer>(cleanBaseUrl, {
        headers: parsedHeaders,
      });

      const { data, error: fetchError } = await api.dataSources.get();

      if (fetchError) {
        setError(
          `Failed to fetch data sources: ${fetchError.status} ${JSON.stringify(fetchError.value)}`,
        );
        setIsLoading(false);
        return;
      }

      if (!data) {
        setError("No data returned from the server.");
        setIsLoading(false);
        return;
      }

      const serverConfig: Omit<Server, "active"> = {
        config: {
          baseUrl: cleanBaseUrl,
          headers: parsedHeaders,
        },
        dataSources: data,
      };

      if (editServerIndex !== undefined) {
        updateServer(editServerIndex, serverConfig);
      } else {
        addServer(serverConfig);
      }

      onClose();
    } catch (err) {
      setError(
        "Failed to connect to server: " + (err instanceof Error ? err.message : String(err)),
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {editServerIndex !== undefined ? "Edit Server" : "Add Server"}
        </h3>

        {error && (
          <div className="alert alert-error mb-4 text-sm p-3">
            <AlertCircleIcon className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Base URL</span>
            </label>
            <input
              type="text"
              placeholder="http://localhost:3000"
              className="input input-bordered w-full"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Custom Headers</span>
            </label>
            <div className="space-y-2">
              {headers.map((h, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered input-sm flex-1"
                    value={h.key}
                    onChange={(e) => {
                      const newHeaders = [...headers];
                      newHeaders[i].key = e.target.value;
                      setHeaders(newHeaders);
                    }}
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="input input-bordered input-sm flex-1"
                    value={h.value}
                    onChange={(e) => {
                      const newHeaders = [...headers];
                      newHeaders[i].value = e.target.value;
                      setHeaders(newHeaders);
                    }}
                    disabled={isLoading}
                  />
                  <button
                    className="btn btn-ghost btn-sm btn-circle text-error"
                    onClick={() => setHeaders(headers.filter((_, idx) => idx !== i))}
                    disabled={isLoading}
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                className="btn btn-ghost btn-sm text-primary w-full border border-dashed border-base-300"
                onClick={() => setHeaders([...headers, { key: "", value: "" }])}
                disabled={isLoading}
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Header
              </button>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave} disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Save"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={() => !isLoading && onClose()}>
        <button className="cursor-default">close</button>
      </div>
    </dialog>
  );
};
