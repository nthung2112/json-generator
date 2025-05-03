import { type ChangeEvent, useCallback, useRef } from "react";

interface FileHandlerHook {
  handleNew: () => void;
  handleSave: () => void;
  handleOpen: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export const useFileHandler = (
  currentSchema: string,
  onSchemaChange: (schema: string) => void
): FileHandlerHook => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const confirmAction = useCallback(
    (message: string): boolean => {
      return currentSchema === "{}" || window.confirm(message);
    },
    [currentSchema]
  );

  const handleNew = useCallback(() => {
    if (confirmAction("Are you sure that you want to reset your Schema? This cannot be undone.")) {
      onSchemaChange("{}");
    }
  }, [confirmAction, onSchemaChange]);

  const handleSave = useCallback(() => {
    const blob = new Blob([currentSchema], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [currentSchema]);

  const handleOpen = useCallback(() => {
    if (confirmAction("Are you sure that you want to load a new Schema? This cannot be undone.")) {
      fileInputRef.current?.click();
    }
  }, [confirmAction]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        onSchemaChange(typeof result === "string" ? result : "{}");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
      reader.readAsText(file);
    },
    [onSchemaChange]
  );

  return { handleNew, handleSave, handleOpen, handleFileChange, fileInputRef };
};
