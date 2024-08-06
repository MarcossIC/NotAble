import { useCallback, useEffect, useRef } from "react";

const useTimeout = (callback: () => void, delay: number) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const savedCallback = useRef(callback);
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
		timeoutRef.current = setTimeout(() => savedCallback.current(), delay);
	}, [clear, delay]);

	useEffect(() => {
		return clear;
	  }, [clear]);

	return { clear, oneExecute };
};
export default useTimeout;