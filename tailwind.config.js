/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                ft: {
                    background: '#FFF1E5',
                    text: '#33302E',
                    pink: '#FE5F95',
                    navy: '#1A2B4C',
                    black: '#000000',
                    white: '#FFFFFF',
                    gray: '#66605C'
                }
            },
            fontFamily: {
                sans: ['Georgia', ...defaultTheme.fontFamily.serif],
                serif: ['Georgia', ...defaultTheme.fontFamily.serif],
            },
        },
    },
    plugins: [],
};
