/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            black: '#000000',
            white: '#ffffff',
            transparent: 'transparent',
            primary: {
                500: '#3085FE',
                600: '#1E6EE6',
                700: '#0D57CE',
                800: '#004FB2',
                900: '#003D91',
            },
            gray: {
                100: '#F7F7F7',
                200: '#EAEAEA',
                300: '#D9D9D9',
                400: '#BFBFBF',
                500: '#A6A6A6',
                600: '#8C8C8C',
                700: '#737373',
                800: '#595959',
                900: '#404040',
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
