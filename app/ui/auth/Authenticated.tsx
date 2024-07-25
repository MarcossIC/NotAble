import type { ChildrenProps } from '@/app/models/types';
import { useSession } from 'next-auth/react';

export default function Authenticated({ children }: ChildrenProps) {
	const { status } = useSession();

	if (status === 'authenticated') {
		return children;
	}

	return undefined;
}
