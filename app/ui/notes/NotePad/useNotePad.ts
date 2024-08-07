import { useSession } from 'next-auth/react';
import useAudioStore from '@/lib/store/useAudioStore';
import { useCallback, useRef } from 'react';
import useGotoBottom from '@/lib/useGotoBottom';
import useNoteStore from '@/lib/store/useNoteStore';
import useExecuteOneScroll from '@/lib/useExecuteOnScroll';

const useNotePad = () => {
	const { data: session } = useSession();
	const { loading } = useAudioStore();
	const { openedNote, setOpenedNote, autoScrollDisable, setAutoScrollDisable } = useNoteStore();
	const notesContainer = useRef<HTMLDivElement>(null);
	useGotoBottom({
		container: notesContainer,
		disable: autoScrollDisable,
		toggleDisable: () => setAutoScrollDisable(!autoScrollDisable),
		activeForLoading: loading,
	});
	const handleScroll = useCallback(() => {
		if (openedNote.id) setOpenedNote({ id: '', x: 0, y: 0 });
	}, [openedNote.id]);
	useExecuteOneScroll(notesContainer, handleScroll);

	return [notesContainer, loading, session] as const;
};

export default useNotePad;
