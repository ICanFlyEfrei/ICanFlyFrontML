/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      "first": "#E43D12",
      "second": "#D6536D",
      "third": "#FFA2b6",
      "fourth": "#EFB11D",
      "fifth": "#EBE9E1",
      "white": "#FFFFFF",
      "black": "#000000",
      "primary": {
        100: "#E43D12",
        200: "#D6536D",
        300: "#FFA2b6",
        400: "#EFB11D",
        500: "#EBE9E1",
        600: "#FFFFFF",
        700: "#000000",
      },
    }
  },
  plugins: [
    require("daisyui"),
    require('flowbite/plugin')
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "selector", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },

}

