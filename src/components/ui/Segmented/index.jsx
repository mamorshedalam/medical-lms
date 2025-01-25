import React, { useEffect, useState } from "react";
import * as cn from "classnames";

const Segmented = ({ options }) => {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (options.length > 0) {
      setCurrent(options[0].value);
    }
  }, []);

  return (
    <div>
      <div className="inline-flex h-9 w-full items-baseline justify-start rounded-lg bg-gray-100 p-1 sm:w-auto shadow-gray">
        {options &&
          options.length > 0 &&
          options.map((option, index) => (
            <button
              type="button"
              key={`segment-option-${option.value}`}
              value={option.value}
              onClick={() => setCurrent(option.value)}
              className={cn({
                "group inline-flex items-center justify-center whitespace-nowrap py-2 align-middle font-semibold transition-all duration-300 ease-in-out disabled:cursor-not-allowed stroke-blue-700 min-w-[32px] gap-1.5 text-xs disabled:stroke-slate-400 disabled:text-slate-400 hover:stroke-blue-950 hover:text-blue-950 h-7 w-full sm:w-auto px-3": true,
                "rounded-md bg-white shadow": current === option.value,
                "rounded-lg  bg-transparent text-slate-500":
                  current !== option.value,
              })}
            >
              {option.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Segmented;
