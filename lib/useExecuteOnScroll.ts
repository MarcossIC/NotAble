import { useEffect, type RefObject } from 'react';

const useExecuteOneScroll = (ref: RefObject<HTMLElement> | Document | Window, listener: EventListener) => {
	useEffect(() => {
		const currentContainer = 'current' in ref ? ref.current : ref;

		if (currentContainer) currentContainer.addEventListener('scroll', listener);
		return () => {
			if (currentContainer) currentContainer.removeEventListener('scroll', listener);
		};
	}, [listener]);
};

export default useExecuteOneScroll;
