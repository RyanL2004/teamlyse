export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      border: "hsl(220, 13%, 91%)", // Add border color token
      background: "hsl(240, 5.9%, 10%)", // Add background color
      foreground: "hsl(240, 4.8%, 95.9%)", // Add foreground color
    },
  },
};
export const plugins = [];