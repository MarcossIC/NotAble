import { useTheme } from 'next-themes';
import DarkIcon from '../../icons/DarkIcon';
import KeyIcon from '../../icons/KeyIcon';
import MenuButton from '../../menu/MenuButton';
import MenuContainer from '../../menu/MenuContainer';
import useSettingMenu from './useSettingMenu';

const SettingMenu = () => {
	const [menuRef, settings, position] = useSettingMenu();
	const { setTheme, theme } = useTheme();

	return (
		<MenuContainer
			ref={menuRef}
			open={settings.id === 'SideBarSetting'}
			position={position}
			className='shadow-custom-toast w-[9rem]'>
			<MenuButton
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
				className='text-notable-normal text-sm flex gap-x-3 justify-start items-center py-2'>
				<DarkIcon />
				Active Theme: {theme}
			</MenuButton>
			<MenuButton
				onClick={() => {}}
				className='text-notable-normal text-sm flex gap-x-3 justify-start items-center py-2'>
				<KeyIcon /> Api keys
			</MenuButton>
		</MenuContainer>
	);
};

export default SettingMenu;
