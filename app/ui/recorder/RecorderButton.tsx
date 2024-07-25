import type { ButtonProps } from '@/app/models/types';
import css from './recorder.module.css';

const RecorderButton = ({ onClick, isActive, isDisabled }: ButtonProps) => (
	<button
		tabIndex={1}
		aria-label={isActive ? 'Stop recording' : 'Start recording'}
		onClick={onClick}
		className={css.recorderButton}
		disabled={isDisabled}
		value={isActive ? 1 : 0}></button>
);

export default RecorderButton;
