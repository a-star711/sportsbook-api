/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], 
  theme: {
    screens: {
      xs: "390px",        // iPhone 12 Pro width
      "max-xs": { max: "431px" }, // Maximum size for smaller devices
      sm: "640px",        // Small phones
      md: "768px",        // Tablets
      lg: "1024px",       // Laptops
      xl: "1280px",       // Large desktops
    },
    extend: {
      borderRadius: {
        lg: "12px", // Large radius
        md: "10px", // Medium radius
        sm: "8px",  // Small radius
      },
      colors: {
        primary: "#213951", // Primary brand color (blue)
        secondary: "#e1e1e1", 
        accent: "#26af70", // Accent color (green)
        background: "#F9FAFB", // Light background
        card: "#FFFFFF", // Card background
        destructive: "#DC2626", // Destructive actions (red)
        border: "#E5E7EB", // Border color
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.3s ease-out", 
        "accordion-up": "accordion-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], 
};
