import useSidebarStore from "@/lib/store/useSidebarStore";
import useClickOutside from "@/lib/useClickOutside";
import {  useRef } from "react";


const useSettingMenu = ()=>{
    const {settings,setOpenSettings,buttonRef} = useSidebarStore();
    const menuRef = useRef<HTMLDivElement>(null);
    const position  = { left: `${settings.x}px`, top: `${settings.y}px` };
    const closeMenu = ()=> setOpenSettings({ id: "", x: 0, y: 0 });
    useClickOutside(menuRef, closeMenu, buttonRef!);
    
    return [menuRef,settings,position] as const
}

export default useSettingMenu;