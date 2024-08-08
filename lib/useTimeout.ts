import { useCallback, useEffect, useRef } from 'react';

type AcceptCallback = () => void

const useTimeout = (callback: AcceptCallback, delay: number) => {
	const timeoutRef = useRef<number | null>(null);
	const savedCallback = useRef<AcceptCallback>(callback);
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	const clear = useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const oneExecute = useCallback(() => {
		clear();
		timeoutRef.current = window.setTimeout(() => savedCallback.current(), delay);
	}, [clear, delay]);

	useEffect(() => {
		return clear;
	}, [clear]);

	return { clear, oneExecute };
};
export default useTimeout;
