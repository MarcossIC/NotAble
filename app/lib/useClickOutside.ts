import { useEffect, type RefObject } from 'react';

const useClickOutside = (
	ref: RefObject<HTMLElement>,
	callback: () => void,
	ignoreRef?: RefObject<HTMLElement>,
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const element = event.target as Node;
			if (
				ref.current &&
				!ref.current.contains(element) &&
				(!ignoreRef ||
					!ignoreRef.current ||
					!ignoreRef.current.contains(element))
			) 
				callback();
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, ignoreRef, callback]);
};

export default useClickOutside;
