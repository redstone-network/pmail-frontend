/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      background: 'var(--main-bg-color)',
      SideBarBackground: 'var(--side-bg-color)',
      SideBarText: 'var(--main-text-color)',
      SideBarActiveBackground: 'var(--active-side-bg-color)',
      sideBarHoverBackground: 'var(--hover-side-bg-color)',
      white: 'var(--white)',
      gray: 'var(--gray)',
      blue: '#2423B5'
    },
    extend: {
      spacing: {
        256: '256px',
        117: '117px',
        236: '236px',
        50: '50px'
      }
    }
  },
  plugins: []
}
