/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx,css}'],
	theme: {
		extend: {
			colors: {
				notable: {
					red: {
						100: 'var(--notable-red-100)',
						200: 'var(--notable-red-200)',
					},
					primary: {
						50: 'var(--notable-primary-50)',
						100: 'var(--notable-primary-100)',
						150: 'var(--notable-primary-150)',
						200: 'var(--notable-primary-200)',
						300: 'var(--notable-primary-300)',
						400: 'var(--notable-primary-400)',
						500: 'var(--notable-primary-500)',
						600: 'var(--notable-primary-600)',
					},
					white: 'var(--notable-text-white)',
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-light': 'linear-gradient(40deg, var(--notable-primary-500) 10%, var(--notable-primary-100) 100%)',
			},
			keyframes: {
				'slide-left-right': {
					'0%, 100%': {
						opacity: '0.9',
						transform: 'translateX(10%) scale(0.98)',
					},
					'25%, 75%': {
						opacity: '0.95',
						transform: 'translateX(0%) scale(1)',
					},
					'50%': {
						opacity: '1',
						transform: 'translateX(-35%) scale(1.05)',
					},
				},
			},
			animation: {
				'slide-left-right-fast': 'slide-left-right 400ms ease-in-out infinite alternate',
				'slide-left-right-slow': 'slide-left-right 1s ease-in-out infinite alternate',
			},
			boxShadow: {
				'custom-toast': "0 16px 24px 0px rgba(0, 0, 0, 0.14),  0 6px 30px 0px rgba(0, 0, 0, 0.12), 0px 10px 8px 0px rgba(0, 0, 0, 0.15)",
			}
		},
	},
	plugins: [],
};
