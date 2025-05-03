import { FC } from "react";
import { UseableInfo } from "../types/types";

interface UseableDetailProps {
  useableInfo: UseableInfo;
}

const UseableDetail: FC<UseableDetailProps> = ({ useableInfo }) => {
  const copyUsage = () => {
    navigator.clipboard.writeText(`{${useableInfo.key}()}`);
  };

  return (
    <div className="p-4">
      <div className="text-2xl font-bold text-white mb-[5px]">{useableInfo.key}</div>
      <div className="text-xs font-bold text-primary uppercase mb-5">{useableInfo.group}</div>

      <section className="mb-5">
        <header className="text-xs font-bold text-white-50 uppercase mb-[5px]">Usage</header>
        <div className="flex gap-[10px] items-center">
          <div className="bg-white-5 p-[10px] flex-grow rounded">
            <code className="font-mono text-xs">{`{${useableInfo.usage}}`}</code>
          </div>
          <button
            onClick={copyUsage}
            title="Copy to clipboard"
            className="w-10 h-10 border-0 bg-transparent flex justify-center items-center text-white-50 text-lg transition-all duration-150 ease-in-out hover:cursor-pointer hover:text-white-80"
          >
            <span className="ri-clipboard-line"></span>
          </button>
        </div>
      </section>

      <section className="mb-5">
        <header className="text-xs font-bold text-white-50 uppercase mb-[5px]">Description</header>
        <div className="flex gap-[10px] items-center">{useableInfo.explanation}</div>
      </section>

      {useableInfo.example && (
        <section className="mb-5 last:mb-0">
          <header className="text-xs font-bold text-white-50 uppercase mb-[5px]">Example</header>
          <div className="flex gap-[10px] items-center">{useableInfo.example}</div>
        </section>
      )}
    </div>
  );
};

export default UseableDetail;
