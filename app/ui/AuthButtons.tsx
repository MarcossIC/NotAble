import Image from 'next/image';
import { signIn } from 'next-auth/react';
import googleLogo from '@/public/google.png';
import githubLogo from '@/public/github.png';

export function GoogleSignInButton() {
	const handleClick = () => {
		signIn('google').then((res) => {
			console.log(res);
		});
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

export function GithubSignInButton() {
	const handleClick = () => {
		signIn('github').then((res) => {
			console.log(res);
		});
	};

	return (
		<button
			onClick={handleClick}
			className='w-full flex items-center font-semibold justify-center h-[50%] px-6 text-base rounded-b-2xl transition-colors duration-300 bg-white  text-black  hover:bg-slate-200 overflow-hidden'>
			<Image
				src={githubLogo}
				alt='Github Logo'
				width={20}
				height={20}
			/>
			<span className='ml-4'>Continue with Github</span>
		</button>
	);
}
