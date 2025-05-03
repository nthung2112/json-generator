import { forwardRef, useImperativeHandle, useState } from "react";
import AceEditor from "react-ace";
import MButton from "./MButton";
import { interpretUseables } from "../useables";

interface PreviewPaneProps {
  preview: string;
}

export interface PreviewPaneRef {
  generatePreview: () => void;
}

const PreviewPane = forwardRef<PreviewPaneRef, PreviewPaneProps>(({ preview }, ref) => {
  const [dataPreview, setDataPreview] = useState("{}");

  const generatePreview = () => {
    try {
      const intermediate = JSON.parse(preview ?? "{}");
      const result = interpretUseables(intermediate);
      setDataPreview(JSON.stringify(result, null, 2));
    } catch (e: any) {
      setDataPreview(`Error name: ${e.name}\nMessage: ${e.message}\nStack trace:\n${e.stack}`);
    }
  };

  const copyPreview = () => {
    navigator.clipboard.writeText(dataPreview);
  };

  const clearPreview = () => {
    setDataPreview("");
  };

  useImperativeHandle(ref, () => ({
    generatePreview,
  }));

  return (
    <div className="grid grid-rows-[1fr_auto] grid-cols-1 h-full bg-preview-bg">
      <AceEditor
        mode="json"
        theme="one_dark"
        value={dataPreview}
        name="preview-editor"
        editorProps={{
          $blockScrolling: true,
          $fontSize: 14,
          $showPrintMargin: false,
        }}
        setOptions={{
          readOnly: true,
          highlightActiveLine: false,
          behavioursEnabled: false,
          showPrintMargin: false,
          displayIndentGuides: false,
          wrapBehavioursEnabled: true,
          wrap: true,
          showLineNumbers: true,
          showGutter: true,
          useWorker: false,
        }}
        width="100%"
        height="100%"
        fontSize={14}
        showGutter={true}
        highlightActiveLine={false}
      />

      <section className="bg-background p-5 grid grid-cols-[1fr_auto_auto] gap-[10px] items-center">
        <MButton onClick={generatePreview} primary icon="refresh-line" label="Generate" />
        <MButton onClick={copyPreview} icon="clipboard-line" label="Copy" />
        <MButton onClick={clearPreview} icon="delete-bin-line" label="Clear" />
      </section>
    </div>
  );
});

PreviewPane.displayName = "PreviewPane";

export default PreviewPane;
