import React from "react";
import * as cn from "classnames";

import PlusInCirclePrimary from "@/assets/svgs/plus-in-circle-primary";
import AngleRight from "@/assets/icons/angle-right";
import YellowThunder from "@/assets/svgs/yellow-thunder";
import LibrarySearch from "@/assets/svgs/library-search";
import {
  columns,
  customStyles,
  itemObjectives,
} from "@/constants/mockup-data/library";
import CustomAntdPagination from "@/components/ui/custom-antd-pagination";
import Card from "@/components/ui/card";
import { appStore, modal } from "@/store/store";

const ItemGoalsPanel = () => {
  const openModal = () => {
    const currentModalState = appStore.get(modal);
    appStore.set(modal, { ...currentModalState, launchTraining: true });
  };

  return (
    <>
      <div className="pt-7 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
          <Card
            onClick={openModal}
            className="px-3.5 py-5 scale-100 cursor-pointer hover:scale-[103%] transition-all"
          >
            <div className="flex items-center">
              <div className="flex w-6 h-6 justify-center items-center">
                <PlusInCirclePrimary />
              </div>
              <div className="flex-1 ml-3.5">
                <h4 className="font-manrope font-extrabold text-base text-[#2F3037]">
                  Lancer une série
                </h4>
                <p className="font-manrope font-normal text-xs text-[#86858E]">
                  Révision globale personnalisée
                </p>
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full">
                <AngleRight />
              </div>
            </div>
          </Card>
          <Card className="px-3.5 py-5 scale-100 cursor-pointer hover:scale-[103%] transition-all">
            <div className="flex items-center">
              <div className="flex w-6 h-6 justify-center items-center">
                <YellowThunder />
              </div>
              <div className="flex-1 ml-3.5">
                <h4 className="font-manrope font-extrabold text-base text-[#2F3037]">
                  Questions mal réussies
                </h4>
                <p className="font-manrope font-normal text-xs text-[#86858E]">
                  Révise et travaille tes lacunes
                </p>
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full">
                <AngleRight />
              </div>
            </div>
          </Card>
          <Card className="px-3.5 py-5 scale-100 cursor-pointer hover:scale-[103%] transition-all">
            <div className="flex items-center">
              <div className="flex w-6 h-6 justify-center items-center">
                <LibrarySearch />
              </div>
              <div className="flex-1 ml-3.5">
                <h4 className="font-manrope font-extrabold text-base text-[#2F3037]">
                  Questions inédites
                </h4>
                <p className="font-manrope font-normal text-xs text-[#86858E]">
                  Apprend de nouvelles notions
                </p>
              </div>
              <button className="flex items-center justify-center h-8 w-8 rounded-full">
                <AngleRight />
              </button>
            </div>
          </Card>
        </div>
      </div>
      <Card>
        <ul className="list-none">
          {itemObjectives.map((goal, index) => (
            <li
              key={`goal-${index}`}
              className="flex h-14 [&:not(:last-child)]:border-b"
            >
              <div className="flex flex-1 items-center px-8 text-sm font-manrope">
                {goal.goal}
              </div>
              <div className="flex justify-center items-center w-20">
                <div
                  className={cn({
                    "flex justify-center items-center w-6 h-5 text-xs text-white font-manrope font-bold rounded-sm shadow-rank-mark": true,
                    "bg-[#3B82F6]": goal.rank === "A",
                    "bg-custom-dark": goal.rank === "B",
                  })}
                >
                  {goal.rank}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default ItemGoalsPanel;
