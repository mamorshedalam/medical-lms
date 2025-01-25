import React, { useEffect, useRef } from "react";

import { annaleSessionData } from "@/constants/mockup-data/library";
import Timeline from "@/components/ui/timeline";
import AnnaleCard from "@/components/ui/cards/annale-card";

const AnnalesSessionsPanel = () => {
  const itemRefs = useRef(
    annaleSessionData.map((_, index) => React.createRef())
  );

  const scrollToItem = (index) => {
    console.log(index);
    const currentRef = itemRefs.current[index];
    if (currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <Timeline events={annaleSessionData} scrollToItem={scrollToItem} />
      </div>
      <div className="flex flex-col gap-[18px]">
        {annaleSessionData
          .sort((a, b) => b.time.localeCompare(a.time))
          .map((item, index) => (
            <div key={`annale-card-${index}`} ref={itemRefs.current[index]}>
              <AnnaleCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AnnalesSessionsPanel;
