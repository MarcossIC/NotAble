'use client';

import Recorder from './ui/Recorder';
import AudioMediaPlayer from './ui/AudioMediaPlayer';
import NotesPad from './ui/NotesPad';
import Authentication from './ui/auth/Authentication';
import NextAuthProvider from './SessionWrapper';

export default function App() {
	return (
		<NextAuthProvider>
			<div className='flex flex-col w-full h-full min-h-dvh justify-end'>
				<Authentication />
				<NotesPad />

				<div>
					<Recorder />
					<AudioMediaPlayer />
				</div>
			</div>
		</NextAuthProvider>
	);
}
