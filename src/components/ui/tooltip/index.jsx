import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const Tooltip = () => {
  return (
    <div className="group flex items-center relative">
      <button
        data-tooltip-target="tooltip-light"
        data-tooltip-style="light"
        type="button"
        className="rounded-full w-3.5 h-3.5"
      >
        <InformationCircleIcon width={14} height={14} color="#C8C9CE" />
      </button>

      <div
        id="tooltip-light"
        role="tooltip"
        className="absolute bottom-full -left-8 w-20 z-10 invisible inline-block px-3 py-2 text-xs text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 group-hover:visible tooltip"
      >
        Tooltip content
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};

export default Tooltip;
