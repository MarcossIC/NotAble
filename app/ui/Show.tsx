import { memo, type ReactNode } from 'react';
import type { ChildrenProps } from '@/app/models/types';

interface ShowProps extends ChildrenProps {
	when: boolean;
	fallBack?: ReactNode;
}
const MemoizedShow = memo(
	function Show({ when, fallBack, children }: ShowProps) {
		if (when) return children;

		return fallBack;
	},
	(prev, next) => prev.when === next.when
);

export default MemoizedShow;
