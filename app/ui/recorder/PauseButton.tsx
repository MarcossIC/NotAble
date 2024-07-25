import type { ButtonProps } from '@/app/models/types';
import css from './recorder.module.css';

const PauseButton = ({ onClick, isActive, isDisabled }: ButtonProps) => (
	<button
		tabIndex={2}
		aria-label={isActive ? 'Resume recording' : 'Pause recording'}
		onClick={onClick}
		className={css.pauseRecorderButton}
		disabled={isDisabled}
		value={isActive ? 1 : 0}>
		<svg
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth='1.5'
			stroke='currentColor'
			className='size-7'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M15.75 5.25v13.5m-7.5-13.5v13.5'
			/>
		</svg>
	</button>
);

export default PauseButton;
