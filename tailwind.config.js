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
						175: 'var(--notable-primary-175)',
						200: 'var(--notable-primary-200)',
						300: 'var(--notable-primary-300)',
						400: 'var(--notable-primary-400)',
						500: 'var(--notable-primary-500)',
						600: 'var(--notable-primary-600)',
					},
					normal: {
						DEFAULT: 'var(--notable-text-color)',
						o60: 'var(--notable-text-color-o60)',
					},
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
				'custom-toast': 'var(--notable-toast-shadow)',
			},
			content: {
				attr: 'attr(data-text)',
			},
		},
	},
	plugins: [
		function ({ addVariant, e }) {
			addVariant('before', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`before${separator}${className}`)}::before`;
				});
			});
			addVariant('after', ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`after${separator}${className}`)}::after`;
				});
			});
		},
	],
};
