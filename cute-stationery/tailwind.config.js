module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./context/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pinkcute: '#FFB6D0',
        accentpink: '#FF6FA3',
        cream: '#FFF1E6',
        darktext: '#33272A',
        pink: {
          light: '#FFB6D0',
          DEFAULT: '#FF6FA3',
          dark: '#E75480'
        }
      },
      fontFamily: {
        cute: ['"Comic Neue"', 'cursive'],
        body: ['Vazirmatn', 'sans-serif']
      }
    }
  },
  plugins: [],
}
