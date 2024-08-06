'use client';

import { useSession } from 'next-auth/react';
import SignOutButton from './SignOutButton';
import SignInButton from './SignInButton';

export default function AuthenticationButton() {
	const { data: session } = useSession();

	return session ? <SignOutButton /> : <SignInButton />;
}
