import MButton from "./MButton";

interface TitleBarProps {
  useablesActive?: boolean;
  onFileNew?: () => void;
  onFileSave?: () => void;
  onFileOpen?: () => void;
  onToggleUseables?: () => void;
}

function TitleBar({
  useablesActive = false,
  onFileNew,
  onFileSave,
  onFileOpen,
  onToggleUseables,
}: TitleBarProps) {
  const openGitHub = () => {
    window.open("https://github.com/nthung2112/json-generator", "_blank");
  };

  return (
    <header
      className="h-[60px] bg-background w-[env(titlebar-area-width,100%)] grid grid-cols-[1fr_auto] px-5 items-center gap-[15px] app-region-drag"
      style={{ paddingLeft: "calc(env(titlebar-area-x, 0px) + 20px)" }}
    >
      <nav className="flex gap-[10px] items-center">
        <div className="text-xl mr-[50px]">
          Json<span className="font-bold text-primary">Generator</span>
        </div>
        <div className="app-region-no-drag">
          <MButton onClick={onFileNew} icon="add-line" label="New" small />
        </div>
        <div className="app-region-no-drag">
          <MButton onClick={onFileSave} icon="save-line" label="Save" small />
        </div>
        <div className="app-region-no-drag">
          <MButton onClick={onFileOpen} icon="folder-open-line" label="Load" small />
        </div>
      </nav>

      <nav className="flex gap-[10px] items-center">
        <div className="app-region-no-drag">
          <MButton
            onClick={onToggleUseables}
            icon={useablesActive ? "eye-line" : "eye-off-line"}
            label="Useables"
            small
            primary={useablesActive}
          />
        </div>
        <div className="app-region-no-drag">
          <MButton onClick={openGitHub} icon="github-fill" label="GitHub" small />
        </div>
      </nav>
    </header>
  );
}

export default TitleBar;
