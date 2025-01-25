import React, { Fragment, useEffect, useState } from "react";

import { modal } from "@/store/store";
import { useAtom } from "jotai";
import Dropdown from "../../dropdown";
import {
  historyType,
  itemOptions,
  rangTypes,
  sessionTypes,
  successTypes,
} from "@/constants/mockup-data/library";
import Segmented from "../../Segmented";
import NumberInput from "../../number-input";
import TogglerOne from "../../togglers/toggler-one";
import Tooltip from "../../tooltip";
import ButtonOne from "../../button-one";
import VerticalDivider from "../../vertical-divider";
import HorizontalDivider from "../../horizontal-divider";
import DropdownSingleSelect from "../../dropdown-single-select";

const CustomTestModal = () => {
  const [openState, setOpenState] = useAtom(modal); // Get the current state of the modal
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    openState && setOpened(openState.customTest);
  }, [openState]);

  const closeModal = () => {
    setOpened(false);
    setOpenState({ ...openState, customTest: false });
  };

  const createHandler = () => {
    closeModal();
  };

  return (
    <Fragment>
      {opened ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <div className="bg-white rounded-lg shadow-lg max-w-[700px] w-fill-available z-10">
            <div className="flex px-7 py-5 justify-between items-center border-b">
              <h2 className="w-full text-center text-xl font-manrope font-extrabold text-black">
                Custom Test
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
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-[#2F3037] text-base font-bold mb-2">
                  Matières
                </label>
                <Dropdown className="w-full" options={itemOptions} />
              </div>

              <div className="mb-4">
                <label className="block text-[#2F3037] text-base font-bold mb-2">
                  Item
                </label>
                <Dropdown className="w-full" options={itemOptions} />
              </div>

              <HorizontalDivider className="w-full h-px bg-[#EDEDF0] bg-opacity-100" />

              <div className="flex gap-4">
                <div className="mb-4">
                  <label className="block text-[#2F3037] text-base font-bold mb-2">
                    Rang
                  </label>
                  <Segmented options={rangTypes} />
                </div>

                <div className="flex flex-1 justify-center">
                  <VerticalDivider className="h-14 w-px" />
                </div>

                <div className="mb-4">
                  <label className="flex text-[#2F3037] text-base font-bold mb-2 gap-1">
                    History
                    <Tooltip />
                  </label>
                  <Segmented options={historyType} />
                </div>

                <div className="flex flex-1 justify-center">
                  <VerticalDivider className="h-14 w-px" />
                </div>

                <div className="mb-4">
                  <label className="flex text-[#2F3037] text-base font-bold mb-2 gap-1">
                    Success
                    <Tooltip />
                  </label>
                  <Segmented options={successTypes} />
                </div>
              </div>

              <div>
                <label className="flex text-[#2F3037] text-base font-bold mb-2 gap-1">
                  Session type
                 </label>
                <Segmented options={sessionTypes} />
              </div>

              <HorizontalDivider className="w-full h-px bg-[#EDEDF0] bg-opacity-100" />

              <div className="mb-6">
                <label className="block text-[#2F3037] text-base font-bold mb-2">
                  Tags
                </label>
                <Dropdown className="w-full" options={itemOptions} />
              </div>

              <div className="flex justify-between">
                <div>
                  <label className="block text-[#2F3037] text-base font-bold mb-2">
                    Questions number
                  </label>
                  <NumberInput />
                </div>

                <div className="flex flex-col">
                  <label className="flex justify-end text-[#2F3037] text-base font-bold mb-2 gap-1">
                    Exam mode
                    <Tooltip />
                  </label>
                  <div className="flex justify-end h-fill-available">
                    <TogglerOne />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end px-16 pt-4 pb-6 rounded-b-lg border-t">
              <ButtonOne
                click={createHandler}
                className="w-full h-10 !p-0"
                text="Create a custom test"
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

export default CustomTestModal;
