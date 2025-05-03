import { FC, useEffect, useState, useCallback } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useablesMap } from "../useables";
import UseableDetail from "./UseableDetail";
import { UseableInfo, GroupedUseables } from "../types";

const UseablesPane: FC = () => {
  const [useableInfo, setUseableInfo] = useState<UseableInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupedUseables, setGroupedUseables] = useState<GroupedUseables>({});

  const updateResults = useCallback(() => {
    const newGroupedUseables: GroupedUseables = {};

    // Add loop useable
    const useablesWithLoop = {
      ...useablesMap,
      loop: {
        group: "General",
        usage: "loop(min, max?)",
        explanation:
          "Loops the next object within an array, either a fixed or random amount of times.",
      },
    };

    Object.entries(useablesWithLoop).forEach(([key, value]) => {
      if (searchQuery && !key.toLowerCase().includes(searchQuery.toLowerCase())) return;

      const group = value.group;
      if (!newGroupedUseables[group]) {
        newGroupedUseables[group] = {};
      }
      newGroupedUseables[group][key] = value;
    });

    setGroupedUseables(newGroupedUseables);
  }, [searchQuery]);

  useEffect(() => {
    updateResults();
  }, [updateResults]);

  return (
    <PanelGroup direction="vertical">
      <Panel defaultSize={70} minSize={50} className="relative">
        <>
          <div className="relative z-[2] bg-preview-bg grid grid-rows-1 grid-cols-1 h-10">
            <span className="h-10 text-lg flex items-center absolute left-5 pointer-events-none transition-colors duration-150 ease-in-out group-focus-within:text-[#222] ri ri-search-line"></span>
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="appearance-none py-0 pl-[50px] pr-5 bg-transparent border-0 font-sans text-base text-white transition-all duration-150 ease-in-out hover:bg-white-5 focus:outline-none focus:bg-white focus:text-[#222]"
            />
          </div>

          <div className="z-[1] absolute top-10 bottom-0 left-0 right-0 overflow-y-scroll">
            {Object.entries(groupedUseables).map(([groupKey, items]) => (
              <div className="mb-5 last:mb-0" key={groupKey}>
                <header className="bg-primary-bg text-xs font-bold text-primary uppercase py-[10px] px-5">
                  {groupKey}
                </header>
                <div className="grid grid-cols-1 gap-0">
                  {Object.entries(items).map(([itemKey, item]) => (
                    <button
                      key={itemKey}
                      onClick={() => setUseableInfo({ key: itemKey, ...item })}
                      className={`appearance-none border-0 text-left bg-transparent font-sans text-base text-white-80 py-[10px] px-5 transition-all duration-150 ease-in-out ${
                        useableInfo?.key === itemKey
                          ? "bg-white-10"
                          : "hover:cursor-pointer hover:bg-white-5"
                      }`}
                    >
                      {itemKey}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      </Panel>

      <PanelResizeHandle className="h-[2px] bg-resize-handle hover:bg-primary" />

      <Panel defaultSize={30} minSize={10} className="bg-background">
        <div className="overflow-y-scroll h-full">
          {useableInfo && <UseableDetail useableInfo={useableInfo} />}
        </div>
      </Panel>
    </PanelGroup>
  );
};

export default UseablesPane;
