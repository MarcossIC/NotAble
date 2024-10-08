import Image from 'next/image';
import { signIn } from 'next-auth/react';
import githubLogo from '@/public/github.png';

export default function GithubSignInButton() {
	const handleClick = () => {
		signIn('github');
	};

	return (
		<button
			onClick={handleClick}
			aria-label='Sign in with Github'
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
