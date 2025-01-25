import React, { useEffect, useState } from "react";
import * as cn from "classnames";
import dayjs from "dayjs";

// Timeline component
const Timeline = ({ events, scrollToItem }) => {
  const [eventList, setEventList] = useState([]);

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1;
  const startYear = currentYear - 4; // Show 5 years

  useEffect(() => {
    if (events) {
      setEventList(getHighBottomPos(events));
    }
  }, [events]);

  // Calculate the width percentages for each year
  const getWidth = (year) => {
    if (year === currentYear) return currentMonth / 12;
    if (year === startYear) return (12 - currentMonth) / 12;
    return 1;
  };

  // Calculate the left position of each event based on its time
  const getEventLeftPosition = (event) => {
    const eventYear = parseInt(event.time.split("-")[0]);
    const eventMonth = parseInt(event.time.split("-")[1]);
    let totalMonth = 0;
    for (let i = startYear; i <= eventYear; i++) {
      if (i === startYear) {
        if (i === eventYear) {
          totalMonth += eventMonth - currentMonth;
        } else {
          totalMonth += 12 - currentMonth;
        }
      } else if (i === currentYear) {
        totalMonth += eventMonth;
      } else {
        if (i === eventYear) {
          totalMonth += eventMonth;
        } else {
          totalMonth += 12;
        }
      }
    }
    return `${(totalMonth / 48) * 100}%`;
  };

  // Calculate the left position of each event based on its time
  const getHighBottomPos = (items) => {
    let pos = ["B"];
    for (let i = 1; i < items.length; i++) {
      const posAYear = parseInt(items[i].time.split("-")[0]);
      const posAMonth = parseInt(items[i].time.split("-")[1]);
      const posBYear = parseInt(items[i - 1].time.split("-")[0]);
      const posBMonth = parseInt(items[i - 1].time.split("-")[1]);

      const distAB =
        Math.max(posAYear - posBYear, 0) * 12 + posAMonth - posBMonth;

      if (distAB > 8) {
        pos.push("B");
      } else {
        if (pos[i - 1] === "B") {
          pos.push("T");
        } else {
          pos.push("B");
        }
      }
    }

    return items.map((item, index) => ({ ...item, pos: pos[index] }));
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-full my-20">
        <div className="flex w-full items-center h-8 border rounded-2xl shadow-inside2">
          {Array.from({ length: 5 }, (_, i) => startYear + i).map((year) => (
            <div
              key={year}
              className="text-center font-manrope font-bold text-[#5B5C5F] text-xs flex-grow"
              style={{ flex: `${getWidth(year)}` }}
            >
              {year}
            </div>
          ))}
        </div>
        {eventList.map((event, index) => (
          <div
            key={`tooltip-${index}`}
            onClick={() => scrollToItem(index)}
            className={cn({
              "absolute width-[80px] h-6 bg-white text-[10px] text-[#85868E] hover:bg-custom-dark hover:text-white hover:z-[1000] font-bold font-manrope border p-1 rounded-lg shadow-lg transform -translate-x-1/2 cursor-pointer transition-all": true,
              "mb-2 bottom-full": event.pos === "T",
              "mt-2 top-full": event.pos === "B",
            })}
            style={{ left: getEventLeftPosition(event) }}
          >
            {event.name}
          </div>
        ))}
        {eventList.map((event, index) => (
          <div
            key={`vbar-${index}`}
            className="absolute w-px h-8 bg-[#D0D0D0] top-0"
            style={{ left: getEventLeftPosition(event) }}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
