/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      backgroundColor: {
        Nav: "#2C3E50",
        warning: "rgb(0,0,0, .5)",
        lilaClaro: ' #b695c0'
      },
      width: {
        "min()": "min(90%, 500px)",
      },
    },
  },
  plugins: [],
};
