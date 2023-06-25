module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  // prefix: "tw-",
  theme: {
    extend: {
      colors: {
        "mnkz-blue": "#89D8F7",
        "mnkz-tan": "#eeca51",
        "mnkz-red": "#d6303c",
        "mnkz-yellow": "#fff186",
        "mnkz-api": "#A776BE",
        "mnkz-wobo": "#77E0A7",
        "mnkz-xeba": "#F794C1",
        "mnkz-pelu": "#F7B55E",
        "mnkz-void": "#231F20",
        "zoog-glow": "#FCD5A3",
        "zoog-drip": "#B8E8FB",
        "zoog-lump": "#9ED9B9",
        "zoog-puff": "#E3E5EE",
      },
      textShadow: {
        custom:
          "4px 4px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
      },
      keyframes: {
        flash: {
          "0%, 100%": { color: "#FF2B1B" },
          "25%": { color: "#49DC3D" },
          "50%": { color: "#8C1BFF" },
          "75%": { color: "#C69C1C" },
        },
        progress: {
          "0%": { width: "0", opacity: "1" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "dot-typing": "dotTyping 1.5s infinite linear;",
        flash: "flash 2s linear infinite",
      },
      screens: {
        "3xl": "1792px",
        "4xl": "2060px",
      },
    },
  },
  plugins: [require("flowbite/plugin"), "react-hooks"],
};
