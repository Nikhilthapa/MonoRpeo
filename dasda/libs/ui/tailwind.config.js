/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7F5BFF",
          dark: "#57447F",
        },
        secondary: "#57447F",
        tertiary: "#AF89FF",
        background: "#110128",
        backgroundAccent: "#281A3D",
        card: "#1A0B2E",
        text: {
          main: "#FFFFFF",
          first: "#E5E5E5",
          second: "#CCCCCC",
        },
        black: {
          shade: "#1F2937",
        },
        border: "#4C2E8A",
        alert: {
          success: "#5DD27A",
          error: "#FF6B6B",
          warning: "#FF8904",
          successBg: "rgba(93, 210, 122, 0.1)",
          errorBg: "rgba(255, 107, 107, 0.1)",
          warningBg: "rgba(255, 137, 4, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
      fontSize: {
        "h1-website": ["60px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-dashboard": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "h1-form": ["20px", { lineHeight: "1.2", fontWeight: "500" }],
        h2: ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-dashboard": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "h2-form": ["20px", { lineHeight: "1.2", fontWeight: "500" }],
        h3: ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "h3-cta": ["16px", { lineHeight: "1.2", fontWeight: "500" }],
        h4: ["16px", { lineHeight: "1.2", fontWeight: "500" }],
        "h4-sm": ["14px", { lineHeight: "1.2", fontWeight: "500" }],
        "h4-xs": ["12px", { lineHeight: "1.2", fontWeight: "500" }],
        h5: ["20px", { lineHeight: "1.2", fontWeight: "500" }],
        h6: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        subheadline: ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        kicker: ["16px", { lineHeight: "1.2", fontWeight: "700" }],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #7F5BFF 0%, #57447F 100%)",
        "kicker-gradient": "linear-gradient(90deg, #7F5BFF 0%, #AF89FF 51.92%, #E8E4FF 100%)",
        "gradient-linear": "linear-gradient(90deg, #7F5BFF 0%, #57447F 100%)",
        "gradient-linear-second": "linear-gradient(90deg, #57447F 0%, #1F2937 100%)",
      },
      spacing: {
        xs: "5px",
        s: "10px",
        m: "15px",
        xl: "30px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "50px",
        "5xl": "60px",
        "6xl": "100px",
      },
    },
  },
  plugins: [],
};

