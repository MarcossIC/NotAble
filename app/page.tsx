import Recorder from './ui/recorder/Recorder';
import AudioMediaPlayer from './ui/recorder/AudioMediaPlayer';
import NotesPad from './ui/notes/NotesPad';
import AuthenticationButton from './ui/auth/AuthenticationButton';

export default function App() {
	return (
		<div className='flex flex-col w-full h-full min-h-dvh justify-end'>
			<AuthenticationButton />
			<NotesPad />

			<div>
				<Recorder />
				<AudioMediaPlayer />
			</div>
		</div>
	);
}
