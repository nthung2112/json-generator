import { useCallback, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import SchemaPane, { SchemaPaneRef } from "./components/SchemaPane";
import PreviewPane, { PreviewPaneRef } from "./components/PreviewPane";
import UseablesPane from "./components/UseablesPane";
import TitleBar from "./components/TitleBar";
import { useFileHandler } from "./hooks";

import data from "./default.json?raw";

function App() {
  const [showUseables, setShowUseables] = useState(true);
  const [jsonSchema, setJsonSchema] = useState(data);
  const [previewData, setPreviewData] = useState(data);

  const schemaPaneRef = useRef<SchemaPaneRef>(null);
  const previewPaneRef = useRef<PreviewPaneRef>(null);

  const updateSchema = useCallback((newSchema: string) => {
    setJsonSchema(newSchema);
    schemaPaneRef.current?.setValue?.(newSchema);
    previewPaneRef.current?.generatePreview?.();
  }, []);

  const { handleNew, handleSave, handleOpen, handleFileChange, fileInputRef } = useFileHandler(
    jsonSchema,
    updateSchema
  );

  const toggleUseables = useCallback(() => {
    setShowUseables((prev) => !prev);
  }, []);

  return (
    <div className="app">
      <TitleBar
        onFileNew={handleNew}
        onFileSave={handleSave}
        onFileOpen={handleOpen}
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
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}

export default App;
