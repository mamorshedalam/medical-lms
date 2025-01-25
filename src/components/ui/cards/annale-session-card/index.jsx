import React, { useState } from "react";
import { Collapse } from "react-collapse";
import * as cn from "classnames";
import AngleDown from "@/assets/icons/angle-down";
import { materialTypes } from "@/constants/mockup-data/library";

const AnnaleSessionCard = ({ data }) => {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);

  return (
    <div
      className={cn({
        "rounded-xl px-6 py-4": true,
        "bg-[#F8F8F9]": !checked,
        "bg-[#F3F2FE]": checked,
      })}
    >
      <div className="flex gap-3 items-center">
        <div
          onClick={() => setChecked(!checked)}
          className={cn({
            "flex justify-center items-center w-5 h-5 border-2 border-[#8C8A94] rounded-lg": true,
            "": !checked,
            "bg-primary border-primary": checked,
          })}
        >
          {checked && (
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8892 0.834276C11.4017 1.34672 11.4017 2.17756 10.8893 2.69005L4.77826 8.80208C4.26571 9.31472 3.43463 9.31475 2.92203 8.80216L0.521688 6.40181C0.00920182 5.88933 0.00920168 5.05842 0.521688 4.54594C1.03417 4.03345 1.86508 4.03345 2.37756 4.54594L3.85019 6.01856L9.03326 0.834375C9.54572 0.321802 10.3767 0.321757 10.8892 0.834276Z"
                fill="white"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-1 items-center gap-2">
          <div className="flex items-center gap-2 px-2 py-1 shadow border rounded-lg">
            <span className="px-1.5 py-1 text-white bg-[#2F3037] text-[10px] font-manrope rounded-md shadow">
              {data.edn}
            </span>
            <span className="text-xs font-bold font-manrope">
              {data.qType} {data.qId}
            </span>
          </div>
          {data.questions && (
            <div className="h-[22px] px-1.5 py-1 font-semibold font-manrope text-[8px] border rounded">
              {data.questions} questions
            </div>
          )}
        </div>
        <div
          className={cn({
            "flex items-center justify-center w-8 h-8 cursor-pointer transition-all": true,
            "rotate-180": opened,
          })}
          onClick={() => setOpened(!opened)}
        >
          <AngleDown color={opened ? "#4940AE" : "#85868E"} />
        </div>
      </div>
      <Collapse
        isOpened={opened}
        initialStyle={{ height: 0, overflow: "hidden" }}
      >
        <div className="flex gap-3 items-center pt-2.5">
          <div className="w-5 h-5 border-2 border-transparent"></div>
          <div className="flex flex-col gap-1">
            {data.material && (
              <div className="flex items-center gap-1">
                {data.material[0] &&
                  materialTypes.filter((item) => item.id === data.material[0])
                    .length > 0 && (
                    <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4]">
                      <img
                        src={
                          materialTypes.find(
                            (item) => item.id === data.material[0]
                          ).logo
                        }
                        className="w-4"
                      />
                      <span className="font-manrope font-bold text-[10px]">
                        {
                          materialTypes.find(
                            (item) => item.id === data.material[0]
                          ).name
                        }
                      </span>
                    </div>
                  )}
                {data.material[1] &&
                  materialTypes.filter((item) => item.id === data.material[1])
                    .length > 0 && (
                    <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4]">
                      <img
                        src={
                          materialTypes.find(
                            (item) => item.id === data.material[1]
                          ).logo
                        }
                        className="w-4"
                      />
                      <span className="font-manrope font-bold text-[10px]">
                        {
                          materialTypes.find(
                            (item) => item.id === data.material[1]
                          ).name
                        }
                      </span>
                    </div>
                  )}
                {data.material[2] &&
                  materialTypes.filter((item) => item.id === data.material[1])
                    .length > 0 && (
                    <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4]">
                      <img
                        src={
                          materialTypes.find(
                            (item) => item.id === data.material[1]
                          ).logo
                        }
                        className="w-4"
                      />
                      <span className="font-manrope font-bold text-[10px]">
                        {
                          materialTypes.find(
                            (item) => item.id === data.material[1]
                          ).name
                        }
                      </span>
                    </div>
                  )}
                {data.material.length > 3 && (
                  <div className="flex items-center h-5 w-5 px-1 py-0.5 rounded bg-[#F3F3F4] border border-[#E2E2E4] text-[10px]">
                    +{data.material.length - 3}
                  </div>
                )}
              </div>
            )}

            {data.items && (
              <div className="flex items-center gap-1">
                {data.items[0] && (
                  <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4]">
                    <span className="item-index flex justify-center items-center h-5 w-5 text-[6px] font-manrope font-semibold border border-[#ECECED] rounded bg-white">
                      {data.items[0].index}
                    </span>
                    <span className="font-manrope font-bold text-[10px] whitespace-nowrap text-ellipsis overflow-hidden max-w-28">
                      {data.items[0].title}
                    </span>
                  </div>
                )}
                {data.items[1] && (
                  <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4]">
                    <span className="item-index flex justify-center items-center h-5 w-5 text-[6px] font-manrope font-semibold border border-[#ECECED] rounded bg-white">
                      {data.items[1].index}
                    </span>
                    <span className="font-manrope font-bold text-[10px] whitespace-nowrap text-ellipsis overflow-hidden max-w-28">
                      {data.items[1].title}
                    </span>
                  </div>
                )}
                {data.items[2] && (
                  <div className="flex items-center gap-1 h-7 px-1.5 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4]">
                    <span className="item-index flex justify-center items-center h-5 w-5 text-[6px] font-manrope font-semibold border border-[#ECECED] rounded bg-white">
                      {data.items[2].index}
                    </span>
                    <span className="font-manrope font-bold text-[10px] whitespace-nowrap text-ellipsis overflow-hidden max-w-28">
                      {data.items[2].title}
                    </span>
                  </div>
                )}
                {data.items.length > 3 && (
                  <div className="flex items-center h-5 w-5 px-1 py-0.5 rounded bg-[#F3F3F4] border border-[#E2E2E4] text-[10px]">
                    +{data.items.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default AnnaleSessionCard;
