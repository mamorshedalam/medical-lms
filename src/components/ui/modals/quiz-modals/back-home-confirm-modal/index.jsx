import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { modal } from "@/store/store";

const BackHomeConfirmModal = () => {
  const [openState, setOpenState] = useAtom(modal); // Get the current state of the modal
  const [opened, setOpened] = useState(false);

  const router = useRouter();

  useEffect(() => {
    openState && setOpened(openState.quizBackHomeConfirmationModal);
  }, [openState]);

  const closeModal = () => {
    setOpened(false);
    setOpenState({ ...openState, quizBackHomeConfirmationModal: false });
  };

  return (
    <Fragment>
      {opened ? (
        <div className="fixed inset-0 flex items-center justify-center py-[120px] px-[150px]">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <div className="flex gap-4 py-8 px-6 bg-white rounded-2xl shadow-lg w-[400px] h-[240px] z-10">
            <div className="py-1">
              <InformationCircleIcon width={24} color="#F03D3D" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-lg">Exit without saving</h4>
                <button
                  onClick={closeModal}
                  className="hover:rotate-180 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
              <p className="flex-1 py-2 font-semibold text-base leading-normal">
                You are exiting without saving your progress, it will be lost.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    closeModal();
                    router.push("/");
                  }}
                  className="group flex items-center px-2.5 py-1.5 gap-1 bg-[#FEF2F2] text-[#DE2423] hover:bg-[#DE2423] hover:text-white rounded-xl transition-all"
                >
                  <span className="font-bold text-sm">Confirm Exit</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 94 94"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M58.1929 28.7135L20.0291 66.8773L26.8672 73.7154L65.0315 35.5511V66.4285H74.702V19.043H27.3164V28.7135H58.1929Z"
                      fill="#F03D3D"
                      className="group-hover:fill-white transition-all"
                    />
                  </svg>
                </button>
                <button
                  onClick={closeModal}
                  className="flex items-center px-2.5 py-1.5 gap-1 bg-white text-[#100C20] border-[#ECECED] hover:bg-[#100C20] hover:text-white hover:border-[#100C20] font-bold text-sm border-2 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default BackHomeConfirmModal;
