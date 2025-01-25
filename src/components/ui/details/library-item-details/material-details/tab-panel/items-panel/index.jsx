import React, { useState } from "react";

import ItemCard from "@/components/ui/cards/item-card";
import SearchBox from "@/components/ui/search-box";

import { itemsData } from "@/constants/mockup-data/library";

const MaterialItemsPanel = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="py-1.5">
      <SearchBox keywordSetter={setSearchKeyword} />
      <div className="flex flex-col gap-[18px]">
        {itemsData
          .filter((item) =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
          )
          .map((item, index) => (
            <ItemCard key={`item-card-${index}`} data={item} />
          ))}
      </div>
    </div>
  );
};

export default MaterialItemsPanel;
