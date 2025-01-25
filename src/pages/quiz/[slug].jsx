import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import * as cn from "classnames";

import { quizData } from "@/constants/mockup-data/library";
import { appStore, modal, quizState } from "@/store/store";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChartBarIcon,
  CheckIcon,
  FlagIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import VerticalDivider from "@/components/ui/vertical-divider";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
const QuizPage = () => {
  const [quizStateValue, setQuizStateValue] = useAtom(quizState);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [terminated, setTerminated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [fact, setFact] = useState([]);
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    quizStateValue &&
      setQuizStateValue({
        ...quizStateValue,
        name: quizData.name,
        questions: quizData.data,
      });
  }, []);

  useEffect(() => {
    if (quizStateValue.questions && quizStateValue.questions.length > 0) {
      setQuestions(quizStateValue.questions);
      setCurrentIndex(quizStateValue.currentIndex);
      setIsExpanded(quizStateValue.isExpanded);
      setTerminated(quizStateValue.terminated);
      setFlags(quizStateValue.flags);
      if (
        quizStateValue.currentIndex !== undefined &&
        quizStateValue.currentIndex !== null
      ) {
        setAnswers(
          quizStateValue.questions[quizStateValue.currentIndex].answer
        );
        setFact(quizStateValue.questions[quizStateValue.currentIndex].fact);
      }
    }
  }, [quizStateValue]);

  const toggleItem = (array, item) => {
    let tmp = [...array];
    const index = tmp.indexOf(item);
    if (index === -1) {
      tmp.push(item);
    } else {
      tmp.splice(index, 1);
    }

    return tmp;
  };

  const navigateQuestionIndex = (step) => {
    if (-1 < currentIndex + step && currentIndex + step < questions.length) {
      setCurrentIndex(currentIndex + step);
      setQuizStateValue({
        ...quizStateValue,
        currentIndex: currentIndex + step,
      });
    }
  };

  const flagHandler = (index) => {
    setFlags(toggleItem(flags, index));
    setQuizStateValue({
      ...quizStateValue,
      flags: toggleItem(flags, index),
    });
  };

  const showPlaylistModal = () => {
    const currentModalState = appStore.get(modal);
    appStore.set(modal, { ...currentModalState, playlistModal: true });
  };

  return (
    <div
      className={cn({
        "flex flex-col h-full": true,
        "h-[calc(100vh-10rem)]": !terminated,
      })}
    >
      {questions.length > 0 && questions[currentIndex] && (
        <>
          <div
            className={cn({
              "flex justify-between items-center h-20 pl-20 pr-12 bg-[#FAFAFA] border-[#FAFAFA]": true,
              "rounded-t-xl border-2": !isExpanded,
              "rounded-t-none border-b-2": isExpanded,
              "!bg-[#EAF5EA] !border-[#66AC5C] shadow-md":
                questions[currentIndex].answer.length > 0 &&
                questions[currentIndex].score === 1,
              "bg-[#FEE3C1] !border-[#FAAD4F] shadow-md":
                questions[currentIndex].answer.length > 0 &&
                questions[currentIndex].score < 1 &&
                questions[currentIndex].score >= 0.5,
              "bg-[#FCEDEB] !border-[#C43C35] shadow-md":
                questions[currentIndex].answer.length > 0 &&
                questions[currentIndex].score < 0.5,
            })}
          >
            <div className="flex items-center gap-2 border px-2 py-1 rounded-xl bg-[#F3F3F4] shadow-dark-gray">
              <span className="font-manrope text-base">
                {questions[currentIndex].qType} {questions[currentIndex].qIndex}{" "}
                - {questions[currentIndex].name}
              </span>
              <span
                className={cn({
                  "flex w-5 justify-center items-center font-manrope text-sm text-white rounded-md": true,
                  "bg-[#3B82F6]": questions[currentIndex].range === "A",
                  "bg-primary": questions[currentIndex].range === "B",
                })}
              >
                {questions[currentIndex].range}
              </span>
            </div>
            <div className="flex items-center">
              {showDetails && (
                <>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-0.5">
                      <img
                        src="/images/pneumologie.png"
                        width={14}
                        height={12}
                      />
                      <span className="font-manrope font-semibold text-[10px]">
                        Pneumologie
                      </span>
                    </div>
                    <div className="flex items-center gap-1 h-5 px-1 w-fit rounded-full bg-[#F3F3F4] border border-[#E2E2E4]">
                      <span className="item-index flex justify-center items-center h-4 w-4 text-[6px] font-manrope font-semibold border border-[#ECECED] rounded bg-white">
                        96
                      </span>
                      <span className="font-manrope font-bold text-[10px]">
                        Myasthénie
                      </span>
                    </div>
                  </div>
                  <VerticalDivider className="!h-12 mx-5 !bg-[#AAAAAA]" />
                  <div className="flex flex-col gap-1 font-manrope text-xs">
                    <div className="flex items-center gap-0.5">
                      <span className="text-[#585962]">Last try: </span>
                      <span className="font-bold">3 days ago</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[#585962]">Last score: </span>
                      <span className="font-bold">20/20</span>
                    </div>
                  </div>
                  <VerticalDivider className="!h-12 mx-5 !bg-[#AAAAAA]" />
                  <div className="flex flex-col gap-1 font-manrope text-xs">
                    <div className="flex items-center gap-0.5">
                      <ChartBarSquareIcon height={16} />
                      <span className="font-bold">64%</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[#585962]">Answered Correctly</span>
                    </div>
                  </div>
                </>
              )}
              {questions[currentIndex].answer.length > 0 && (
                <>
                  {showDetails && (
                    <VerticalDivider className="!h-12 mx-5 !bg-[#AAAAAA]" />
                  )}
                  <button
                    className={cn({
                      "h-[52px] rounded-[26px] w-24 font-manrope font-semibold text-white border-white border-2": true,
                      "bg-[#66AC5C] shadow-md":
                        questions[currentIndex].answer.length > 0 &&
                        questions[currentIndex].score === 1,
                      "bg-[#FAAD4F] shadow-md":
                        questions[currentIndex].answer.length > 0 &&
                        questions[currentIndex].score < 1 &&
                        questions[currentIndex].score >= 0.5,
                      "bg-[#C43C35] shadow-md":
                        questions[currentIndex].answer.length > 0 &&
                        questions[currentIndex].score < 0.5,
                    })}
                  >
                    {questions[currentIndex].score < 0.5
                      ? 0
                      : questions[currentIndex].score >= 0.5 &&
                        questions[currentIndex].score < 1
                      ? 10
                      : 20}
                    /20
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4 px-20 py-6 font-manrope text-base overflow-y-scroll scroll-custom">
            <p>{questions[currentIndex].description} :</p>
            <div className="flex flex-col gap-2">
              {questions[currentIndex].options &&
                questions[currentIndex].options.length > 0 &&
                questions[currentIndex].options.map((option, index) => (
                  <div
                    key={`option-${index}`}
                    onClick={() => {
                      setAnswers(toggleItem(answers, option.index));
                    }}
                    className={cn({
                      "flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer hover:bg-[#F3F2FE] hover:border-primary transition-all": true,
                      "!bg-[#F3F2FE] !border-primary":
                        questions[currentIndex].answer.length === 0 &&
                        answers.includes(option.index),
                      "bg-[#F8F8F8] border-[#F8F8F8]":
                        questions[currentIndex].answer.length === 0 &&
                        !answers.includes(option.index),
                      "bg-[#EAF5EA] border-[#66AC5C] pointer-events-none":
                        questions[currentIndex].answer.length > 0 &&
                        questions[currentIndex].fact.includes(option.index) &&
                        questions[currentIndex].answer.includes(option.index),
                      "bg-[#FCEDEB] border-[#C43C35] pointer-events-none":
                        questions[currentIndex].answer.length > 0 &&
                        questions[currentIndex].fact.includes(option.index) &&
                        !questions[currentIndex].answer.includes(option.index),
                      "pointer-events-none bg-[#FCEDEB] border-[#C43C35]":
                        questions[currentIndex].answer.length > 0 &&
                        !questions[currentIndex].fact.includes(option.index) &&
                        questions[currentIndex].answer.includes(option.index),
                      "bg-[#F8F8F8] border-[#F8F8F8] pointer-events-none":
                        questions[currentIndex].answer.length > 0 &&
                        !questions[currentIndex].fact.includes(option.index) &&
                        !questions[currentIndex].answer.includes(option.index),
                    })}
                  >
                    <span
                      className={cn({
                        "flex justify-center items-center w-4 h-4 border-2 text-white rounded-md": true,
                        "!bg-primary !border-primary": answers.includes(
                          option.index
                        ),
                        "bg-white border-[#8C8A94]": !answers.includes(
                          option.index
                        ),
                      })}
                    >
                      <CheckIcon height={12} />
                    </span>
                    <div className="flex flex-1 items-center gap-3">
                      <div className="flex justify-center items-center w-5 h-5 text-white bg-[#8c8A94] text-[10px] rounded-xl">
                        {option.index}
                      </div>
                      <span className="flex-1 font-manrope leading-5 text-sm">
                        {option.option}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            {questions[currentIndex].answer.length > 0 && (
              <div className="flex flex-col gap-2 font-manrope">
                <h4 className="text-sm">Commentaire</h4>
                <p className="px-6 py-4 text-sm bg-[#F8F9FC] leading-normal rounded-lg">
                  L’asthme est contrôlé si : les symptômes d’asthme sont
                  contrôlés &#40;évaluation par l’interrogatoire sur les 4
                  dernières semaines par le questionnaire ACT &#40;asthma
                  control test&#41;, les exacerbations sont rares : &lt; 2 cures
                  de corticothérapie systémique l’année précédente et il n’y a
                  pas d’obstruction bronchique: VEMS/CVF &gt; 0.7 et VEMS ≥ 80%
                </p>
              </div>
            )}
          </div>
          <div
            className={cn({
              "flex justify-between items-center h-20 pl-12 pr-10 bg-[#FAFAFA]": true,
              "rounded-b-xl": !isExpanded,
              "rounded-b-none": isExpanded,
            })}
          >
            <div className="flex gap-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className={cn({
                  "flex justify-center items-center w-10 h-9  bg-white rounded-md border shadow-dark-gray hover:bg-[#F8F8F8] hover:text-primary transition-all": true,
                  "text-primary": showDetails,
                })}
              >
                <ChartBarIcon height={16} />
              </button>
              <button
                onClick={showPlaylistModal}
                className="flex justify-center items-center w-10 h-9  bg-white rounded-md border shadow-dark-gray hover:bg-[#F8F8F8] hover:text-primary transition-all"
              >
                <HeartIcon height={16} />
              </button>
              <button className="flex justify-center items-center w-10 h-9  bg-white rounded-md border shadow-dark-gray hover:bg-[#F8F8F8] hover:text-primary transition-all">
                <QuestionMarkCircleIcon height={16} />
              </button>
              <button
                onClick={() => flagHandler(currentIndex + 1)}
                className={cn({
                  "flex justify-center items-center w-10 h-9  bg-white rounded-md border shadow-dark-gray hover:bg-[#F8F8F8] hover:text-primary transition-all": true,
                  "text-primary": flags.includes(currentIndex + 1),
                })}
              >
                <FlagIcon height={16} />
              </button>
              <button className="flex justify-center items-center w-10 h-9  bg-white rounded-md border shadow-dark-gray hover:bg-[#F8F8F8] hover:text-primary transition-all">
                <ShareIcon height={16} />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                className="flex justify-center items-center w-14 h-12  bg-white rounded-md border shadow-dark-gray hover:bg-[#F8F8F8] hover:text-primary transition-all"
                onClick={() => navigateQuestionIndex(-1)}
              >
                <ArrowLeftIcon height={16} />
              </button>
              <button
                className="flex justify-center items-center w-14 h-12  bg-white rounded-md border shadow-dark-gray hover:bg-[#F8F8F8] hover:text-primary transition-all"
                onClick={() => navigateQuestionIndex(1)}
              >
                <ArrowRightIcon height={16} />
              </button>
              {questions[currentIndex].answer &&
              questions[currentIndex].answer.length > 0 ? (
                <button className="flex justify-center items-center w-32 h-12  bg-primary rounded-md border border-primary text-white font-semibold font-inter shadow-dark-purple hover:bg-opacity-80 transition-all">
                  Suivant
                </button>
              ) : (
                <button className="flex justify-center items-center w-32 h-12  bg-primary rounded-md border border-primary text-white font-semibold font-inter shadow-dark-purple hover:bg-opacity-80 transition-all">
                  Valider
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
