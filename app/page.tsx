import Recorder from './ui/recorder/Recorder';
import AudioMediaPlayer from './ui/recorder/AudioMediaPlayer';
import NotesPad from './ui/notes/NotePad/NotesPad';
import AuthenticationButton from './ui/auth/AuthenticationButton';
import NoteResume from './ui/resume/NoteResume';
import EditNoteMenu from './ui/notes/EditNoteMenu/EditNoteMenu';

export default function App() {
	return (
		<div className='flex flex-col w-full h-full min-h-dvh justify-end'>
			<AuthenticationButton />
			<NotesPad />
			<NoteResume />
			<EditNoteMenu />

			<div>
				<Recorder />
				<AudioMediaPlayer />
			</div>
		</div>
	);
}
