'use client';

import useResumeStore from '@/lib/store/useResumePreferenceStore';
import Show from '../core/Show';
import Authenticated from '../auth/Authenticated';
import ChevronLeftIcon from '../icons/ChevronLeftIcon';

export default function ExpandResumeButton() {
	const { setOpen, resume } = useResumeStore();
	return (
		<Authenticated>
			<Show when={!!resume}>
				<button
					className='float-button-rounded top-[10%] group'
					onClick={() => setOpen(true)}>
					<ChevronLeftIcon hover />
				</button>
			</Show>
		</Authenticated>
	);
}
