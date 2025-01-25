import React from "react";
import * as cn from "classnames";

const Card = ({ children, className, ...attr }) => {
  return (
    <div
      className={cn(["bg-white rounded-lg shadow-card", className])}
      {...attr}
    >
      {children}
    </div>
  );
};

export default Card;
