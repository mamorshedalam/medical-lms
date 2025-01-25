import React from "react";

import HorizontalDivider from "@/components/ui/horizontal-divider";
import ButtonOne from "@/components/ui/button-one";
import HelpIcon from "@/assets/icons/help";
import LogoutIcon from "@/assets/icons/logout";

import SidebarTab from "./sidebar-tab";
import SidebarSearchbox from "./sidebar-searchbox";
import SidebarActionBtn from "./sidebar-action-btn";
import FavoritesList from "./favorites-list";

import { SidebarListOne, SidebarListTwo } from "@/constants/sidebar-list";
import { appStore, modal } from "@/store/store";
import { useAuth } from "@/providers/authProvider";
import { useAuth0 } from "@auth0/auth0-react";

const LeftSidebar = () => {
  const { user, logout } = useAuth0();

  const openModal = () => {
    const currentModalState = appStore.get(modal);
    appStore.set(modal, { ...currentModalState, customTest: true });
  };
  
  return (
    <aside className="flex flex-col md:w-[256px] w-[96px] pt-10 pb-6 h-screen transition-all duration-300">
      <div className="w-full pb-6 md:pb-5 text-center transition-all">
        <span className="text-white font-laira md:text-[48px] text-[32px] italic leading-none transition-all duration-300">
          SUPEX
        </span>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="max-md:flex max-md:flex-col items-center w-full px-3 transition-all">
          <SidebarSearchbox />
        </div>
        <div className="max-md:flex max-md:flex-col max-md:gap-3 w-full px-3 transition-all">
          <div className="flex flex-col gap-1.5 max-md:gap-3 transition-all">
            {SidebarListOne.map((item, index) => (
              <SidebarTab {...item} key={`sidebar-list-one-${index}`} />
            ))}
          </div>
          <HorizontalDivider />
          <div className="flex flex-col gap-1.5 max-md:gap-3 transition-all">
            {SidebarListTwo.map((item, index) => (
              <SidebarTab {...item} key={`sidebar-list-one-${index}`} />
            ))}
          </div>
          <HorizontalDivider />
        </div>
        <div className="max-md:hidden flex justify-center pt-6">
          <ButtonOne text="Custom test" click={openModal} />
        </div>
        <div className="flex flex-col flex-1 px-3 gap-1.5 max-md:gap-3 justify-end">
          <FavoritesList />
          <div className="max-md:flex max-md:justify-center transition-all">
            <SidebarActionBtn text="Help" click={() => { }} icon={HelpIcon} />
          </div>
          <div className="max-md:flex max-md:justify-center transition-all">
            <SidebarActionBtn
              click={logout}
              text="Log out"
              icon={LogoutIcon}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
