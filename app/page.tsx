import Recorder from './ui/recorder/Recorder';
import AudioMediaPlayer from './ui/recorder/AudioMediaPlayer';
import NotesPad from './ui/notes/NotePad/NotesPad';
import AuthenticationButton from './ui/auth/AuthenticationButton';
import NoteResume from './ui/resume/NoteResume';
import EditNoteMenu from './ui/notes/EditNoteMenu/EditNoteMenu';
import ExpandResumeButton from './ui/resume/ExpandResumeButton';
import { Toaster } from 'react-hot-toast';

export default function App() {
	return (
		<div className='flex flex-col w-full h-full min-h-dvh justify-end '>
			<AuthenticationButton />
			<ExpandResumeButton />
			<NotesPad />
			<NoteResume />
			<EditNoteMenu />
			<Toaster
				toastOptions={{
					success: {
						id: 'toast-success',
						className: '!bg-[#242C32] !text-white !shadow-custom-toast toast-round-success overflow-hidden text-[17px] font-semibold !leading-6',

						position: 'bottom-right',
						ariaProps: {
							'aria-live': 'off',
							role: 'alert',
						},
					},
				}}
			/>
			<div>
				<Recorder />
				<AudioMediaPlayer />
			</div>
		</div>
	);
}
