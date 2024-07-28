import type { ButtonProps } from '@/app/models/types';

const CloseResumeButton = ({ onClick }: ButtonProps) => (
	<button onClick={onClick}>
		<svg
			height='24px'
			viewBox='0 -960 960 960'
			width='24px'
			fill='#e8eaed'>
			<path d='M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z' />
		</svg>
	</button>
);

export default CloseResumeButton;
