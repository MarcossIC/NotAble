import Recorder from './ui/Recorder';
import AudioMediaPlayer from './ui/AudioMediaPlayer';
import NotesPad from './ui/NotesPad';
import SignUpButton from './ui/SignInButton';

export default function App() {
	return (
		<div className='flex flex-col w-full h-full min-h-dvh justify-end'>
			<SignUpButton />
			<NotesPad />

			<div>
				<Recorder />
				<AudioMediaPlayer />
			</div>
		</div>
	);
}
