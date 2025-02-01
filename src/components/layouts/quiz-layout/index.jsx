import React, { useEffect, useState } from "react";
import * as cn from "classnames";
import { useAtom } from "jotai";

import QuizSidebar from "./quiz-sidebar";
import { quizState } from "@/store/store";
import Card from "@/components/ui/card";
import { CalendarIcon } from "@heroicons/react/24/solid";
import DonutChartOne from "@/components/ui/chart/donut-chart-one";
import AngleDown from "@/assets/icons/angle-down";

const QuizLayout = ({ children }) => {
  const [quizStateValue, setQuizStateValue] = useAtom(quizState);

  const [isRight, setIsRight] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [terminated, setTerminated] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (quizStateValue) {
      setIsRight(quizStateValue.rightSidebar);
      setIsExpanded(quizStateValue.isExpanded);
      setTerminated(quizStateValue.terminated);
      setQuestions(quizStateValue.questions);
    }
  }, [quizStateValue]);

  return (
    <div
      className={cn({
        "flex w-screen bg-custom-dark": true,
        "flex-row-reverse": isRight,
        "flex-row": !isRight,
      })}
    >
      {/* <QuizSidebar /> */}
      <main
        className={cn({
          "flex flex-col flex-1 h-screen bg-gradient-gray-linear": true,
          "overflow-y-scroll scroll-custom py-20": terminated,
          "overflow-y-scroll scroll-custom": !terminated,
        })}
      >
        <div
          className={cn({
            "flex flex-col gap-4 flex-1 transition-all ": true,
            "mx-8 !rounded-xl": !isExpanded,
            "!rounded-none": isExpanded,
          })}
        >
          {terminated && (
            <div className="flex flex-col gap-4">
              <Card className="flex justify-between gap-2 pl-6 pr-8 py-4">
                <div className="flex flex-col">
                  <h3 className="text-base font-manrope font-bold">
                    Ton Résultat
                  </h3>
                  <ul className="flex gap-4">
                    <li className="flex items-center gap-2">
                      <CalendarIcon width={20} color="#94959B" />
                      <span className="font-manrope text-[#94959B] text-sm">
                        {new Date()
                          .toLocaleDateString("en-FR")
                          .replace(/\//g, "/")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        width="12"
                        height="16"
                        viewBox="0 0 45 59"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M42.7377 43.9322L32.1845 27.9145L41.9281 15.1351C43.2101 13.4018 43.9089 11.3061 43.9231 9.15014V4.26387C43.9208 3.77906 43.8225 3.29951 43.634 2.8529C43.4452 2.40628 43.1702 2.00147 42.8244 1.66171C42.4841 1.31849 42.0784 1.04694 41.6317 0.8632C41.1847 0.679459 40.7054 0.587256 40.2222 0.591969H5.03528C4.552 0.588123 4.07269 0.680471 3.62546 0.863634C3.17821 1.0468 2.77196 1.31707 2.43021 1.65882C2.08849 2.00054 1.81821 2.40689 1.63504 2.85414C1.45188 3.30136 1.35942 3.78059 1.36329 4.26387V9.09235C1.36951 11.2407 2.06923 13.3297 3.35828 15.0484L13.0731 28.2904L2.46198 43.9322C1.2457 45.7448 0.675369 47.9144 0.842861 50.0907L1.16087 55.0059C1.24307 55.9195 1.65407 56.7721 2.31745 57.4056C2.99042 58.0423 3.87764 58.4034 4.80392 58.4176H40.6848C41.5398 58.3401 42.3392 57.961 42.9401 57.3478C43.5611 56.7175 43.9399 55.888 44.0098 55.0059L44.3279 50.1485C44.5265 47.9555 43.965 45.7607 42.7377 43.9322ZM30.2762 50.2931H15.1547C14.388 50.2931 13.6526 49.9886 13.1104 49.4462C12.5681 48.9041 12.2635 48.1685 12.2635 47.4018C12.2635 46.635 12.5681 45.8995 13.1104 45.3574C13.6526 44.8152 14.388 44.5105 15.1547 44.5105H30.4208C31.1876 44.5105 31.9231 44.8152 32.4652 45.3574C33.0073 45.8995 33.3121 46.635 33.3121 47.4018C33.3121 48.1685 33.0073 48.9041 32.4652 49.4462C31.9231 49.9886 31.1876 50.2931 30.4208 50.2931H30.2762Z"
                          fill="#94959C"
                        />
                      </svg>
                      <span className="font-manrope text-[#94959B] text-sm">
                        {new Date()
                          .toLocaleDateString("en-FR")
                          .replace(/\//g, "/")}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.324 23.5381C11.324 16.8254 16.7687 11.418 23.4441 11.418H66.3308C73.0435 11.418 78.451 16.8627 78.451 23.5381V66.4248C78.451 73.1375 73.0062 78.545 66.3308 78.545H23.4441C20.2297 78.545 17.1469 77.268 14.8739 74.9951C12.6009 72.7221 11.324 69.6393 11.324 66.4248V23.5381ZM46.7521 34.726C46.7521 36.255 48.0201 37.5229 49.5491 37.5229H62.6015C63.3433 37.5229 64.0548 37.2282 64.5793 36.7037C65.1038 36.1792 65.3985 35.4678 65.3985 34.726C65.3985 33.9842 65.1038 33.2727 64.5793 32.7482C64.0548 32.2237 63.3433 31.929 62.6015 31.929H49.5491C48.8073 31.929 48.0959 32.2237 47.5713 32.7482C47.0468 33.2727 46.7521 33.9842 46.7521 34.726ZM49.5491 52.44C48.8073 52.44 48.0959 52.7347 47.5713 53.2592C47.0468 53.7838 46.7521 54.4952 46.7521 55.237C46.7521 55.9788 47.0468 56.6902 47.5713 57.2147C48.0959 57.7393 48.8073 58.0339 49.5491 58.0339H62.6015C63.3433 58.0339 64.0548 57.7393 64.5793 57.2147C65.1038 56.6902 65.3985 55.9788 65.3985 55.237C65.3985 54.4952 65.1038 53.7838 64.5793 53.2592C64.0548 52.7347 63.3433 52.44 62.6015 52.44H49.5491ZM40.3378 32.9732C40.6126 32.7171 40.833 32.4083 40.9858 32.0653C41.1387 31.7222 41.2209 31.3518 41.2275 30.9762C41.2342 30.6007 41.1651 30.2277 41.0244 29.8794C40.8837 29.5311 40.6743 29.2148 40.4088 28.9492C40.1432 28.6836 39.8268 28.4742 39.4785 28.3335C39.1303 28.1928 38.7572 28.1238 38.3817 28.1304C38.0061 28.137 37.6357 28.2192 37.2927 28.3721C36.9496 28.525 36.6408 28.7454 36.3847 29.0202L30.9027 34.5022L29.1499 32.7494C28.6197 32.2554 27.9184 31.9864 27.1938 31.9992C26.4692 32.012 25.7779 32.3055 25.2654 32.818C24.753 33.3304 24.4594 34.0218 24.4467 34.7464C24.4339 35.471 24.7028 36.1723 25.1969 36.7025L28.9262 40.4317C30.0449 41.5505 31.7977 41.5505 32.8792 40.4317L40.3378 32.9732ZM40.3378 49.5312C39.8133 49.0074 39.1024 48.7132 38.3612 48.7132C37.62 48.7132 36.9092 49.0074 36.3847 49.5312L30.9027 55.0132L29.1499 53.2605C28.6197 52.7664 27.9184 52.4974 27.1938 52.5102C26.4692 52.523 25.7779 52.8166 25.2654 53.329C24.753 53.8415 24.4594 54.5328 24.4467 55.2574C24.4339 55.982 24.7028 56.6833 25.1969 57.2135L28.9262 60.9428C30.0449 62.0616 31.7977 62.0616 32.8792 60.9428L40.3378 53.4842C41.4565 52.3654 41.4565 50.6127 40.3378 49.5312Z"
                          fill="#94959C"
                        />
                      </svg>
                      <span className="font-manrope text-[#94959B] text-sm">
                        {questions.length} Questions
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center">
                  <button className="text-white font-inter font-semibold h-9 !px-4 !py-0 bg-gradient-purple rounded-full hover:bg-gradient-dark transition-all shadow-md">
                    12,4/20
                  </button>
                </div>
              </Card>
              <Card className="flex px-6 py-8">
                <div className="basis-3/5">
                  <h4 className="font-manrope font-bold">
                    Correction détaillée
                  </h4>
                  <table className="mt-4 w-full max-w-80">
                    <thead className="bg-[#FAFAFA]">
                      <tr className="h-10 border-b border-[#EDEDFA]">
                        <td className="font-manrope text-sm text-[#2F3037] px-4">
                          Questions
                        </td>
                        <td className="font-manrope text-sm text-[#2F3037] px-4">
                          Score
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-row items-center h-10 border-b border-[#EDEDFA]">
                        <td className="px-4">
                          <button
                            onClick={() => {

                            }}
                            className="inline-flex items-center gap-2 border px-1.5 py-0.5 rounded-lg bg-[#F3F3F4] shadow-dark-gray"
                          >
                            <span className="font-manrope font-semibold text-[10px]">
                              DP 1
                            </span>
                          </button>
                        </td>
                        <td className="font-manrope font-bold text-xs px-4">
                          12/20
                        </td>
                      </tr>
                      <tr className="table-row items-center h-10 border-b border-[#EDEDFA]">
                        <td className="px-4">
                          <button
                            onClick={() => {

                            }}
                            className="inline-flex items-center gap-2 border px-1.5 py-0.5 rounded-lg bg-[#F3F3F4] shadow-dark-gray"
                          >
                            <span className="font-manrope font-semibold text-[10px]">
                              DP 2
                            </span>
                          </button>
                        </td>
                        <td className="font-manrope font-bold text-xs px-4">
                          7/20
                        </td>
                      </tr>
                      <tr className="table-row items-center h-10 border-b border-[#EDEDFA]">
                        <td className="px-4">
                          <div className="inline-flex items-center gap-2 border px-1.5 py-0.5 rounded-lg bg-[#F3F3F4] shadow-dark-gray">
                            <span className="font-manrope font-semibold text-[10px]">
                              Questions isolées
                            </span>
                          </div>
                        </td>
                        <td className="font-manrope font-bold text-xs px-4">
                          15/20
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="basis-2/5">
                  <h4 className="font-manrope font-bold">
                    Détail des réponses
                  </h4>
                  <div className="mt-4">
                    <DonutChartOne />
                  </div>
                </div>
              </Card>
              <Card className="flex justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 border px-2 py-1 rounded-lg bg-[#F3F3F4] shadow-dark-gray">
                    <span className="font-manrope font-semibold text-xs">
                      DP 1
                    </span>
                  </div>
                  <span className="font-manrope text-[10px]">3 questions</span>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-white font-inter font-semibold text-xs h-8 px-3 bg-gradient-dark rounded-full hover:bg-gradient-purple transition-all shadow-md">
                    12,4/20
                  </button>
                  <div className="flex items-center justify-center w-8 h-8 rounded-2xl">
                    <AngleDown />
                  </div>
                </div>
              </Card>
            </div>
          )}
          <Card
            className={cn({
              "flex-1 transition-all": true,
              "!rounded-xl my-20": !isExpanded,
              "!rounded-none": isExpanded,
              "!my-0": terminated,
            })}
          >
            {children}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QuizLayout;
