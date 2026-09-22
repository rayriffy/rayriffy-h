import { useState } from "react";
import { DownloadIcon, UploadIcon, AlertCircleIcon, CopyIcon, CheckCircleIcon } from "lucide-react";
import { useServersAtom } from "modules/atoms/serversAtom";
import { useExportCollection, useImportCollection } from "./useCollectionSync";
import { Alert, Button, Card, Input, Label, Modal, Spinner, TextField } from "@heroui/react";

export const CollectionSync = () => {
  const servers = useServersAtom();
  const exportMutation = useExportCollection();
  const importMutation = useImportCollection();
  const hasServers = servers.length > 0;

  const [exportConfirmOpen, setExportConfirmOpen] = useState(false);
  const [shareCode, setShareCode] = useState<string | null>(null);

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccessCount, setImportSuccessCount] = useState<number | null>(null);

  const handleExport = async () => {
    try {
      const code = await exportMutation.mutateAsync();
      if (typeof code === "string") {
        setShareCode(code);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleImport = async () => {
    setImportError(null);
    setImportSuccessCount(null);
    if (!importCode.trim()) {
      setImportError("Share code is required");
      return;
    }

    try {
      const imported = await importMutation.mutateAsync(importCode.trim());
      setImportSuccessCount(imported.length);
      setImportCode("");
    } catch (e) {
      setImportError(
        "Failed to import collection: " + (e instanceof Error ? e.message : String(e)),
      );
    }
  };

  const copyToClipboard = () => {
    if (shareCode) {
      navigator.clipboard.writeText(shareCode);
    }
  };

  return (
    <>
      <Card variant="secondary">
        <Card.Header>
          <Card.Title>Collection sync</Card.Title>
          <Card.Description>Move your saved collection securely between devices.</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onPress={() => setExportConfirmOpen(true)}
              isDisabled={!hasServers}
            >
              <UploadIcon /> Export collection
            </Button>
            <Button
              onPress={() => {
                setImportModalOpen(true);
                setImportError(null);
                setImportSuccessCount(null);
                setImportCode("");
              }}
              isDisabled={!hasServers}
            >
              <DownloadIcon /> Import collection
            </Button>
          </div>
          {!hasServers && (
            <p className="mt-3 text-sm text-muted">Add a server to enable collection sync.</p>
          )}
        </Card.Content>
      </Card>

      <Modal
        isOpen={exportConfirmOpen}
        onOpenChange={(open) => !open && !exportMutation.isPending && setExportConfirmOpen(false)}
      >
        <Modal.Backdrop isDismissable={!exportMutation.isPending}>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Export collection</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="space-y-4">
                {exportMutation.error && (
                  <Alert status="danger">
                    <Alert.Indicator>
                      <AlertCircleIcon />
                    </Alert.Indicator>
                    <Alert.Content>
                      <Alert.Description>
                        {exportMutation.error instanceof Error
                          ? exportMutation.error.message
                          : "Failed to export"}
                      </Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}
                {shareCode ? (
                  <>
                    <p>Your collection is ready. Use this share code on another device.</p>
                    <div className="flex items-end gap-2">
                      <TextField className="flex-1" value={shareCode} isReadOnly>
                        <Label>Share code</Label>
                        <Input />
                      </TextField>
                      <Button
                        isIconOnly
                        variant="outline"
                        onPress={copyToClipboard}
                        aria-label="Copy share code"
                      >
                        <CopyIcon />
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>Generate a share code for your current collection?</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                {shareCode ? (
                  <Button
                    onPress={() => {
                      setExportConfirmOpen(false);
                      setShareCode(null);
                      exportMutation.reset();
                    }}
                  >
                    Done
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="tertiary"
                      onPress={() => setExportConfirmOpen(false)}
                      isDisabled={exportMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button onPress={handleExport} isDisabled={exportMutation.isPending}>
                      {exportMutation.isPending ? (
                        <>
                          <Spinner size="sm" /> Exporting…
                        </>
                      ) : (
                        "Confirm export"
                      )}
                    </Button>
                  </>
                )}
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      <Modal
        isOpen={importModalOpen}
        onOpenChange={(open) => !open && !importMutation.isPending && setImportModalOpen(false)}
      >
        <Modal.Backdrop isDismissable={!importMutation.isPending}>
          <Modal.Container>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Heading>Import collection</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="space-y-4">
                {importError && (
                  <Alert status="danger">
                    <Alert.Indicator>
                      <AlertCircleIcon />
                    </Alert.Indicator>
                    <Alert.Content>
                      <Alert.Description>{importError}</Alert.Description>
                    </Alert.Content>
                  </Alert>
                )}
                {importSuccessCount !== null ? (
                  <Alert status="success">
                    <Alert.Indicator>
                      <CheckCircleIcon />
                    </Alert.Indicator>
                    <Alert.Content>
                      <Alert.Description>
                        Successfully imported {importSuccessCount} item
                        {importSuccessCount !== 1 ? "s" : ""}.
                      </Alert.Description>
                    </Alert.Content>
                  </Alert>
                ) : (
                  <>
                    <p>Enter a share code. Importing replaces your current collection.</p>
                    <TextField
                      value={importCode}
                      onChange={setImportCode}
                      isDisabled={importMutation.isPending}
                    >
                      <Label>Share code</Label>
                      <Input placeholder="Enter share code…" />
                    </TextField>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                {importSuccessCount !== null ? (
                  <Button
                    onPress={() => {
                      setImportModalOpen(false);
                      setImportSuccessCount(null);
                      importMutation.reset();
                    }}
                  >
                    Done
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="tertiary"
                      onPress={() => setImportModalOpen(false)}
                      isDisabled={importMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button onPress={handleImport} isDisabled={importMutation.isPending}>
                      {importMutation.isPending ? (
                        <>
                          <Spinner size="sm" /> Importing…
                        </>
                      ) : (
                        "Import"
                      )}
                    </Button>
                  </>
                )}
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};
