/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#1e2126",
        "preview-bg": "#23262b",
        "resize-handle": "#2a2e35",
        "pane-bg": "#262a31",
        splitter: {
          DEFAULT: "#363d45",
          hover: "#5d6a78",
        },
        primary: {
          DEFAULT: "rgb(152, 194, 122)",
          hover: "rgba(152, 194, 122, 0.2)",
          active: "rgba(152, 194, 122, 0.3)",
          bg: "rgba(152, 194, 122, 0.07)",
        },
      },
      fontFamily: {
        sans: ['"Source Sans Pro"', "sans-serif"],
        mono: [
          '"Monaco"',
          '"Menlo"',
          '"Ubuntu Mono"',
          '"Consolas"',
          '"source-code-pro"',
          "monospace",
        ],
      },
      backgroundColor: {
        "white-5": "rgba(255, 255, 255, 0.05)",
        "white-10": "rgba(255, 255, 255, 0.1)",
        "white-15": "rgba(255, 255, 255, 0.15)",
      },
      borderColor: {
        "white-10": "rgba(255, 255, 255, 0.1)",
        "primary-20": "rgba(152, 194, 122, 0.2)",
      },
      textColor: {
        "white-80": "rgba(255, 255, 255, 0.8)",
        "white-50": "rgba(255, 255, 255, 0.5)",
        "white-40": "rgba(255, 255, 255, 0.4)",
        "primary-70": "rgba(152, 194, 122, 0.7)",
      },
    },
  },
  plugins: [],
};
