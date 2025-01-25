import React from "react";
import * as cn from "classnames";

const ButtonOne = ({ text, className, click, disabled = false }) => {
  return (
    <button
      className={cn([
        "text-white font-inter font-semibold py-2.5 px-7 bg-primary rounded-full shadow-dark-purple hover:bg-custom-dark-purple transition-all disabled:pointer-events-none",
        className,
      ])}
      onClick={click}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ButtonOne;
