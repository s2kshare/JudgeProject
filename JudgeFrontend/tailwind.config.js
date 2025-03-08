/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            flex: {
                2: "2",
                3: "3",
                4: "4",
            },
        },
    },
    plugins: [],
});
