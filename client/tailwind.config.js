/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            black: '#000000',
            white: '#ffffff',
            transparent: 'transparent',
            primary: {},
            text: {
                500: '#CCCCCC',
                600: '#F2F2F2',
                700: '#999999',
                800: '#666666',
                900: '#333333',
            },
            error: '#FF0000',
            success: '#00FF00',
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif'],
            inter: ['Inter', 'sans-serif'],
            inter100: ['Inter100', 'sans-serif'],
            inter500: ['Inter500', 'sans-serif'],
            inter600: ['Inter600', 'sans-serif'],
            inter700: ['Inter700', 'sans-serif'],
            inter800: ['Inter800', 'sans-serif'],
            inter900: ['Inter900', 'sans-serif'],
        },
    },
    plugins: [],
};
