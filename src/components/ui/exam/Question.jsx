import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

function Question({ question, num, active, onClick }) {
  var color;
  if (!question.result) {
    color = "white";
  } else if (question.result.score > 15) {
    color = "green-300";
  } else if (question.result.score > 3) {
    color = "orange-300";
  } else {
    color = "red-300";
  }
  return (
    <div
      onClick={onClick}
      className={`${active && "bg-primary"
        } inline-flex gap-2 items-center hover:cursor-pointer mx-8 mb-1 py-1 px-4 min-w-fit text-left rounded-md text-white hover:bg-primary active:bg-primary focus:bg-primary`}
    >
      <CheckCircleIcon className={`h-5 ${active && `fill-${color}`} `} />
      Question {num}
    </div>
  );
}

export default Question;
