import React from "react";

import MaterialCard from "@/components/ui/cards/material-card";
import { materialsDummyData } from "@/constants/mockup-data/library";

const AnnalesMaterialPanel = () => {
  return (
    <div className="py-1.5">
      <div className="flex flex-col gap-[18px] mt-5">
        {materialsDummyData.map((item, index) => (
          <MaterialCard key={`material-card-${index}`} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AnnalesMaterialPanel;
