import ExitIcon from "@/assets/icons/ExitIcon";
import { useExam } from "@/providers/examProvider";
import { useRouter } from "next/router";
import React from "react";
import Question from "./Question";
// import Question from "./Question";
// import ExitIcon from "../icons/ExitIcon";
// import { useNavigate } from "react-router-dom";
// import { useExam } from "../../providers/examProvider";

function Sidebar({ currentQuestion, setQuestion, questions, closeSideBar }) {
  const { submitAnswers } = useExam();
  const navigator = useRouter();

  return (
    <div className="flex flex-col h-full">
      <div className="text-center text-white p-8 pb-4 font-bold text-lg">
        QI
      </div>
      <div className="flex-1 overflow-auto">
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            num={index + 1}
            active={index === currentQuestion}
            onClick={() => {
              // if (index === 0 || questions[index - 1].result)
              setQuestion(index);
              // if (closeSideBar) closeSideBar();
            }}
          />
        ))}
      </div>
      <div className="text-center text-white p-8 flex">
        <div
          className="flex-1"
          onClick={() => {
            // submitAnswers([], questions);
          }}
        >
          TERMINER
        </div>
        <button onClick={() => navigator.back()}>
          <ExitIcon />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
