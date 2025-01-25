import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as cn from "classnames";
import { Collapse } from "react-collapse";
import DataTable from "react-data-table-component";

import AngleDown from "@/assets/icons/angle-down";
import ProgressBar from "../../progress-bar";
import VerticalDivider from "../../vertical-divider";
import ChatIcon from "@/assets/icons/chart-icon";
import ListIcon from "@/assets/icons/list-icon";
import EyeIcon from "@/assets/icons/eye";
import EditIcon from "@/assets/icons/edit";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  annalesItemColumns,
  annalesItemCustomStyles,
  annalesItemData,
  historyColumns,
  historyCustomStyles,
  historyData,
  itemOptions,
  questionTypes,
  sessionTypes,
} from "@/constants/mockup-data/library";
import Segmented from "@/components/ui/Segmented";
import Dropdown from "@/components/ui/dropdown";
import DropdownSingleSelect from "../../dropdown-single-select";

const ItemDetailCard = ({ data }) => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const itemViewHandler = () => {
    router.push(`/library/${data.parent}/${data.index}.${data.name}`);
  };

  return (
    <div className="shadow-card rounded-lg">
      <div className="flex items-center px-12 pt-3 pb-4  rounded-t-lg bg-white">
        <div className="flex flex-col gap-2 w-full">
          <h3 className="font-manrope font-bold">
            {data.index}. {data.name}
          </h3>
          <div className="max-w-[640px]">
            <ProgressBar
              percent={data.total > 0 ? (data.done / data.total) * 100 : 0}
            />
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <ChatIcon />
              <span className="font-manrope text-xs text-[#85868E]">
                {data.total > 0
                  ? ((data.done / data.total) * 100).toFixed(0)
                  : 0}
                % completed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ListIcon />
              <span className="font-manrope text-xs text-[#85868E]">
                {data.total} Questions
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <button className="group">
            <EditIcon className="w-7 h-7" />
          </button>
        </div>
      </div>
      <div className="bg-[#FCFCFD] border-t">
        <Collapse
          isOpened={expanded}
          initialStyle={{ height: 0, overflow: "hidden" }}
        >
          <div>
            <div className="flex justify-between items-center pl-4 pr-6 py-6 border-b border-[#EAECF0]">
              <button
                className="flex justify-center items-center rotate-180 w-8 h-8 rounded-full"
                onClick={() => setExpanded(false)}
              >
                <AngleDown />
              </button>
              <div className="flex items-center gap-4">
                <div>
                  <p className="pb-1/2 font-semibold text-[10px]">
                    Question type
                  </p>
                  <Segmented options={questionTypes} />
                </div>
                <div>
                  <p className="pb-1/2 font-semibold text-[10px]">Session</p>
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
            <DataTable
              columns={annalesItemColumns}
              data={annalesItemData}
              customStyles={annalesItemCustomStyles}
              pagination
              // paginationComponent={CustomAntdPagination}
              selectableRows
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
            />
          </div>
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

export default ItemDetailCard;
