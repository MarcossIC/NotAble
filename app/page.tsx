import Recorder from './ui/Recorder';
import AudioMediaPlayer from './ui/AudioMediaPlayer';
import NotesPad from './ui/NotesPad';

export default function App() {
	return (
		<div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
			<NotesPad />

			<div>
				<Recorder />
				<AudioMediaPlayer />
			</div>
		</div>
	);
}
