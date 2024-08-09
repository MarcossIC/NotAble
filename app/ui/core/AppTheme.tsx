"use client";

import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';

const AppTheme = ({ children }: PropsWithChildren) => {
	return (
		<ThemeProvider
			themes={['light', 'dark']}
			storageKey='theme'
			defaultTheme='dark'
			key={'themeProvider'}
			attribute='data-theme'
			enableSystem={true}
			enableColorScheme={false}>
			{children}
		</ThemeProvider>
	);
};

export default AppTheme;
