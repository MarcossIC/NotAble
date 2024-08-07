'use client';

import { useEditNoteMenu } from './useEditNoteMenu';
import MenuContainer from '../../menu/MenuContainer';
import MenuButton from '../../menu/MenuButton';

export default function EditNoteMenu() {
	const { menuRef, open, position, handleRemoveNote, handleCopy } = useEditNoteMenu();

	return (
		<MenuContainer
			ref={menuRef}
			position={position}
			open={open}
			className='shadow-sm'>
			<MenuButton onClick={handleRemoveNote}>Remove note</MenuButton>
			<MenuButton onClick={handleCopy}>Copy note</MenuButton>
		</MenuContainer>
	);
}
