import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBoxSM = () => {
  return (
    <div className="flex items-center max-w-60 h-9 px-1.5 gap-1 border border-[#E5E7EB] rounded-lg shadow-inside">
      <MagnifyingGlassIcon width={16} height={16} />
      <input
        type="text"
        placeholder="Search for items"
        className="bg-transparent"
      />
    </div>
  );
};

export default SearchBoxSM;
