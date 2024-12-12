import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#2E5021',
        secondary: '#006633',
        dark1: '#3F4141',
        dark2: '#222222',
        dark3: '#333333',
        dark4: '#444444',
        dark5: '#272727',
        gray1: '#D9D9D9',
        gray2: '#666666',
        gray3: '#4E4E4E',
        gray4: '#DCDCDC',
        gray5: "#EDEDED",
        brown1: '#352A1C',
        brown2: '#24211D',
      },
      fontSize: {
        '13': '0.8125rem',  // 13px를 rem으로 변환한 값 (13px ÷ 16px = 0.8125rem)
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-150px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(150px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-left-delay': 'slideInLeft 1.0s ease-out forwards 0.5s', 
        'slide-in-right-delay': 'slideInRight 1.0s ease-out forwards 0.8s',  
      },
    },
  },
  plugins: [],
} satisfies Config;
