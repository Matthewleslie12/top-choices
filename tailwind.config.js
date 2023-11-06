/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGreen: "#355B3E",
        lightGreen: "#007549",
        mustard: "#FDC858",
        paleGreen: "#B8D6BF",
        slate: "#2F3D4C",
        mintGreen: "#029664",
        dullGreen: "#58745E",
        peach: "#F5DBC4",
        burgundy: "#74586E",
        paleBlue: "#C4DEF5",
        darkBlue: "#98C6EE",
        darkPeach: "#EEC098",
        darkerPeach: "#e7a56c",
        darkerBlue: "#6caee7",
      },
    },
  },
  plugins: [],
};
