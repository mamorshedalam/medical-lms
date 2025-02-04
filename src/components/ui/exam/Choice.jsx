import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import MessageAlertIcon from "@/assets/icons/MessageAlertIcon";
import Check from "./Check";

function Choice({
  label,
  content,
  checked,
  clickAction,
  desc,
  answered,
  isRight,
}) {
  // const { borderColor, bgColor } = answered
  //   ? isRight
  //     ? { borderColor: "border-green-dark", bgColor: "bg-green-bg" }
  //     : checked
  //     ? { borderColor: "border-red-dark", bgColor: "bg-red-bg" }
  //     : { borderColor: "border-gray-300", bgColor: "bg-white" }
  //   : { borderColor: "border-gray-300", bgColor: "bg-white" };

  const [dropdown, setDropdown] = useState(false);

  const getStyles = () => {
    if (answered) {
      return isRight
        ? { borderColor: "border-green-500", bgColor: "bg-green-100" } 
        : checked
          ? { borderColor: "border-red-500", bgColor: "bg-red-100" } 
          : { borderColor: "border-gray-300", bgColor: "bg-white" };
    }
    return checked
      ? { borderColor: "border-blue-500", bgColor: "bg-blue-100" } // Selection before submitting
      : { borderColor: "border-gray-300", bgColor: "bg-white" };
  };

  const { borderColor, bgColor } = getStyles();

  return (
    <div className="px-12 pb-3">
      <div
        className={`border-[1px] ${borderColor} ${bgColor} px-4 py-2 flex ${dropdown ? "rounded-t-lg border-b-0" : "rounded-lg"
          }`}
      >
        <div className="flex-1 flex gap-3">
          <span className={`w-6 h-6 rounded-full px-1 text-center font-bold bg-gray-200 text-gray-400`}>
            {label}
          </span>
          <div className="flex gap-3" onClick={clickAction}>
            <Check checked={checked} styleFill />
            {content}
          </div>
        </div>
        {answered && checked !== isRight && (
          <div>
            <MessageAlertIcon strokeWidth={3} />
          </div>
        )}
        {desc &&
          (dropdown ? (
            <i
              onClick={() => {
                setDropdown((state) => !state);
              }}
              className="ri-arrow-up-s-line"
            ></i>
          ) : (
            <i
              onClick={() => {
                setDropdown((state) => !state);
              }}
              className="ri-arrow-down-s-line"
            ></i>
          ))}
      </div>
      <Transition
        show={!!(dropdown && desc)}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`${bgColor} ${borderColor} border-2 border-t-0 pl-12 pr-4 py-2 rounded-b-lg`}
        >
          {desc}
        </div>
      </Transition>
    </div>
  );
}

export default Choice;
