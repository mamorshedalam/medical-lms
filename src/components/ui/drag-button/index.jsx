import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";

const DragButton = ({ handler }) => {
  const [eventStarted, setEventStarted] = useState(false);
  const [start, setStart] = useState(0);
  const [percent, setPercent] = useState(0);
  const wrapper = useRef(null);
  return (
    <button
      ref={wrapper}
      className="group relative flex items-center flex-1 h-12 max-w-40 p-1 rounded-[28px] bg-white shadow-lg"
    >
      <span
        draggable
        onDragStart={(e) => {
          console.log(e.clientX);
          setStart(e.clientX);
          setEventStarted(true);
        }}
        onDrag={(e) => {
          if (eventStarted) {
            let delta = (e.clientX - start) / 100;
            console.log(delta);

            if (delta < 0) setPercent(delta);
            else if (delta > 1) setPercent(72);
            else setPercent(delta * 72);
          }
        }}
        onDragEnd={(e) => {
          let delta = (e.clientX - start) / 160;
          if (delta > 0.8) {
            handler();
            setPercent(72);
            setStart(0);
          } else {
            setPercent(0);
            setStart(0);
          }
          setEventStarted(false);
        }}
        className="draggable-item absolute flex justify-center items-center h-10 w-1/2 mx-1 shadow-lg border rounded-[24px] bg-white text-black group-hover:bg-primary group-hover:text-white transition-all"
        style={{ touchAction: "none", left: `${percent}px`, userSelect: "none" }}
      >
        <ArrowRightIcon width={20} />
      </span>
      <span className="flex-1 px-2 font-bold font-manrope text-sm text-end">
        Terminer
      </span>
    </button>
  );
};

export default DragButton;
