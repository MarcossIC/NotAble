import { useCallback, useEffect, useRef, type RefObject } from 'react';

type UseGotoBottomProps = {
	container: RefObject<HTMLDivElement>;
	disable: boolean;
	toggleDisable?: () => void;
	activeForLoading?: boolean;
  };
  
  export default function useGotoBottom({
	container,
	disable,
	toggleDisable,
	activeForLoading = false
  }: UseGotoBottomProps) {
	const lastHeight = useRef(0);
	const scrollToBottom = useCallback(() => {
		if (container.current && !disable) {
			const { scrollHeight } = container.current;
			if(scrollHeight > lastHeight.current){
				lastHeight.current = scrollHeight;
				container.current.scrollTop = scrollHeight;
			}
		}
		if(disable && toggleDisable) toggleDisable();
	}, [container, disable,lastHeight.current]);

	useEffect(() => {
		scrollToBottom();
	}, [container.current, container.current?.scrollHeight,activeForLoading]);
}
