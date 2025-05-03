import { forwardRef, useImperativeHandle, useState } from "react";
import AceEditor from "react-ace";

interface SchemaPaneProps {
  schema: string;
  onSchemaChange: (value: string) => void;
  onPreviewChange: (value: string) => void;
}

export interface SchemaPaneRef {
  setValue: (newValue: string) => void;
}

const SchemaPane = forwardRef<SchemaPaneRef, SchemaPaneProps>(
  ({ schema, onSchemaChange, onPreviewChange }, ref) => {
    const [schemaValue, setSchemaValue] = useState(schema || "{}");

    useImperativeHandle(ref, () => ({
      setValue: (newValue: string) => {
        setSchemaValue(newValue);
        onSchemaChange(newValue);
      },
    }));

    const handleChange = (value: string) => {
      setSchemaValue(value);
      onSchemaChange(value);
      onPreviewChange(value);
    };

    return (
      <div className="grid grid-cols-1 grid-rows-1 h-full bg-preview-bg">
        <AceEditor
          mode="json"
          theme="one_dark"
          value={schemaValue}
          onChange={handleChange}
          name="schema-editor"
          editorProps={{
            $blockScrolling: true,
            $fontSize: 14,
            $showPrintMargin: false,
          }}
          setOptions={{
            showPrintMargin: false,
            wrapBehavioursEnabled: true,
            wrap: true,
            tabSize: 2,
            showLineNumbers: true,
            showGutter: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            useWorker: true,
          }}
          width="100%"
          height="100%"
          fontSize={14}
          showGutter={true}
          highlightActiveLine={true}
          focus={true}
        />
      </div>
    );
  }
);

SchemaPane.displayName = "SchemaPane";

export default SchemaPane;
