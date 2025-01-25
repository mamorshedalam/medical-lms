import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TabNav from "@/components/ui/tabs/tab-nav";
import TabPanel from "@/components/ui/tabs/tab-panel";

import { itemsData } from "@/constants/mockup-data/library";
import DonutChartOne from "@/components/ui/chart/donut-chart-one";
import DonutChartTwo from "@/components/ui/chart/donut-chart-two";
import ItemGoalsPanel from "./tab-panel/goals-panel";
import ItemAnnalesPanel from "./tab-panel/annales-panel";
import ItemSavedQuestionsPanel from "./tab-panel/saved-questions-panel";
import ItemCardsPanel from "./tab-panel/cards-panel";
import ItemHistoryPanel from "./tab-panel/history-panel";

const ItemDetails = () => {
  const router = useRouter();
  const [details, setDetails] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { material, item } = router.query;

  useEffect(() => {
    const index = itemsData.findIndex(
      (each) =>
        each.parent === material && each.index === parseInt(item.split(".")[0])
    );
    console.log(index);
    if (index > -1) {
      setDetails(itemsData[index]);
    }
  }, [material, item]);

  const tabs = ["Objectifs", "Saved questions", "Annales", "Cards", "History"];

  return (
    <div>
      {details && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex justify-center items-center w-14 h-9 font-sf-pro text-xl font-extrabold border border-custom-dark rounded-lg">{details.index}</span>
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
                {details && <ItemGoalsPanel />}
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 1}>
                <ItemSavedQuestionsPanel />
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 2}>
                <ItemAnnalesPanel />
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 3}>
                <ItemCardsPanel />
              </TabPanel>
              <TabPanel isActive={activeTabIndex === 4}>
                {details && <ItemHistoryPanel name={details.name} />}
              </TabPanel>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemDetails;
