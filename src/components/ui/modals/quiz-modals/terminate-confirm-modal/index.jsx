import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

import { modal, quizState } from "@/store/store";

const TerminateConfirmModal = () => {
  const [quizStateValue, setQuizStateValue] = useAtom(quizState);
  const [openState, setOpenState] = useAtom(modal); // Get the current state of the modal

  const [opened, setOpened] = useState(false);
  const [terminated, setTerminated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (quizStateValue) {
      setTerminated(quizStateValue.terminated);
    }
  }, [quizStateValue]);

  useEffect(() => {
    openState && setOpened(openState.quizTerminateConfirmationModal);
  }, [openState]);

  const closeModal = () => {
    setOpened(false);
    setOpenState({ ...openState, quizTerminateConfirmationModal: false });
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
              <InformationCircleIcon width={24} color="#100C20" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-lg">Terminer le test</h4>
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
                Les réponses non enregistrées seront comptées comme fausses.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    closeModal();
                    setQuizStateValue({
                      ...quizStateValue,
                      terminated: true,
                    });
                  }}
                  className="group flex items-center px-2.5 py-1.5 gap-1 bg-[#F3F3F4] text-[#100C20] hover:bg-[#100C20] hover:text-white rounded-xl transition-all"
                >
                  <span className="font-bold text-sm">Terminer</span>
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

export default TerminateConfirmModal;
