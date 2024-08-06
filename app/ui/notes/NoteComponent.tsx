import type { Note } from '@/app/models/notesTypes';
import NoteArea from './NoteArea';
import Image from 'next/image';
import SettingNoteButton from './SettingNoteButton';

interface NoteProps {
	note: Note;
	profile: string;
}

export default function NoteComponent({ note, profile }: NoteProps) {
	return (
		<div className='mb-8 flex gap-x-2 justify-start items-start relative group w-full'>
			<Image
				src={profile}
				alt='User profile'
				width={32}
				height={32}
				className='size-8 rounded-full object-cover object-center'
			/>
			<div className='absolute top-[5.5%] right-[.5%]'>
				<SettingNoteButton id={note.id} />
			</div>
			<div className='bg-notable-primary-150 pt-3 pb-5 px-4 rounded-xl flex flex-col gap-y-2 w-full h-auto'>
				<div className='text-nowrap whitespace-pre font-medium text-lg'>{note.title}</div>
				<NoteArea
					value={note.note}
					className='pe-4'
				/>
			</div>
		</div>
	);
}
