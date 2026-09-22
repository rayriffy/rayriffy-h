import { useState, useEffect } from "react";
import { treaty } from "@elysiajs/eden";
import type { Server as AppServer } from "@riffyh/server";
import { addServer, updateServer } from "modules/atoms/serversAtom";
import type { Server } from "modules/types/Server";
import { AlertCircleIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Alert, Button, Input, Label, Modal, Spinner, TextField } from "@heroui/react";

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
          `Failed to fetch data sources: ${fetchError.status.toString()} ${JSON.stringify(fetchError.value)}`,
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

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && !isLoading && onClose()}>
      <Modal.Backdrop isDismissable={!isLoading}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Heading>
                {editServerIndex !== undefined ? "Edit server" : "Add server"}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="space-y-4">
              {error && (
                <Alert status="danger">
                  <Alert.Indicator>
                    <AlertCircleIcon />
                  </Alert.Indicator>
                  <Alert.Content>
                    <Alert.Description>{error}</Alert.Description>
                  </Alert.Content>
                </Alert>
              )}
              <TextField isDisabled={isLoading} value={baseUrl} onChange={setBaseUrl}>
                <Label>Base URL</Label>
                <Input placeholder="http://localhost:3000" />
              </TextField>
              <div className="space-y-2">
                <Label>Custom headers</Label>
                {headers.map((header, index) => (
                  <div key={index} className="flex items-end gap-2">
                    <TextField
                      className="flex-1"
                      isDisabled={isLoading}
                      value={header.key}
                      onChange={(value) => {
                        const next = [...headers];
                        next[index] = { ...next[index], key: value };
                        setHeaders(next);
                      }}
                    >
                      <Label className="sr-only">Header name</Label>
                      <Input placeholder="Name" />
                    </TextField>
                    <TextField
                      className="flex-1"
                      isDisabled={isLoading}
                      value={header.value}
                      onChange={(value) => {
                        const next = [...headers];
                        next[index] = { ...next[index], value };
                        setHeaders(next);
                      }}
                    >
                      <Label className="sr-only">Header value</Label>
                      <Input placeholder="Value" />
                    </TextField>
                    <Button
                      isIconOnly
                      variant="danger-soft"
                      aria-label="Remove header"
                      onPress={() =>
                        setHeaders(headers.filter((_, itemIndex) => itemIndex !== index))
                      }
                      isDisabled={isLoading}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                ))}
                <Button
                  fullWidth
                  variant="outline"
                  onPress={() => setHeaders([...headers, { key: "", value: "" }])}
                  isDisabled={isLoading}
                >
                  <PlusIcon /> Add header
                </Button>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="tertiary" onPress={onClose} isDisabled={isLoading}>
                Cancel
              </Button>
              <Button onPress={handleSave} isDisabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" /> Saving…
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
