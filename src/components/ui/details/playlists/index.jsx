import React, { useState } from "react";
import TabNav from "@/components/ui/tabs/tab-nav";
import TabPanel from "@/components/ui/tabs/tab-panel";

import SavedQuestionsPanel from "./tab-panel/saved-questions-panel";
import MyPlaylistsPanel from "./tab-panel/my-playlists-panel";

const PlaylistDetails = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="my-8 font-sf-pro font-extrabold text-4xl">Playlists</h2>
        </div>
      </div>
      <div>
        <div className="flex gap-6 border-b border-[rgba(0,0,0,0.1)]">
          <TabNav
            text="Saved questions"
            icon={
              <svg
                width="13"
                height="11"
                viewBox="0 0 13 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.61045 0.701392C4.89703 0.166726 4.00528 -0.0766005 3.11753 0.0211655C2.22978 0.118932 1.4131 0.550405 0.834469 1.22736C0.25584 1.90432 -0.0410257 2.77562 0.00457131 3.66312C0.0501683 4.55061 0.434784 5.38725 1.07978 6.00198L6.21866 10.8884C6.37803 11.0372 6.62522 11.0372 6.78134 10.8884L11.9202 6.00198C12.5652 5.38725 12.9498 4.55061 12.9954 3.66312C13.041 2.77562 12.7442 1.90432 12.1655 1.22736C11.5869 0.550405 10.7702 0.118932 9.88247 0.0211655C8.99472 -0.0766005 8.10297 0.166726 7.38955 0.701392L6.50163 1.37125L5.61045 0.701392Z"
                  fill="#151A1E"
                  fillOpacity={activeTabIndex === 0 ? 1 : 0.7}
                />
              </svg>
            }
            isActive={activeTabIndex === 0}
            click={() => {
              setActiveTabIndex(0);
            }}
          />
          <TabNav
            text="My playlists"
            icon={
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.000244141 1.25C0.000244141 0.918479 0.135703 0.600537 0.376821 0.366117C0.617939 0.131696 0.944966 0 1.28596 0H7.28596C7.62695 0 7.95398 0.131696 8.1951 0.366117C8.43621 0.600537 8.57167 0.918479 8.57167 1.25V5.41667C8.57167 5.74819 8.43621 6.06613 8.1951 6.30055C7.95398 6.53497 7.62695 6.66667 7.28596 6.66667H1.28596C0.944966 6.66667 0.617939 6.53497 0.376821 6.30055C0.135703 6.06613 0.000244141 5.74819 0.000244141 5.41667V1.25ZM3.50167 9.16667C3.59034 9.41048 3.7546 9.62156 3.97182 9.77081C4.18905 9.92006 4.44854 10.0001 4.71453 10H7.28596C7.90505 10 8.51807 9.88145 9.09004 9.65111C9.662 9.42078 10.1817 9.08317 10.6195 8.65757C11.0572 8.23197 11.4045 7.72671 11.6414 7.17063C11.8783 6.61456 12.0002 6.01856 12.0002 5.41667V4.58333C12.0004 4.32473 11.918 4.07245 11.7645 3.86126C11.611 3.65007 11.3939 3.49037 11.1431 3.40417V5.41667C11.1431 6.41123 10.7367 7.36506 10.0134 8.06832C9.29002 8.77158 8.30894 9.16667 7.28596 9.16667H3.50167ZM3.00024 8.33333C2.73425 8.33347 2.47476 8.25339 2.25754 8.10414C2.04031 7.95489 1.87605 7.74381 1.78739 7.5H7.28596C7.56736 7.5 7.84601 7.44611 8.106 7.34142C8.36598 7.23672 8.6022 7.08326 8.80119 6.88981C9.00017 6.69635 9.15801 6.46669 9.2657 6.21392C9.37339 5.96116 9.42882 5.69025 9.42882 5.41667V1.7375C9.6796 1.8237 9.89671 1.9834 10.0502 2.19459C10.2037 2.40578 10.2861 2.65806 10.286 2.91667V5.41667C10.286 6.19021 9.96989 6.93208 9.40728 7.47906C8.84467 8.02604 8.08161 8.33333 7.28596 8.33333H3.00024Z"
                  fill="#585C5F"
                  fillOpacity={activeTabIndex === 0 ? 1 : 0.7}
                />
              </svg>
            }
            isActive={activeTabIndex === 1}
            click={() => {
              setActiveTabIndex(1);
            }}
          />
        </div>
        <div>
          <TabPanel isActive={activeTabIndex === 0}>
            <SavedQuestionsPanel />
          </TabPanel>
          <TabPanel isActive={activeTabIndex === 1}>
            <MyPlaylistsPanel />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetails;
