import React, { Fragment, useEffect, useState } from "react";

import { modal } from "@/store/store";
import { useAtom } from "jotai";
import { sessionAnnaleItems } from "@/constants/mockup-data/library";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import AnnaleSessionCard from "../../cards/annale-session-card";

const CreateSessionAnnaleModal = () => {
  const [openState, setOpenState] = useAtom(modal); // Get the current state of the modal
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    openState && setOpened(openState.createSessionAnnale);
  }, [openState]);

  const closeModal = () => {
    setOpened(false);
    setOpenState({ ...openState, createSessionAnnale: false });
  };

  return (
    <Fragment>
      {opened ? (
        <div className="fixed inset-0 flex items-center justify-end py-[120px] px-[150px]">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <div className="bg-white rounded-3xl shadow-lg max-w-[540px] max-h-[80vh] w-fill-available z-10">
            <div className="flex px-7 py-5 justify-between items-center border-b">
              <h2 className="text-xl font-manrope font-bold">
                Create a Session Annales
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
            <div
              className="flex flex-col p-6 gap-2 overflow-y-scroll scroll-custom"
              style={{ maxHeight: "calc(80vh - 138px)" }}
            >
              {sessionAnnaleItems.map((item, index) => (
                <AnnaleSessionCard
                  key={`annale-session-${index}`}
                  data={item}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 justify-end px-7 py-4 rounded-b-3xl border-t">
              <div className="font-manrope text-xs font-bold">1 DP, 3 QIs</div>
              <button
                type="button"
                onClick={closeModal}
                className="group flex gap-1 px-3 h-9 text-sm font-medium text-center items-center text-[#B1B1B9] hover:text-white bg-[#E2E2E4] rounded-lg hover:bg-primary focus:outline-none transition-all shadow-gray"
              >
                <PlusCircleIcon width={18} height={18} />
                <span className="whitespace-nowrap">Create session</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default CreateSessionAnnaleModal;
