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
import { Alert, Button, Card, Chip, Spinner, Tooltip } from "@heroui/react";

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
    <Card variant="secondary">
      <Card.Content>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Card.Title>Servers</Card.Title>
              <Card.Description>
                Configure available servers and select the one to use.
              </Card.Description>
            </div>
            <Button size="sm" onPress={handleAdd}>
              <PlusIcon className="w-4 h-4" />
              Add Server
            </Button>
          </div>

          <Alert status="accent">
            <Alert.Indicator>
              <InfoIcon />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Description>
                You can follow the documentation to host your own server.
              </Alert.Description>
            </Alert.Content>
          </Alert>

          {refreshError && (
            <Alert status="danger" className="text-sm">
              <div className="flex gap-2 items-center">
                <AlertCircleIcon className="w-5 h-5 shrink-0" />
                <span>{refreshError}</span>
              </div>
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                onPress={() => setRefreshError(null)}
                aria-label="Dismiss error"
              >
                ✕
              </Button>
            </Alert>
          )}

          <div className="space-y-3 mt-4">
            {servers.length === 0 ? (
              <div className="text-center py-8 text-muted border border-dashed border-default rounded-2xl">
                <ServerIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>No servers configured.</p>
              </div>
            ) : (
              servers.map((server, index) => (
                <div
                  key={`${server.config.baseUrl}-${index}`}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-box gap-4 ${
                    server.active ? "border-accent bg-accent/5" : "border-default"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <ServerIcon
                        className={`w-5 h-5 ${server.active ? "text-accent" : "text-muted"}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        {server.config.baseUrl}
                        {server.active && (
                          <Chip color="accent" size="sm">
                            Active
                          </Chip>
                        )}
                      </h3>
                      <p className="text-sm opacity-70">
                        {server.dataSources.length} data source
                        {server.dataSources.length !== 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Tooltip>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          aria-label="Refresh data sources"
                          onPress={() => handleRefresh(index, server)}
                          isDisabled={refreshingIndex === index}
                        >
                          {refreshingIndex === index ? (
                            <Spinner size="sm" />
                          ) : (
                            <RefreshCcwIcon className="w-4 h-4" />
                          )}
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Refresh data sources</Tooltip.Content>
                    </Tooltip>
                    <Tooltip>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="ghost"
                          aria-label="Edit server"
                          onPress={() => handleEdit(index)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Edit</Tooltip.Content>
                    </Tooltip>
                    <Tooltip>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="danger-soft"
                          aria-label="Remove server"
                          onPress={() => removeServer(index)}
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>Remove</Tooltip.Content>
                    </Tooltip>
                    {!server.active && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="ml-2"
                        onPress={() => setActiveServer(index)}
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Set Active
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card.Content>

      <ServerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editServerIndex={editServerIndex}
        initialServer={editServerIndex !== undefined ? servers[editServerIndex] : undefined}
      />
    </Card>
  );
};
