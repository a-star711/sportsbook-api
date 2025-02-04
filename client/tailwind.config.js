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
        lg: "12px", 
        md: "10px", 
        sm: "8px",  
      },
      colors: {
        primary: "#213951", 
        secondary: "#e1e1e1", 
        accent: "#1F8F5A", 
        text: {
          light: "#FFFFFF",
          dark: "#EDEDED", 
        },
        background: "#F9FAFB", 
        card: "#FFFFFF", 
        destructive: "#DC2626", 
        border: "#E5E7EB", 
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
