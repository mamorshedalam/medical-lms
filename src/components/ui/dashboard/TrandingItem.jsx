import React from 'react';
import { PhoneXMarkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TrendingUpIcon from "@/assets/icons/TrendingUpIcon";

const TrandingItem = ({ withIcon = true, withDeleteIcon = false, deleteAction, children, action }) => {
  return (
    <div
      onClick={action}
      className="flex items-center px-2 py-1 gap-1 w-fit rounded-lg font-medium bg-green-50 border-2 border-green-300 text-green-700 hover:font-bold hover:border-green-700 hover:cursor-pointer click-action"
    >
      {withIcon && <TrendingUpIcon className="w" />} {children}{" "}
      {withDeleteIcon && (
        <PhoneXMarkIcon onClick={deleteAction} className="w-5 h-4 hover:h-5" />
      )}
    </div>
  );
};

export default TrandingItem;
