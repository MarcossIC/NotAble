import { useCallback, useEffect, type RefObject } from 'react';

export default function useGotoBottom(container: RefObject<HTMLDivElement>) {
	const scrollToBottom = useCallback(() => {
		if (container.current) {
			const { scrollHeight } = container.current;
			container.current.scrollTop = scrollHeight;
		}
	}, [container]);

	useEffect(() => {
		scrollToBottom();
	}, [container.current, container.current?.scrollHeight]);
}
