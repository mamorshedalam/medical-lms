import React, { useEffect, useState } from "react";
import * as cn from "classnames";

const TogglerTwo = ({isChecked, setIsChecked}) => {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
            readOnly
            />
          <div
            className={cn({
              "block h-5 w-8 rounded-full transition-all": true,
              "bg-primary": isChecked,
              "bg-[#E2E2E4]": !isChecked,
            })}
          ></div>
          <div
            className={cn({
              "dot absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all": true,
              "left-[45%]": isChecked,
              "left-[10%]": !isChecked,
            })}
          ></div>
        </div>
      </label>
    </>
  );
};

export default TogglerTwo;
