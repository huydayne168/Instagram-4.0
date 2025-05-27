/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderWidth: {
                0.5: "0.5px",
            },
            width: {
                "72px": "72px",
                "44px": "44px",
                "828px": "828px",
            },
            height: {
                "44px": "44px",
            },
            spacing: {
                "3/4": "75%",
                "90%": "90%",
                "10%": "10%",
                inherit: "inherit",
            },
            minWidth: {
                "50%": "50%",
                "60%": "60%",
                "828px": "828px",
            },
            maxWidth: {
                "630px": "630px",
            },
        },
        fontFamily: {
            sourceSans: ['"Source Sans 3"', "sans-serif"],
        },
        colors: {
            textGray: "rgb(115, 115, 115)",
            textSecondGray: "rgb(168, 168, 168)",
            blue: "#0095f6",
            white: "#fff",
            errorText: "rgb(237, 73, 86)",
            dark: "#000",
            "#262626": "#262626",
            "#efeae0": "#efeae0",
            lightDark: "rgb(38, 38, 38)",
            lightSecondDark: "rgb(51, 51, 51)",
            transparent: "transparent",
        },
        screens: {
            mobile: "450px",
            tablet: "640px",
            laptop: "1024px",
            desktop: "1280px",
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
