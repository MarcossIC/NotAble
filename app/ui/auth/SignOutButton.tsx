import { signOut } from 'next-auth/react';
import css from './auth.module.css';
import LogoutIcon from '../icons/LogoutIcon';

export default function SignOutButton() {
	return (
		<button
			className={`${css.authButton} ${css.logOut}`}
			onClick={() => signOut({ redirect: false })}
			aria-label='Sign out button'>
			<LogoutIcon />
		</button>
	);
}
