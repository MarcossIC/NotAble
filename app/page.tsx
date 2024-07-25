import Recorder from './ui/recorder/Recorder';
import AudioMediaPlayer from './ui/recorder/AudioMediaPlayer';
import NotesPad from './ui/notes/NotesPad';
import Authentication from './ui/auth/Authentication';

export default function App() {
	return (
		<div className='flex flex-col w-full h-full min-h-dvh justify-end'>
			<Authentication />
			<NotesPad />

			<div>
				<Recorder />
				<AudioMediaPlayer />
			</div>
		</div>
	);
}
