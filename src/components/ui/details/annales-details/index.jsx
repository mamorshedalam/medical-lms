import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TabNav from "@/components/ui/tabs/tab-nav";
import TabPanel from "@/components/ui/tabs/tab-panel";

import { materialsDummyData } from "@/constants/mockup-data/library";
import AllAnnalsPanel from "./tab-panel/all-annals-panel";
import AnnalesItemsPanel from "./tab-panel/items-panel";
import AnnalesMaterialPanel from "./tab-panel/material-panel";
import AnnalesHistoryPanel from "./tab-panel/history-panel";
import AnnalesSessionsPanel from "./tab-panel/sessions-panel";

const AnnalesDetails = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { material } = router.query;

  useEffect(() => {
    setDetails(materialsDummyData[0]);
  }, [material]);

  const tabs = [
    "Toutes les annales",
    "Sessions",
    "Matières",
    "Items",
    "History",
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="my-8 font-sf-pro font-extrabold text-4xl">Annales</h2>
        </div>
      </div>
      <div>
        <div className="flex gap-6 border-b border-[rgba(0,0,0,0.1)]">
          {tabs.map((item, index) => (
            <TabNav
              key={`tab-nav-${index}`}
              text={item}
              isActive={activeTabIndex === index}
              click={() => {
                setActiveTabIndex(index);
              }}
            />
          ))}
        </div>
        <div>
          <TabPanel isActive={activeTabIndex === 0}>
            <AllAnnalsPanel />
          </TabPanel>
          <TabPanel isActive={activeTabIndex === 1}>
            <AnnalesSessionsPanel />
          </TabPanel>
          <TabPanel isActive={activeTabIndex === 2}>
            <AnnalesMaterialPanel />
          </TabPanel>
          <TabPanel isActive={activeTabIndex === 3}>
            <AnnalesItemsPanel />
          </TabPanel>
          <TabPanel isActive={activeTabIndex === 4}>
            {details && <AnnalesHistoryPanel name={details.name} />}
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default AnnalesDetails;
