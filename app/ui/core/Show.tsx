import { memo, type ReactNode } from 'react';
import type { ChildrenProps } from '@/app/models/types';

interface ShowProps extends ChildrenProps {
	when: boolean;
	updateAnd?: unknown;
	fallBack?: ReactNode;
}
const MemoizedShow = memo(
	function Show({ when, fallBack, children }: ShowProps) {
		return when ? children : fallBack;
	},
	(prev, next) => prev.when === next.when && prev.updateAnd === next.updateAnd
);

export default MemoizedShow;
