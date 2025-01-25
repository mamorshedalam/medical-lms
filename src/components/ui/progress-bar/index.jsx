import React from "react";
import * as cn from "classnames";

const ProgressBar = ({ className, percent, dark = false }) => {
  return (
    <div
      className={cn([
        "h-2.5 w-full p-0.5 bg-gradient-progressbar-bg rounded-full",
        className,
      ])}
    >
      <div
        className={cn({
          "h-full rounded-full": true,
          "bg-gradient-progressbar-thumb-dark": dark,
          "bg-gradient-progressbar-thumb": !dark,
        })}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
