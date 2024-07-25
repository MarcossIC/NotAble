'use client';

import type { ChildrenAndFallback } from '@/app/models/types';
import { useSession } from 'next-auth/react';

export default function AuthLoaded({ children, fallback }: ChildrenAndFallback) {
	const { status } = useSession();

	if (status !== 'loading') {
		return children;
	}

	return fallback;
}
