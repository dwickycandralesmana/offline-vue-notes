module.exports = {
    purge: ['./index.html', './src/**/*.{vue, js}'],
    darkMode: false,
    theme: {
        extemd: {}
    },
    variants: {
        extends: {}
    },
    plugins: [
        require('@tailwindcss/typography')
    ]
}