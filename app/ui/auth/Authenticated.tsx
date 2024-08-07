import type { ChildrenAndFallback } from '@/app/models/types';
import { useSession } from 'next-auth/react';

export default function Authenticated({ children, fallback }: ChildrenAndFallback) {
	const { status } = useSession();

	return status === 'authenticated' ? children : fallback;
}
