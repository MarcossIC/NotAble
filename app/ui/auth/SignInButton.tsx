'use client';

import css from './auth.module.css';
import useToggle from '@/lib/useTogle';
import useClickOutside from '@/lib/useClickOutside';
import { useRef } from 'react';
import GithubSignInButton from './GithubSignInButton';
import GoogleSignInButton from './GoogleSignInButton';
import SignIcon from '../icons/SignIcon';

const SignInButton = () => {
	const [open, togle] = useToggle(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const openRef = useRef<HTMLButtonElement>(null);
	const clickOutSide = () => {
		if (open) togle();
	};
	useClickOutside(menuRef, clickOutSide, openRef);
	return (
		<>
			<button
				ref={openRef}
				className={`float-button-rounded ${css.authButton} ${css.signIn}`}
				onClick={togle}
				aria-label='Sign in button'>
				<SignIcon />
			</button>
			<div
				aria-label='Sign in options'
				aria-live='off'
				aria-roledescription='Sign in drop down menu'
				className={`${css.menu} ${open ? css.open : 'close'}`}
				ref={menuRef}>
				<GoogleSignInButton />
				<GithubSignInButton />
			</div>
		</>
	);
};

export default SignInButton;
