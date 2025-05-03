/// <reference types="vite/client" />

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.json?raw" {
  const value: any;
  export default value;
}

declare module "@fontsource/source-sans-pro";
declare module "remixicon/fonts/remixicon.css";
