import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TabNav from "@/components/ui/tabs/tab-nav";
import TabPanel from "@/components/ui/tabs/tab-panel";

import { materialsData } from "@/constants/mockup-data/library";
import DonutChartOne from "@/components/ui/chart/donut-chart-one";
import DonutChartTwo from "@/components/ui/chart/donut-chart-two";
import MaterialAvancementGlobalPanel from "./tab-panel/avancement-global-panel";
import MaterialItemsPanel from "./tab-panel/items-panel";
import MaterialSavedQuestionsPanel from "./tab-panel/saved-questions-panel";
import MaterialCardsPanel from "./tab-panel/cards-panel";
import MaterialHistoryPanel from "./tab-panel/history-panel";

const MaterialDetails = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { material } = router.query;

  useEffect(() => {
    const index = materialsData.findIndex((item) => item.slug === material);
    if (index > -1) {
      setDetails(materialsData[index]);
    }
  }, [material]);

  const tabs = [
    "Avancement global",
    "Items",
    "Saved questions",
    "Cards",
    "History",
  ];

  return (
    <div>
      {details && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={details.logo}
                alt="Material Logo Image"
                width={48}
                height={48}
              />
              <h2 className="font-sf-pro font-extrabold text-4xl">
                {details.name}
              </h2>
            </div>
            <div className="flex gap-3">
              <div
                className="rounded-xl w-40 h-40"
                style={{
                  boxShadow: "0px 2.96px 8.88px 1.48px #00000012 inset",
                }}
              >
                <DonutChartOne />
              </div>
              <div
                className="flex rounded-xl w-40 h-40 justify-center items-center"
                style={{
                  boxShadow: "0px 2.96px 8.88px 1.48px #00000012 inset",
                }}
              >
                <DonutChartTwo />
              </div>
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
                {details && <MaterialAvancementGlobalPanel data={details} />}
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 1}>
                <MaterialItemsPanel />
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 2}>
                <MaterialSavedQuestionsPanel />
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 3}>
                <MaterialCardsPanel />
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 4}>
                {details && <MaterialHistoryPanel name={details.name} />}
              </TabPanel>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialDetails;
