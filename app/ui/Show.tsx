import type { ReactNode } from 'react';
import type { ChildrenProps } from '../models/types';

interface ShowProps extends ChildrenProps {
	when: boolean;
	fallBack?: ReactNode;
}

export default function Show({ when, fallBack, children }: ShowProps) {
	if (when) return children;

	return fallBack;
}
