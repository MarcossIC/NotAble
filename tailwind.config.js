/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
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
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-light': 'linear-gradient(40deg, var(--notable-primary-500) 10%, var(--notable-primary-100) 100%)',
			},
		},
	},
	plugins: [],
};
