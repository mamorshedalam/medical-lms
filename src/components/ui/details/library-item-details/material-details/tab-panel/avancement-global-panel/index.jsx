import React from "react";
import DataTable from "react-data-table-component";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import PlusInCircle from "@/assets/svgs/plus-in-circle";
import AngleRight from "@/assets/icons/angle-right";
import YellowThunder from "@/assets/svgs/yellow-thunder";
import LibrarySearch from "@/assets/svgs/library-search";
import { columns, customStyles } from "@/constants/mockup-data/library";
import CustomAntdPagination from "@/components/ui/custom-antd-pagination";
import Card from "@/components/ui/card";
import { appStore, modal } from "@/store/store";

const MaterialAvancementGlobalPanel = ({ data }) => {
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
                <PlusInCircle />
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
        <div className="flex justify-between items-center px-7 py-6 border-b border-[#EAECF0]">
          <h2 className="font-manrope font-bold text-2xl">
            Liste des items en cardiologie
          </h2>
          <div className="flex items-center max-w-60 h-9 px-1.5 gap-1 border border-[#E5E7EB] rounded-lg shadow-inside">
            <MagnifyingGlassIcon width={16} height={16} />
            <input
              type="text"
              placeholder="Search for items"
              className="bg-transparent"
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data.data}
          customStyles={customStyles}
          pagination
          // paginationComponent={CustomAntdPagination}
        />
      </Card>
    </>
  );
};

export default MaterialAvancementGlobalPanel;
