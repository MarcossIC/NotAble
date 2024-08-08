import { useEffect, type RefObject } from 'react';

type Scrollable = HTMLElement | Document | Window;
type ReferenceAccept = RefObject<HTMLElement> | Document | Window;
type Listener = (event: Event) => void;

const useExecuteOneScroll = (ref: ReferenceAccept, listener: Listener) => {
	useEffect(() => {
		const currentContainer: Scrollable | null = 'current' in ref ? ref.current : ref;

		if (currentContainer) currentContainer.addEventListener('scroll', listener);
		return () => {
			if (currentContainer) currentContainer.removeEventListener('scroll', listener);
		};
	}, [listener]);
};

export default useExecuteOneScroll;
