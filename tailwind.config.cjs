const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Noto Sans KR Variable", ...defaultTheme.fontFamily.sans],
                gothic: ["Nanum Gothic Coding", ...defaultTheme.fontFamily.sans]
            },
            fontSize: {
                xxs: "0.938rem", // 15px
                "3xs": "0.813rem",
                ...defaultTheme.fontSize
            },
            animation: {
                "spin-once": "spin 1s linear"
            },
            keyframes: {
                spin: {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(-180deg)" }
                }
            }
        }
    },
    plugins: [require("flowbite/plugin"), require("@tailwindcss/typography")]
};
