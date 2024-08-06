import { useCallback, useMemo, useRef } from 'react';
import useNoteStore  from '../../../../lib/store/useNoteStore';
import useDeleteNote from '../../../../lib/useDeleteNote';
import useCopyToClipboard from '../../../../lib/useCopyToClipboard';
import useClickOutside from '../../../../lib/useClickOutside';


export const useEditNoteMenu = () => {
  const { openedNote, setOpenedNote, buttonRef, getOpenNote,removeItem,setAutoScrollDisable } = useNoteStore();
  const { handleDeleteNote } = useDeleteNote();
  const [copyToClipboard] = useCopyToClipboard();
  const menuRef = useRef<HTMLDivElement>(null);

  const open = useMemo(() => openedNote.id !== ' ' && Boolean(openedNote.id), [openedNote.id, openedNote.y]);

  const closeMenu = useCallback(() => {
    if (open) setOpenedNote({ id: '', x: 0, y: 0 });
  }, [open, setOpenedNote]);

  useClickOutside(menuRef, closeMenu, buttonRef!);

  const handleCopy = useCallback(() => {
    copyToClipboard(getOpenNote());
    closeMenu();
  }, [copyToClipboard, getOpenNote]);
  const handleRemoveNote = useCallback(() => {
    handleDeleteNote(openedNote.id);
    removeItem(openedNote.id);
    closeMenu();
    setAutoScrollDisable(false);
  }, [openedNote,removeItem]);

  const position = { left: `${openedNote.x}px`, top: `${openedNote.y}px` };

  return { menuRef, open, position, handleRemoveNote, handleCopy };
};