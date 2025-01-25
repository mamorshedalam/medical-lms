import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function RecentItem({
  withIcon = true,
  withDeleteIcon = false,
  deleteAction = () => {
    console.log("delete tranding item");
  },
  action = () => {
    console.log("Go to ...");
  },
  children,
}) {
  return (
    <div onClick={action} className="flex items-center px-4 py-1 gap-1 w-fit rounded-lg font-medium text-lg border-2 border-gray-400 text-gray-600 hover:font-semibold hover:border-violet-600 hover:text-violet-600 hover:cursor-pointer hover:bg-violet-100 click-action">
      {children}
      {withDeleteIcon && (
        <XMarkIcon onClick={deleteAction} className="w-5 h-4 hover:h-5" />
      )}
    </div>
  );
}

export default RecentItem;
