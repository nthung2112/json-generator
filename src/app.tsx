import { ChangeEvent, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SchemaPane, { SchemaPaneRef } from "./components/SchemaPane";
import PreviewPane, { PreviewPaneRef } from "./components/PreviewPane";
import UseablesPane from "./components/UseablesPane";
import TitleBar from "./components/TitleBar";

import data from "./default.json?raw";

function App() {
  const [showUseables, setShowUseables] = useState(true);
  const [jsonSchema, setJsonSchema] = useState(data);
  const [previewData, setPreviewData] = useState(data);

  const schemaPaneRef = useRef<SchemaPaneRef>(null);
  const previewPaneRef = useRef<PreviewPaneRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileNew = () => {
    if (jsonSchema === "{}") {
      forceSetSchema("{}");
    } else if (
      window.confirm("Are you sure that you want to reset your Schema? This cannot be undone.")
    ) {
      forceSetSchema("{}");
    }
  };

  const fileSave = () => {
    const a = document.createElement("a");
    const file = new Blob([jsonSchema], { type: "application/json" });
    const url = URL.createObjectURL(file);

    a.href = url;
    a.download = "schema.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  const fileOpen = () => {
    if (jsonSchema === "{}") {
      fileInputRef.current?.click();
    } else if (
      window.confirm("Are you sure that you want to load a new Schema? This cannot be undone.")
    ) {
      fileInputRef.current?.click();
    }
  };

  const processFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      forceSetSchema(typeof result === "string" ? result : "{}");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.readAsText(file);
  };

  const forceSetSchema = (newSchema: string) => {
    setJsonSchema(newSchema);

    setTimeout(() => {
      if (schemaPaneRef.current?.setValue) {
        schemaPaneRef.current.setValue(newSchema);
      }
      if (previewPaneRef.current?.generatePreview) {
        previewPaneRef.current.generatePreview();
      }
    }, 0);
  };

  const toggleUseables = () => {
    setShowUseables(!showUseables);
  };

  return (
    <div className="app">
      <TitleBar
        onFileNew={fileNew}
        onFileSave={fileSave}
        onFileOpen={fileOpen}
        onToggleUseables={toggleUseables}
        useablesActive={showUseables}
      />
      <div className="main-content">
        <PanelGroup direction="horizontal">
          {showUseables && (
            <>
              <Panel defaultSize={20} minSize={15}>
                <UseablesPane />
              </Panel>
              <PanelResizeHandle className="w-1" />
            </>
          )}
          <Panel defaultSize={40} minSize={30}>
            <SchemaPane
              ref={schemaPaneRef}
              schema={jsonSchema}
              onSchemaChange={setJsonSchema}
              onPreviewChange={setPreviewData}
            />
          </Panel>
          <PanelResizeHandle className="w-1" />
          <Panel defaultSize={40} minSize={30}>
            <PreviewPane ref={previewPaneRef} preview={previewData} />
          </Panel>
        </PanelGroup>
      </div>

      {/* Required to prompt user for a file */}
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        onChange={processFile}
        className="hidden"
      />
    </div>
  );
}

export default App;
