import { useSession } from 'next-auth/react';
import NotesList from './NotesList';
import NoteLoader from './NoteLoader';

export default function NotesPad() {
	const { data: session } = useSession();
	if (session) {
		return (
			<div className='mb-auto ps-8 pt-4'>
				<NotesList
					profile={session.user.image || ''}
					id={session.user.id || ''}
				/>
				<NoteLoader />
			</div>
		);
	}
	return (
		<div className='mb-auto ps-8 pt-4'>
			<h1 className='text-5xl leading-10 font-medium flex flex-col gap-y-5'>
				<span>Please Sign in,</span> <span className='text-transparent bg-clip-text bg-gradient-light'>for start take notes!</span>
			</h1>
		</div>
	);
}
