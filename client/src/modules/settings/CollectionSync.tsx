import { useState } from "react";
import { DownloadIcon, UploadIcon, AlertCircleIcon, CopyIcon, CheckCircleIcon } from "lucide-react";
import { useExportCollection, useImportCollection } from "./useCollectionSync";

export const CollectionSync = () => {
  const exportMutation = useExportCollection();
  const importMutation = useImportCollection();

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
    <section className="card bg-base-100 border border-base-300">
      <div className="card-body">
        <div className="space-y-4">
          <div>
            <h2 className="card-title">Collection Sync</h2>
            <p>Export or import your collection across devices.</p>
          </div>

          <div className="flex gap-4">
            <button className="btn btn-outline" onClick={() => setExportConfirmOpen(true)}>
              <UploadIcon className="w-4 h-4 mr-2" />
              Export Collection
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setImportModalOpen(true);
                setImportError(null);
                setImportSuccessCount(null);
                setImportCode("");
              }}
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Import Collection
            </button>
          </div>
        </div>
      </div>

      {/* Export Confirmation / Result Modal */}
      {exportConfirmOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Export Collection</h3>

            {exportMutation.error && (
              <div className="alert alert-error mb-4 text-sm p-3">
                <AlertCircleIcon className="w-5 h-5 shrink-0" />
                <span>
                  {exportMutation.error instanceof Error
                    ? exportMutation.error.message
                    : "Failed to export"}
                </span>
              </div>
            )}

            {shareCode ? (
              <div className="space-y-4">
                <p>
                  Your collection has been exported successfully. Use the share code below to import
                  it on another device.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareCode}
                    className="input input-bordered w-full"
                    readOnly
                  />
                  <button
                    className="btn btn-square btn-outline"
                    onClick={copyToClipboard}
                    title="Copy to clipboard"
                  >
                    <CopyIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <p>
                Are you sure you want to export your collection? This will generate a share code.
              </p>
            )}

            <div className="modal-action">
              {shareCode ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setExportConfirmOpen(false);
                    setShareCode(null);
                    exportMutation.reset();
                  }}
                >
                  Done
                </button>
              ) : (
                <>
                  <button
                    className="btn"
                    onClick={() => setExportConfirmOpen(false)}
                    disabled={exportMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleExport}
                    disabled={exportMutation.isPending}
                  >
                    {exportMutation.isPending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Confirm Export"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => !exportMutation.isPending && !shareCode && setExportConfirmOpen(false)}
          >
            <button className="cursor-default">close</button>
          </div>
        </dialog>
      )}

      {/* Import Modal */}
      {importModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Import Collection</h3>

            {importError && (
              <div className="alert alert-error mb-4 text-sm p-3">
                <AlertCircleIcon className="w-5 h-5 shrink-0" />
                <span>{importError}</span>
              </div>
            )}

            {importSuccessCount !== null ? (
              <div className="space-y-4">
                <div className="alert alert-success mb-4 text-sm p-3">
                  <CheckCircleIcon className="w-5 h-5 shrink-0" />
                  <span>
                    Successfully imported {importSuccessCount} item
                    {importSuccessCount !== 1 ? "s" : ""} to your collection.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p>
                  Enter a share code to import a collection. This will replace your current
                  collection.
                </p>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Enter share code..."
                    className="input input-bordered w-full"
                    value={importCode}
                    onChange={(e) => setImportCode(e.target.value)}
                    disabled={importMutation.isPending}
                  />
                </div>
              </div>
            )}

            <div className="modal-action">
              {importSuccessCount !== null ? (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setImportModalOpen(false);
                    setImportSuccessCount(null);
                    importMutation.reset();
                  }}
                >
                  Done
                </button>
              ) : (
                <>
                  <button
                    className="btn"
                    onClick={() => setImportModalOpen(false)}
                    disabled={importMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleImport}
                    disabled={importMutation.isPending}
                  >
                    {importMutation.isPending ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Import"
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() =>
              !importMutation.isPending && importSuccessCount === null && setImportModalOpen(false)
            }
          >
            <button className="cursor-default">close</button>
          </div>
        </dialog>
      )}
    </section>
  );
};
