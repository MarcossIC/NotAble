'use client';

import useResumeStore from '@/lib/store/useResumePreferenceStore';
import Authenticated from '../auth/Authenticated';
import useClickOutside from '@/lib/useClickOutside';
import { useRef } from 'react';
import CloseResumeButton from './CloseResumeButton';
import Show from '../Show';

function formatText(text: string) {
	text = text.replace('**Puntos más importantes:**', '<br/><br/><strong>Puntos más importantes:</strong><br/>');
	//text = text.replace(/\* /g, '<br/>* ');
	const listItems = text.match(/\* .+(\n\* .+)*/);
	if (listItems) {
		const items = listItems[0]
			.split('\n')
			.map((item) => item.replace(/\* /, '<li>') + '</li>')
			.join('');
		text = text.replace(listItems[0], `<ul>${items}</ul>`);
	}
	return text;
}

export default function NoteResume() {
	const { open, resume, setOpen } = useResumeStore();
	const containerRef = useRef<HTMLDivElement>(null);
	const handleOpen = () => {
		if (open) setOpen(!open);
	};
	useClickOutside(containerRef, handleOpen);

	return (
		<Authenticated>
			<div
				ref={containerRef}
				className={`absolute overflow-y-hidden bg-notable-primary-50 right-0 z-20 transition-all duration-500  ${open ? 'h-full w-[50%]  opacity-100 contain-inline-size' : 'h-0 w-0 opacity-0 contain-content'}`}>
				<Show when={open}>
					<>
						<div className='py-2 px-5 flex justify-between items-center'>
							<CloseResumeButton onClick={handleOpen} />
						</div>
						<h3 className='font-medium text-3xl w-full text-left pt-2 pb-2 px-5'>AI Resume</h3>
						<div className='px-5 py-3 h-[80cqh] overflow-y-auto'>
							<p dangerouslySetInnerHTML={{ __html: formatText(resume) }}></p>
						</div>
					</>
				</Show>
			</div>
		</Authenticated>
	);
}
