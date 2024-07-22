import Image from 'next/image';
import { signIn } from 'next-auth/react';
import googleLogo from '@/public/google.png';

export default function GoogleSignInButton() {
	const handleClick = () => {
		signIn('google', { redirect: false });
	};

	return (
		<button
			onClick={handleClick}
			className='w-full flex items-center font-semibold justify-center h-[50%] px-6 rounded-t-2xl text-base  transition-colors duration-300 bg-white  text-black  hover:bg-slate-200 overflow-hidden'>
			<Image
				src={googleLogo}
				alt='Google Logo'
				width={20}
				height={20}
			/>
			<span className='ml-4'>Continue with Google</span>
		</button>
	);
}
