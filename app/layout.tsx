import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import NextAuthProvider from './SessionWrapper';
import Loading from './ui/core/Loading';
import AuthLoaded from './ui/auth/AuthLoaded';
import Sidebar from './ui/sidebar/Sidebar';
import SidebarOpenButton from './ui/sidebar/SidebarOpenButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'NotAble',
	description: 'Webapp to take voice notes with AI.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<NextAuthProvider>
					<div className='flex w-full h-full flex-1 '>
						<AuthLoaded fallback={<Loading />}>
							<SidebarOpenButton />
							<Sidebar />
							{children}
						</AuthLoaded>
					</div>
				</NextAuthProvider>
			</body>
		</html>
	);
}
