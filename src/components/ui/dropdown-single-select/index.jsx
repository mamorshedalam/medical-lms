import React, { useState, useRef } from "react";
import * as cn from "classnames";
import { useOutsideAlerter } from "@/utils/custom-hooks";

const DropdownSingleSelect = ({ className, options }) => {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(null);
  const [keyword, setKeyword] = useState("");
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, () => setOpened(false));

  return (
    <div className={cn(["relative", className])} ref={wrapperRef}>
      <button
        type="button"
        className="flex justify-between w-full text-custom-dark text-xs bg-custom-semi-light-gray hover:bg-primary hover:text-white min-w-28 focus:outline-none font-semibold rounded-lg px-3 h-9 text-center items-center dark:bg-custom-gray dark:hover:bg-primary transition-all"
        onClick={() => setOpened(!opened)}
      >
        {options.find((item) => item.value === selected)
          ? options.find((item) => item.value === selected).name
          : "Select Option"}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        className={cn({
          "absolute mt-1 z-10 w-full min-w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600": true,
          hidden: !opened,
        })}
      >
        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
          <li>
            <input
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
              className="border outline-none px-2 py-1 w-full rounded-md font-manrope"
            />
          </li>
          {options
            .filter((item) =>
              item.name.toLowerCase().includes(keyword.toLowerCase())
            )
            .map((option, index) => (
              <li key={`checkbox-item-${index}`}>
                <div className="flex items-center">
                  <input
                    id={`checkbox-item-${index}`}
                    type="checkbox"
                    value={option.value}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onClick={() =>
                      option.value === selected
                        ? setSelected(null)
                        : setSelected(option.value)
                    }
                    checked={option.value === selected}
                    readOnly
                  />
                  <span
                    onClick={() =>
                      option.value === selected
                        ? setSelected(null)
                        : setSelected(option.value)
                    }
                    className="ms-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                  >
                    {option.name}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownSingleSelect;
