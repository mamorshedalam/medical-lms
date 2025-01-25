import React from "react";

import MaterialCard from "@/components/ui/cards/material-card";
import { materialsData } from "@/constants/mockup-data/library";

const AnnalesMaterialPanel = () => {
  return (
    <div className="py-1.5">
      <div className="flex flex-col gap-[18px] mt-5">
        {materialsData.map((item, index) => (
          <MaterialCard key={`material-card-${index}`} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AnnalesMaterialPanel;
