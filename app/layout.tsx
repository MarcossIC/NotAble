import type { ReactNode } from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import NextAuthProvider from './session';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'NotAble',
	description: 'Webapp to take voice notes with AI.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	);
}
