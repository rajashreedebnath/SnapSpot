
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#6366f1',
        accent: '#a5b4fc', 
        light: '#f9fafb',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #6366f1, #4f46e5)',
      },
      borderRadius: {
        'btn': '0.5rem',
      },
      transitionProperty: {
        'smooth': 'all',
      },
    },
  },
  plugins: [],
}
