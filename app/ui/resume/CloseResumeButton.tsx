import type { ButtonProps } from '@/app/models/types';
import DoubleArrowLeftIcon from '../icons/DoubleArrowLeftIcon';

const CloseResumeButton = ({ onClick }: ButtonProps) => (
	<button onClick={onClick}>
		<DoubleArrowLeftIcon />
	</button>
);

export default CloseResumeButton;
