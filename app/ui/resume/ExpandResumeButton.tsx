'use client';

import useResumeStore from '@/lib/store/useResumePreferenceStore';
import Show from '../core/Show';
import Authenticated from '../auth/Authenticated';

export default function ExpandResumeButton() {
	const { setOpen, resume } = useResumeStore();
	return (
		<Authenticated>
			<Show when={!!resume}>
				<button
					className='float-button-rounded top-[10%] group'
					onClick={() => setOpen(true)}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						width={24}
						height={24}
						className='size-6 transition-transform duration-500 group-hover:translate-x-[-25%] group-hover:scale-[1.1]'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5'
						/>
					</svg>
				</button>
			</Show>
		</Authenticated>
	);
}
