import { useEffect, useState } from "react";
import { HttpStatusCode } from "axios";
import { Chart, Doughnut } from "react-chartjs-2";
import { useRouter } from "next/router";
import { useExam } from "@/providers/examProvider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import { useData } from "@/providers/learningDataProvider";
import { useAuth } from "@/providers/authProvider";
import CustomImage from "@/components/ui/exam/CustomImage";
import Spinner from "@/components/ui/spinner";
import ExamResultSidebar from "@/components/ui/exam/ExamResultSidebar";
import QuestionResultCard from "@/components/ui/exam/QuestionResultCard";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ExamResultPage() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    ChartJS.register(ArcElement, Tooltip, Legend);

    const navigator = useRouter();
    const [visibleDp, setVisibleDp] = useState(-1);
    const { result } = useExam();
    const [mutableResult, setMutableResult] = useState(result);
    const { user } = useAuth();
    const [actualResult, setActualResult] = useState(result);
    const { matieres } = useData();
    const [dpOrQuestion, setDpOrQuestion] = useState(result.dps.length ? "dp" : "question");
    const [currentDp, setCurrentDp] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answerGradeFilter, setAnswerGradeFilter] = useState(-1);

    const [isLoading, setIsLoading] = useState(false);

    const { setResult, selectedDps, setDps, selectedQuestions, setQuestions } =
        useExam();
    let sent = false;
    const authHttpClient = useAuthHttpClient();

    useEffect(() => {
        if (sent || result.isPastExam) return;

        const sendHistory = async () => {
            const response = await authHttpClient.post(`/history`, {
                user_id: user._id,
                history_data: result,
            });
        };

        sendHistory();

        sent = true;
    }, []);

    const next = () => {
        if (dpOrQuestion === "dp") {
            if (currentQuestion < result.dps[currentDp].questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else if (currentDp < result.dps.length - 1) {
                setCurrentDp(currentDp + 1);
                setCurrentQuestion(0);
            } else {
                setDpOrQuestion("question");
                setCurrentQuestion(0);
            }
        } else if (currentQuestion < result.questions.length - 1)
            setCurrentQuestion(currentQuestion + 1);
    };

    const computeGlobalGrade = () => {
        const gradeFromDps =
            result.dps.reduce((acc, cur) => {
                if (cur.dp_total_score == 0) return 0;
                return acc + (cur.dp_user_score / cur.dp_total_score) * 20;
            }, 0) / result.dps.length || 0;
        const gradeFromQuestions =
            result.questions.reduce(
                (acc, cur) => acc + (cur.user_score / cur.total_score) * 20,
                0
            ) / result.questions.length || 0;

        const dp_to_question_ratio =
            result.dps.length / (result.questions.length + result.dps.length);

        return (
            parseInt(
                gradeFromDps * dp_to_question_ratio +
                gradeFromQuestions * (1 - dp_to_question_ratio)
            ).toString() + "/ 20"
        );
    };
    const computeDpGrade = (dp_index) => {
        if (result.dps[dp_index].dp_total_score == 0) return "0/20";
        return (
            (
                (result.dps[dp_index].dp_user_score /
                    result.dps[dp_index].dp_total_score) *
                20
            ).toString() + "/20"
        );
    };

    useEffect(() => {
        // green, yellow, red
        let color_coding = [0, 0, 0];
        for (let dp of result.dps) {
            for (let question of dp.questions) {
                if (question.user_score > 15) {
                    color_coding[0]++;
                } else if (question.user_score > 3) {
                    color_coding[1]++;
                } else {
                    color_coding[2]++;
                }
            }
        }
        for (let question of result.questions) {
            if (question.user_score > 15) {
                color_coding[0]++;
            } else if (question.user_score > 3) {
                color_coding[1]++;
            } else {
                color_coding[2]++;
            }
        }

        setChartData({
            labels: ["20/20", "10/20 or 4/20", "0/20"],
            datasets: [
                {
                    label: "Number of questions",
                    data: color_coding,
                    backgroundColor: ["#3D916D", "#FE9C28", "#B9146F"],
                    hoverOffset: 4,
                },
            ],
        });

        // Add user answers to the questions without user answers
        let aux_result = [...result.dps];
        for (let i in aux_result) {
            for (let j in aux_result[i].questions) {
                if (aux_result[i].questions[j].userAnswer == null) {
                    aux_result[i].questions[j].userAnswer = aux_result[i].questions[
                        j
                    ].answers.map((x) => false);
                }
            }
        }
        // Add the isCollapsed property
        setActualResult({
            dps: aux_result.map((x) => {
                let aux = x;
                aux.isCollapsed = false;
                return aux;
            }),
            questions: result.questions,
        });
    }, []);
    useEffect(() => {
        if (result.dps.length < 1 && result.questions.length < 1) {
            navigator.back();
        }
        result.dps.length < 1 && setDpOrQuestion("question");
    }, [result, navigator]);

    if (result.dps.length < 1 && result.questions.length < 1) return null;

    const renderQuestion = (question) => {
        return (
            (question.user_score == 20 && answerGradeFilter == 0) ||
            (question.user_score == 10 && answerGradeFilter == 1) ||
            (question.user_score == 4 && answerGradeFilter == 1) ||
            (question.user_score == 0 && answerGradeFilter == 2) ||
            answerGradeFilter < 0
        );
    };

    const renderDp = (dp) => {
        return (
            dp.questions.reduce((sum, nxt) => (sum += renderQuestion(nxt)), 0) > 0
        );
    };

    const computeAverageOfQIs = () =>
        parseInt(
            (actualResult.questions.reduce(
                (sum, qi) => sum + qi.user_score / qi.total_score,
                0
            ) *
                20) /
            result.questions.length
        );

    const toggleFavorite = async () => {
        const result_item = mutableResult;
        console.log(result_item._id);
        const response = await authHttpClient.put(`/history/` + result_item._id, {
            favorite: !result_item.favorite,
        });
        if (response.status == HttpStatusCode.Ok) {
            let aux = { ...result_item };
            aux.favorite = !result_item.favorite;
            setMutableResult(aux);
        }
    };
    const isImage = (fileName) => {
        return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
    };

    const retakeExam = async () => {
        const history_item = mutableResult.history_item;
        const tempDps = [];
        const tempQuestions = [];
        setIsLoading(true);
        for (let i = 0; i < history_item.history_data.dps.length; i++) {
            const response = await authHttpClient.get(
                `/dp/withDetails/${history_item.history_data.dps[i]._id}`
            );
            tempDps.push(response.data.data);
        }
        for (let i = 0; i < history_item.history_data.questions.length; i++) {
            const response = await authHttpClient.get(
                `/question/${history_item.history_data.questions[i]._id}`
            );
            tempQuestions.push(response.data.data);
        }

        setIsLoading(false);
        setDps(tempDps);
        setQuestions(tempQuestions);
        navigator.push("/exam");
    };
    if (isLoading)
        return (
            <div
                role="status"
                className="h-[100vh] pb-20 flex justify-center items-center"
            >
                <Spinner size="sm" />
            </div>
        );
    return (
        <>
            <div>
                <div className="hidden bg-[#53389E] lg:absolute lg:right-0 lg:inset-y-0 lg:z-2 lg:flex lg:w-72 lg:flex-col">
                    <ExamResultSidebar
                        result={result}
                        dpOrQuestion={dpOrQuestion}
                        setDpOrQuestion={setDpOrQuestion}
                        currentDp={currentDp}
                        setCurrentDp={setCurrentDp}
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                    />
                </div>

                <div className="lg:pr-72 h-screen overflow-auto">
                    <div className="bg-white pt-6 px-4 md:px-16 flex justify-center items-center">
                        <div className="bg-[#FBFBFC] lg:w-5/6 sm:w-full flex m-auto border-[#D0D5DD] border rounded-[12px] h-14">
                            <div
                                className={
                                    "ml-12 px-1 min-w-fit relative rounded-full border-2 bg-grayBlue-50 border-grayBlue-200 h-7 text-grayBlue-700 max-w-fit flex items-center hover:cursor-pointer my-auto"
                                }
                            >
                                <span className="text-xs font-bold text-[#363F72] p-2">
                                    GLOBAL MARK
                                </span>
                            </div>

                            <div className="px-10 my-auto text-lg font-bold">
                                {computeGlobalGrade()}
                            </div>
                            {mutableResult.isPastExam && (
                                <>
                                    <button
                                        onClick={toggleFavorite}
                                        className="ml-auto my-auto bg-[#f9f5ff] hover:bg-[#e7e4ed] rounded-[8px] border border-[#E9D7FE] w-[35px] h-[35px] flex justify-center items-center"
                                    >
                                        <svg
                                            width="20"
                                            height="18"
                                            viewBox="0 0 20 18"
                                            fill={mutableResult.favorite ? "#6941C6" : "none"}
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M9.99425 3.27985C8.32813 1.332 5.54975 0.808035 3.46221 2.59168C1.37466 4.37532 1.08077 7.35748 2.72012 9.467C4.08314 11.2209 8.2081 14.9201 9.56004 16.1174C9.7113 16.2513 9.78692 16.3183 9.87514 16.3446C9.95213 16.3676 10.0364 16.3676 10.1134 16.3446C10.2016 16.3183 10.2772 16.2513 10.4285 16.1174C11.7804 14.9201 15.9054 11.2209 17.2684 9.467C18.9077 7.35748 18.6497 4.35656 16.5263 2.59168C14.4029 0.826798 11.6604 1.332 9.99425 3.27985Z"
                                                stroke="#6941C6"
                                                stroke-width="1.66667"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={retakeExam}
                                        className="ml-[15px] my-auto mr-[35px] bg-[#f9f5ff] hover:bg-[#e7e4ed] rounded-[8px] border border-[#E9D7FE] w-[35px] h-[35px] flex justify-center items-center"
                                    >
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 22 22"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M1.83337 9.16667C1.83337 9.16667 1.94458 8.38819 5.16641 5.16637C8.38824 1.94454 13.6118 1.94454 16.8337 5.16637C17.9752 6.30787 18.7122 7.70066 19.0449 9.16667M1.83337 9.16667V3.66667M1.83337 9.16667H7.33337M20.1667 12.8333C20.1667 12.8333 20.0555 13.6118 16.8337 16.8336C13.6118 20.0555 8.38824 20.0555 5.16641 16.8336C4.02491 15.6921 3.28784 14.2993 2.95522 12.8333M20.1667 12.8333V18.3333M20.1667 12.8333H14.6667"
                                                stroke="#6941C6"
                                                stroke-width="1.83333"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="bg-white pt-6 px-4 md:px-16 flex justify-center items-center">
                        <div className="lg:w-5/6 sm:w-full flex m-auto gap-3 flex-wrap">
                            <div className="bg-[#FBFBFC] border rounded-[12px] flex-[3] h-fill min-w-[305px]">
                                <div className="ml-12 px-1 mt-6 mb-4">
                                    <p className="font-medium">Bravo pour ta session ! ⚡️</p>
                                    <p className="font-medium">
                                        Découvre la correction détaillée :
                                    </p>
                                </div>
                                <div className="gap-3 mb-16">
                                    {result.dps.map((dp, index) => (
                                        <div className="flex my-1">
                                            <div
                                                className={classNames(
                                                    "ml-12 px-1 min-w-fit relative rounded-full border-2 bg-grayBlue-50 border-grayBlue-200 h-7 text-grayBlue-700 max-w-fit flex items-center hover:cursor-pointer my-auto",
                                                    visibleDp == index && "bg-primary-400"
                                                )}
                                                onClick={() => {
                                                    if (visibleDp == index) {
                                                        setVisibleDp(-1);
                                                        return;
                                                    }
                                                    setVisibleDp(index);
                                                }}
                                            >
                                                <span
                                                    className={"text-xs font-bold text-[#363F72] p-2"}
                                                >
                                                    DP {index + 1}
                                                </span>
                                            </div>

                                            <div className="px-10 text-lg font-bold">
                                                {computeDpGrade(index)}
                                            </div>
                                        </div>
                                    ))}

                                    {actualResult.questions.length > 0 && (
                                        <div className="flex my-2">
                                            <div className="min-w-[150px] ">
                                                <div
                                                    className={classNames(
                                                        "ml-12 px-1 min-w-fit relative rounded-full border-2 bg-grayBlue-50 border-grayBlue-200 h-7 text-grayBlue-700 max-w-fit flex items-center my-auto"
                                                    )}
                                                >
                                                    <span
                                                        className={"text-xs font-bold text-[#363F72] p-2"}
                                                    >
                                                        Average of QIs
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="px-10 text-lg font-bold">
                                                {computeAverageOfQIs()}/20
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-[#FBFBFC] relative flex border rounded-[12px]  flex-[2] h-fill pt-[25px] pb-[15px] px-[15px]">
                                {/* reset button */}
                                {answerGradeFilter >= 0 && (
                                    <div
                                        onClick={() => setAnswerGradeFilter(-1)}
                                        className="absolute w-[100px] h-[25px] m-auto left-[15px] right-[0] bottom-[0] top-[7px] text-center"
                                    >
                                        <span>reset</span>
                                    </div>
                                )}
                                {/* Title */}
                                <h2 className="2xl:translate-x-[60px] lg:translate-x-[0px] min-w-[55px] xl:translate-x-[35px] mt-1">
                                    Détail :
                                </h2>
                                <Doughnut
                                    data={chartData}
                                    options={{
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                        },
                                        onClick: function (ev, elements) {
                                            if (elements.length <= 0) return;
                                            setAnswerGradeFilter(elements[0].index);
                                        },
                                    }}
                                    className="!w-[180px] !h-[180px] m-auto"
                                />
                                {/* Legend */}
                                <div className="flex flex-col items-start mt-5 2xl:translate-x-[-50px] lg:translate-x-[0px] md:translate-x-[0px] translate-x-[-25px]">
                                    <div className="flex">
                                        <div className="bg-[#3D916D] w-[5px] h-[5px] m-auto aspect-square rounded-full"></div>
                                        <span className="text-[#475467] text-[10px] ml-2">
                                            20/20
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <div className="bg-[#FE9C28] w-[5px] h-[5px] m-auto aspect-square rounded-full"></div>
                                        <span className="text-[#475467] text-[10px] ml-2">
                                            10/20
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <div className="bg-[#FE9C28] w-[5px] h-[5px] m-auto aspect-square rounded-full"></div>
                                        <span className="text-[#475467] text-[10px] ml-2">
                                            4/20
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <div className="bg-[#B9146F] w-[5px] h-[5px] m-auto aspect-square rounded-full"></div>
                                        <span className="text-[#475467] text-[10px] ml-2">
                                            0/20
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {actualResult.dps.map((dp, indexdp) => {
                        if (!renderDp(dp)) return;
                        if (visibleDp >= 0 && visibleDp != indexdp) return;
                        return (
                            <>
                                <div className="bg-white pt-6 px-4 md:px-16 flex justify-center items-center">
                                    <div
                                        className="bg-[#FBFBFC] lg:w-5/6 sm:w-full flex m-auto border-[#D0D5DD] border rounded-[12px] h-14"
                                        onClick={() => {
                                            let aux_dps = actualResult.dps;
                                            aux_dps[indexdp].isCollapsed =
                                                !aux_dps[indexdp].isCollapsed;
                                            setActualResult({
                                                dps: aux_dps,
                                                questions: actualResult.questions,
                                            });
                                        }}
                                    >
                                        <div
                                            className={
                                                "ml-12 px-1 min-w-fit relative rounded-full border-2 bg-grayBlue-50 border-grayBlue-200 h-7 text-grayBlue-700 max-w-fit flex items-center hover:cursor-pointer my-auto"
                                            }
                                        >
                                            <span className="text-xs font-bold text-[#363F72] p-2">
                                                DP {indexdp + 1}
                                            </span>
                                        </div>

                                        <div className="px-10 my-auto text-lg font-bold">
                                            {computeDpGrade(indexdp)}
                                        </div>

                                        <span className="px-10 my-auto ml-auto max-w">
                                            {actualResult.dps[indexdp].matieres
                                                .map((_id) => matieres.find((m) => _id == m._id).name)
                                                .join(",")}
                                        </span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className={classNames(
                                                "w-6 h-6 my-auto mr-3",
                                                dp.isCollapsed && "rotate-180"
                                            )}
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {dpOrQuestion === "dp" &&
                                    !dp.isCollapsed &&
                                    dp.imageUrl &&
                                    (isImage(dp.imageUrl) ? (
                                        <CustomImage
                                            src={process.env.REACT_APP_SERVER_URL + "/" + dp.imageUrl}
                                            alt={"Visual clarification regarding the dp"}
                                            className="w-[350px] m-auto mb-10"
                                        />
                                    ) : (
                                        <video
                                            className="w-[350px] m-auto mb-10"
                                            controls
                                            src={process.env.REACT_APP_SERVER_URL + "/" + dp.imageUrl}
                                        />
                                    ))}
                                {!dp.isCollapsed &&
                                    (dpOrQuestion === "dp"
                                        ? actualResult.dps[indexdp].questions
                                        : actualResult.questions
                                    ).map(
                                        (el, index) =>
                                            renderQuestion(el) && (
                                                <QuestionResultCard
                                                    id={
                                                        "scrollspy-" + indexdp.toString() + index.toString()
                                                    }
                                                    dpOrQuestion={dpOrQuestion}
                                                    desc={
                                                        dpOrQuestion === "dp"
                                                            ? actualResult.dps[indexdp]?.desc
                                                            : ""
                                                    }
                                                    dp={dp}
                                                    question={
                                                        dpOrQuestion === "dp"
                                                            ? actualResult.dps[indexdp].questions[index]
                                                            : actualResult.questions[index]
                                                    }
                                                    currentDp={indexdp}
                                                    currentQuestion={index}
                                                    next={next}
                                                    isFromDp={true}
                                                />
                                            )
                                    )}
                            </>
                        );
                    })}

                    {actualResult.questions.map((el, index) => {
                        if (!renderQuestion(el)) return;
                        return (
                            <QuestionResultCard
                                id={"scrollspy-" + index.toString()}
                                dpOrQuestion={"question"}
                                desc={""}
                                question={actualResult.questions[index]}
                                currentDp={0}
                                currentQuestion={index}
                                next={next}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
