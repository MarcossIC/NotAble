'use client';

import useResumeStore from '@/lib/store/useResumePreferenceStore';
import Authenticated from '../auth/Authenticated';
import useClickOutside from '@/lib/useClickOutside';
import { useRef } from 'react';
import CloseResumeButton from './CloseResumeButton';
import Show from '../core/Show';

const LIST_ITEMS_REGEX = /\* .+(\n\* .+)*/;

function formatText(rawText: string = '') {
	let formatText = rawText.replace('**Puntos más importantes:**', '<br/><br/><strong>Puntos más importantes:</strong><br/>');

	const listItems = formatText.match(LIST_ITEMS_REGEX);
	if (listItems) {
		const items = listItems[0]
			.split('\n')
			.map((item) => item.replace(/\* /, '<li>') + '</li>')
			.join('');
		formatText = formatText?.replace(listItems[0], `<ul>${items}</ul>`);
	}
	return formatText;
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
				className={`absolute overflow-y-hidden bg-notable-primary-50 right-0 z-20 transition-all duration-500 h-full text-notable-normal ${open ? ' w-[50%]  opacity-100 contain-inline-size' : 'w-0 opacity-0 contain-content'}`}>
				<Show
					when={open}
					updateAnd={resume}>
					<>
						<div className='py-2 px-5 flex justify-between items-center'>
							<CloseResumeButton onClick={handleOpen} />
						</div>
						<h3 className='font-medium text-3xl w-full text-left pt-2 pb-2 px-5'>AI Resume</h3>
						<div className='px-5 py-3 h-[80cqh] overflow-y-auto scrollbar-style'>
							<p dangerouslySetInnerHTML={{ __html: formatText(resume) }}></p>
						</div>
					</>
				</Show>
			</div>
		</Authenticated>
	);
}
