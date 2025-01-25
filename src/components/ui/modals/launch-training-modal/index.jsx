import React, { Fragment, useEffect, useState } from "react";

import { modal } from "@/store/store";
import { useAtom } from "jotai";
import Dropdown from "../../dropdown";
import {
  annalesTypes,
  historyType,
  itemOptions,
  rangTypes,
  successTypes,
} from "@/constants/mockup-data/library";
import Segmented from "../../Segmented";
import NumberInput from "../../number-input";
import TogglerOne from "../../togglers/toggler-one";
import Tooltip from "../../tooltip";
import ButtonOne from "../../button-one";
import DropdownSingleSelect from "../../dropdown-single-select";

const LaunchTrainingModal = () => {
  const [openState, setOpenState] = useAtom(modal); // Get the current state of the modal
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    openState && setOpened(openState.launchTraining);
  }, [openState]);

  const closeModal = () => {
    setOpened(false);
    setOpenState({ ...openState, launchTraining: false });
  };

  const createHandler = () => {
    closeModal();
  };

  return (
    <Fragment>
      {opened ? (
        <div className="fixed inset-0 flex items-center justify-end py-[120px] px-[150px]">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <div className="flex flex-col bg-white rounded-3xl shadow-lg max-w-[540px] w-fill-available h-full z-10">
            <div className="flex px-7 py-5 justify-between items-center border-b">
              <h2 className="text-xl font-manrope font-bold">
                Launch training
              </h2>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 flex-1">
              <div className="mb-4">
                <label className="block text-[#2F3037] text-sm font-bold mb-2">
                  Matières
                </label>
                <Dropdown className="w-full" options={itemOptions} />
              </div>

              <div className="mb-4">
                <label className="block text-[#2F3037] text-sm font-bold mb-2">
                  Item
                </label>
                <Dropdown className="w-full" options={itemOptions} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="flex text-[#2F3037] text-sm font-bold mb-2 gap-1">
                    Annales
                    <Tooltip />
                  </label>
                  <Segmented options={annalesTypes} />
                </div>

                <div className="mb-4">
                  <label className="block text-[#2F3037] text-sm font-bold mb-2">
                    Rang
                  </label>
                  <Segmented options={rangTypes} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="flex text-[#2F3037] text-sm font-bold mb-2 gap-1">
                    Success
                    <Tooltip />
                  </label>
                  <Segmented options={successTypes} />
                </div>

                <div className="mb-4">
                  <label className="flex text-[#2F3037] text-sm font-bold mb-2 gap-1">
                    History
                    <Tooltip />
                  </label>
                  <Segmented options={historyType} />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#2F3037] text-sm font-bold mb-2">
                  Tags
                </label>
                <Dropdown className="w-full" options={itemOptions} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2F3037] text-sm font-bold mb-2">
                    Questions number
                  </label>
                  <NumberInput />
                </div>

                <div className="flex flex-col">
                  <label className="flex text-[#2F3037] text-sm font-bold mb-2 mr-4 gap-1">
                    Exam mode
                    <Tooltip />
                  </label>
                  <div className="flex h-fill-available">
                    <TogglerOne />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end px-7 py-4 rounded-b-3xl border-t">
              <ButtonOne
                click={createHandler}
                className="w-28 h-10 !p-0"
                text="Create"
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default LaunchTrainingModal;
