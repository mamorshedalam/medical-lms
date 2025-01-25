import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as cn from "classnames";
import { Collapse } from "react-collapse";
import DataTable from "react-data-table-component";

import AngleDown from "@/assets/icons/angle-down";
import ProgressBar from "../../progress-bar";
import ChatIcon from "@/assets/icons/chart-icon";
import ListIcon from "@/assets/icons/list-icon";
import ButtonOne from "../../button-one";

import {
  annalesColumns,
  annalesCustomStyles,
  annalesData,
  itemOptions,
  questionTypes,
} from "@/constants/mockup-data/library";
import Segmented from "../../Segmented";
import Dropdown from "../../dropdown";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import CustomAntdPagination from "../../custom-antd-pagination";
import DropdownSingleSelect from "../../dropdown-single-select";

const AnnaleCard = ({ data }) => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <div className="shadow-card rounded-lg">
      <div className="flex items-center gap-4 px-5 py-7 bg-white rounded-t-lg">
        <div className="flex flex-col justify-center flex-1 gap-2 pl-8">
          <h3 className="w-full font-manrope font-extrabold">{data.name}</h3>
          <ProgressBar percent={completed} className="w-2/3" />
          <div className="flex gap-4">
            <div className="flex gap-1 justify-center items-center">
              <ChatIcon />
              <span className="text-xs text-[#2F3037] font-manrope font-bold leading-none">
                {completed.toFixed(0)} %
              </span>
              <span className="text-xs text-[#C8C9CE] font-manrope">
                completed
              </span>
            </div>
            <div className="flex gap-1 justify-center items-center">
              <ListIcon />
              <span className="text-xs text-[#2F3037] font-manrope font-bold leading-none">
                {total}
              </span>
              <span className="text-xs text-[#C8C9CE] font-manrope">
                questions
              </span>
            </div>
          </div>
        </div>
        <ButtonOne
          text="Start"
          click={() => {
            router.push(`/library/${data.slug}`);
          }}
          className="h-[42px] !px-4 !py-3 leading-none"
        />
      </div>
      <div className="bg-[#FCFCFD] border-t">
        <Collapse
          isOpened={expanded}
          initialStyle={{ height: 0, overflow: "hidden" }}
        >
          <div className="flex justify-between items-center px-7 py-6 border-b border-[#EAECF0]">
            <div className="flex w-full justify-between items-center gap-4">
              <div>
                <p className="pb-1/2 font-semibold text-[10px]">
                  Question type
                </p>
                <Segmented options={questionTypes} />
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="pb-1/2 font-semibold text-[10px]">Matières</p>
                  <Dropdown options={itemOptions} />
                </div>
                <div>
                  <p className="pb-1/2 font-semibold text-[10px]">Items</p>
                  <Dropdown options={itemOptions} />
                </div>
                <div>
                  <p className="pb-1/2 font-semibold text-[10px] invisible opacity-0">
                    Button
                  </p>
                  <button
                    type="button"
                    disabled={!selectedRows || !selectedRows.length > 0}
                    className="group flex gap-1 px-3 h-9 text-sm font-medium text-center items-center disabled:text-[#B1B1B9] disabled:bg-[#E2E2E4] bg-primary text-white rounded-lg transition-all disabled:pointer-events-none shadow-gray"
                  >
                    <PlusCircleIcon width={18} height={18} />
                    <span className="whitespace-nowrap">Create session</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DataTable
            columns={annalesColumns}
            data={annalesData}
            customStyles={annalesCustomStyles}
            pagination
            // paginationComponent={CustomAntdPagination}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
          />
        </Collapse>
      </div>
      <div className="flex items-center h-14 px-4 bg-[#FAFAFA] rounded-b-lg">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <span
            className={cn({
              "transition-all duration-300": true,
              "rotate-180": expanded,
            })}
          >
            <AngleDown />
          </span>
          <span className="ml-4 font-inter font-medium text-sm text-[#85868E]">
            Détails
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnnaleCard;
