import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import CustomAntdPagination from "@/components/ui/custom-antd-pagination";
import Card from "@/components/ui/card";
import {
  itemOptions,
  annalesColumns,
  annalesCustomStyles,
  questionTypes,
  annalesData,
} from "@/constants/mockup-data/library";
import Segmented from "@/components/ui/Segmented";
import Dropdown from "@/components/ui/dropdown";

import { appStore, modal } from "@/store/store";
import DropdownSingleSelect from "@/components/ui/dropdown-single-select";

const AllAnnalsPanel = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const openModal = () => {
    const currentModalState = appStore.get(modal);
    appStore.set(modal, { ...currentModalState, createSessionAnnale: true });
  };

  return (
    <div className="py-1.5">
      <Card  className="mt-5 pb-2">
        <div className="flex justify-between items-center px-7 py-6 border-b border-[#EAECF0]">
          <h2 className="font-manrope font-bold text-2xl">
            Toutes les annales
          </h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="pb-1/2 font-semibold text-[10px]">Question type</p>
              <Segmented options={questionTypes} />
            </div>
            <div>
              <p className="pb-1/2 font-semibold text-[10px]">Session</p>
              <Dropdown options={itemOptions} />
            </div>
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
        {annalesData && (
          <DataTable
            columns={annalesColumns}
            data={annalesData}
            className="rounded-b-lg"
            customStyles={annalesCustomStyles}
            pagination
            // paginationComponent={CustomAntdPagination}
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
          />
        )}
      </Card>
    </div>
  );
};

export default AllAnnalsPanel;
