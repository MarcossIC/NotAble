import { useEffect, type RefObject } from 'react';

function isTouchDevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

const useClickOutside = (ref: RefObject<HTMLElement>, handler: () => void, ignoreRef?: RefObject<HTMLElement>) => {
	useEffect(() => {
		const isTouchAvalaible = isTouchDevice();
		const listener = (event: MouseEvent | TouchEvent) => {
			event.stopPropagation();
			const element = event.target as Node;
			if (ref.current && !ref.current.contains(element) && (!ignoreRef || !ignoreRef.current || !ignoreRef.current.contains(element))) handler();
		};

		document.addEventListener('mousedown', listener);
		if(isTouchAvalaible) document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			if(isTouchAvalaible) document.removeEventListener('touchstart', listener);
		};
	}, [ref, ignoreRef, handler]);
};

export default useClickOutside;
