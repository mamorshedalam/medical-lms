import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import CustomAntdPagination from "@/components/ui/custom-antd-pagination";
import Card from "@/components/ui/card";
import {
  itemOptions,
  historyColumns,
  historyCustomStyles,
  historyData,
  questionTypes,
  sessionTypes,
} from "@/constants/mockup-data/library";
import Segmented from "@/components/ui/Segmented";
import Dropdown from "@/components/ui/dropdown";
import DropdownSingleSelect from "@/components/ui/dropdown-single-select";

const MaterialHistoryPanel = ({ name }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  return (
    <div className="py-1.5">
      <Card  className="mt-5 pb-2">
        <div className="flex justify-between items-center px-7 py-6 border-b border-[#EAECF0]">
          <h2 className="font-manrope font-bold text-2xl">
            Cardiology History
          </h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="pb-1/2 font-semibold text-[10px]">Question type</p>
              <Segmented options={questionTypes} />
            </div>
            <div>
              <p className="pb-1/2 font-semibold text-[10px]">Session type</p>
              <Segmented options={sessionTypes} />
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
        <DataTable
          columns={historyColumns}
          data={historyData}
          customStyles={historyCustomStyles}
          pagination
          // paginationComponent={CustomAntdPagination}
          selectableRows
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />
      </Card>
      {/* </ConfigProvider> */}
    </div>
  );
};

export default MaterialHistoryPanel;
