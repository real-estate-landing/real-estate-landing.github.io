/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fromBottom: {
          "0%": { opacity: "0", transform: "translateY(25%)" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },
        fromTop: {
          "0%": { opacity: "0", transform: "translateY(-25%)" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },
        fromLeft: {
          "0%": { opacity: "0", transform: "translateX(-25%)" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },
        fromRight: {
          "0%": { opacity: "0", transform: "translateX(25%)" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },
      },
      animation: {
        animate_FromTop: "fromTop ",
        animate_FromBottom: "",
        animate_FromLeft: "",
        animate_FromRight: "",
      },
    },
  },
  plugins: [],
};
