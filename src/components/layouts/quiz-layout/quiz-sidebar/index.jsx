import React, { useEffect, useState } from "react";
import {
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useAtom } from "jotai";
import * as cn from "classnames";

import { quizData } from "@/constants/mockup-data/library";
import SaveIcon from "@/assets/icons/save-icon";
import TogglerTwo from "@/components/ui/togglers/toggler-two";
import QuestionFailed from "@/assets/icons/question-state/failed";
import QuestionPassed from "@/assets/icons/question-state/passed";
import QuestionSuccessed from "@/assets/icons/question-state/successed";
import QuestionSelected from "@/assets/icons/question-state/selected";
import QuestionNotStarted from "@/assets/icons/question-state/not-started";
import { appStore, modal, quizState } from "@/store/store";
import DragButton from "@/components/ui/drag-button";

const groupQuestions = (questions) => {
  const grouped = {};
  questions.forEach((question) => {
    const qType = question.qType || "Isolated";
    const qIndex = question.qIndex || "questions";

    const symbol = `${qType} ${qIndex}`;

    if (!grouped[symbol]) {
      grouped[symbol] = [];
    }

    grouped[symbol].push(question);
  });

  return grouped;
};

const QuizSidebar = () => {
  const [quizStateValue, setQuizStateValue] = useAtom(quizState);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizName, setQuizName] = useState("");
  const [flags, setFlags] = useState([]);
  const [isRight, setIsRight] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [groupedQuestions, setGroupedQuestions] = useState([]);
  
  useEffect(() => {
    if (quizStateValue) {
      setIsRight(quizStateValue.rightSidebar);
      setIsExpanded(quizStateValue.isExpanded);
      setQuizName(quizStateValue.name);
      setGroupedQuestions(groupQuestions(quizStateValue.questions));
      setFlags(quizStateValue.flags);
      setCurrentIndex(quizStateValue.currentIndex);
    }
  }, [quizStateValue]);

  const stateIconSwitcher = (state) => {
    switch (state) {
      case "failed":
        return <QuestionFailed />;
      case "passed":
        return <QuestionPassed />;
      case "successed":
        return <QuestionSuccessed />;
      case "selected":
        return <QuestionSelected />;
      case "not-started":
        return <QuestionNotStarted />;
      default:
        return <></>;
    }
  };

  const getState = (data) => {
    if (data.answer.length === 0) {
      if (data.id === currentIndex + 1) {
        return "selected";
      }
      return "not-started";
    } else {
      if (data.score === 1) {
        return "successed";
      } else if (data.score >= 0.5) {
        return "passed";
      } else {
        return "failed";
      }
    }
  };

  const currentIndexHandler = (index) => {
    setCurrentIndex(index);
    setQuizStateValue({
      ...quizStateValue,
      currentIndex: index,
    });
  };

  const openQuizBackHomeConfirmationModal = () => {
    const currentModalState = appStore.get(modal);
    appStore.set(modal, {
      ...currentModalState,
      quizBackHomeConfirmationModal: true,
    });
  };

  const openQuizTerminateConfirmationModal = () => {
    const currentModalState = appStore.get(modal);
    appStore.set(modal, {
      ...currentModalState,
      quizTerminateConfirmationModal: true,
    });
  };

  return (
    <aside className="flex flex-col md:w-[340px] pt-6 h-screen transition-all">
      <div className="flex gap-2 px-6">
        <button
          onClick={openQuizBackHomeConfirmationModal}
          className="group flex justify-center items-center w-10 h-10 bg-[#42434B] hover:bg-white hover:text-primary border-2 border-[#4C4D53] rounded-full transition-all"
        >
          <HomeIcon width={16} height={16} color="#ffffff" className="group-hover:text-primary transition-all" />
        </button>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            setQuizStateValue({
              ...quizStateValue,
              isExpanded: !isExpanded,
            });
          }}
          className={cn({
            "group flex justify-center items-center w-10 h-10 bg-[#42434B] hover:bg-white hover:text-primary border-2 border-[#4C4D53] rounded-full transition-all": true,
            "bg-primary": isExpanded,
          })}
        >
          {isExpanded ? (
            <ArrowsPointingOutIcon width={16} height={16} color="#ffffff" className="group-hover:text-primary transition-all" />
          ) : (
            <ArrowsPointingInIcon width={16} height={16} color="#ffffff" className="group-hover:text-primary transition-all" />
          )}
        </button>
      </div>
      <div className="flex flex-col pt-4 pb-2 px-6 border-b border-[#292A32]">
        <h3 className="text-base font-manrope text-[#C0C0C3]">Create a test</h3>
        <h4 className="text-lg font-manrope font-bold text-white">
          {quizName}
        </h4>
      </div>
      <div className="flex flex-col gap-1 py-2 px-6 border-b border-[#292A32]">
        <h4 className="text-base font-manrope text-white">Progress</h4>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-full p-0.5 border border-opacity-20 border-white bg-gradient-progressbar-bg rounded-full">
            <div
              className="h-full rounded-full bg-gradient-progressbar-thumb-gray"
              style={{ width: `44.44%` }}
            />
          </div>
          <span className="font-inter text-white text-sm">
            0/{quizData.data.length}
          </span>
        </div>
      </div>
      <div className="flex py-2.5 px-6 gap-2.5 border-b border-[#292A32] shadow-lg">
        <div className="flex flex-1 justify-center items-center h-10 bg-[#42434B] hover:bg-white border border-[#3F4048] transition-all rounded-lg">
          <TogglerTwo
            isChecked={isRight}
            setIsChecked={(value) => {
              setIsRight(value);
              setQuizStateValue({ ...quizStateValue, rightSidebar: value });
            }}
          />
        </div>
        <div className="group flex flex-1 justify-center items-center h-10 bg-[#42434B] hover:bg-white border border-[#3F4048] transition-all rounded-lg">
          <SaveIcon className="group-hover:stroke-primary transition-all" />
        </div>
      </div>
      <div className="flex flex-1 flex-col px-6 py-4 gap-4 overflow-y-scroll scroll-custom">
        {Object.entries(groupedQuestions).map(([key, value]) => (
          <div key={`group-${key}`} className="flex flex-col gap-1.5">
            {key === "Isolated questions" ? (
              <h4 className="font-manrope text-base text-white">
                Questions isolées
              </h4>
            ) : (
              <h4 className="font-manrope text-base text-white">{key}</h4>
            )}
            {value.map((question, index) => (
              <button
                key={`question-${index}`}
                onClick={() => currentIndexHandler(question.id - 1)}
                className={cn({
                  "group flex items-center gap-3 pl-4 pr-6 h-10  hover:bg-white hover:text-custom-dark border rounded-lg font-manrope font-semibold text-sm transition-all": true,
                  "text-custom-dark bg-white": currentIndex + 1 === question.id,
                  "text-white bg-[#3E3F47] border-[#515258]":
                    currentIndex + 1 !== question.id,
                })}
              >
                <span className="relative w-4 h-4">
                  <span className="absolute top-0 left-0 flex group-hover:opacity-0 group-hover:invisible opacity-100 visible items-center w-4 h-4 transition-all">
                    {stateIconSwitcher(getState(question))}
                  </span>
                  <span className="absolute top-0 left-0 flex group-hover:opacity-100 group-hover:visible opacity-0 invisible items-center w-4 h-4 transition-all">
                    <QuestionSelected />
                  </span>
                </span>
                <span className="flex-1 text-left text-sm">
                  {question.name}
                </span>
                {flags.includes(question.id) && (
                  <span className="flex justify-center items-center w-5 h-5 border-2 bg-[#3E3F47] border-[#626369] rounded">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.0976 3.45732C14.8173 6.9753 7.92794 -1.8685 0.45225 1.7472C0.159085 1.89378 0.110224 2.18694 0.159085 2.43125C0.159085 2.52897 0.159085 2.57783 0.207946 2.67555C3.28617 11.3728 6.41326 20.0211 9.49148 28.7183C9.73579 29.4512 10.9573 29.1581 10.6641 28.3763C9.49148 25.1026 8.31883 21.7801 7.14617 18.5064C7.19503 18.5064 7.19503 18.4576 7.24389 18.4576C9.88237 16.3077 12.814 14.5976 15.5014 12.5454C18.4819 10.249 20.876 7.4639 22.9282 4.33682C23.2702 3.75049 22.635 3.21302 22.0976 3.45732Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center py-6 bg-[#2D2F37]">
        <DragButton handler={openQuizTerminateConfirmationModal} />
      </div>
    </aside>
  );
};

export default QuizSidebar;
