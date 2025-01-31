import { useEffect, useState } from "react";
import Modal from "../../../components/ui/modals";
import Spinner from "../../../components/ui/spinner";
import Input from "../../../components/ui/input";
import { libraryAtom, updateLibraryState } from "@/store/store";
import { Toaster, ToastType } from "../../../components/ui/toaster";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import { useData } from "@/providers/learningDataProvider";
import FileUpload from "../../../components/ui/FileUpload";
import QuestionForm from "../../../components/ui/QuestionForm";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from 'next/router';


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const questionTypes = [
    { type: "Basic question", n: 5, modelType: "MultiChoice" },
    { type: "QROC", n: 3, modelType: "ShortAnswer" },
    { type: "Long question", n: 12, modelType: "MultiChoice" },
];

const EditDPPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const authHttpClient = useAuthHttpClient(true);
    const [isLoading, setIsLoading] = useState(false);
    const [matieres, setMatieres] = useState([]);
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [cards, setCards] = useState([]);
    const [sessions, setSessions] = useState([]);

    const [fileData, setFileData] = useState(null);
    const [questionsFileData, setQuestionsFileData] = useState(
        Array(5).fill(null)
    );
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessionQuery, setSessionQuery] = useState("");
    const filteredSessions =
        sessionQuery === ""
            ? sessions
            : sessions.filter((session) => {
                return session.name
                    .toLowerCase()
                    .includes(sessionQuery.toLowerCase());
            });

    const [selectedMatieres, setSelectedMatieres] = useState([]);
    const [matiereQuery, setMatiereQuery] = useState("");
    const filteredMatieres =
        matiereQuery === ""
            ? matieres
            : matieres.filter((matiere) => {
                return matiere.name
                    .toLowerCase()
                    .includes(matiereQuery.toLowerCase());
            });

    const [selectedItems, setSelectedItems] = useState([]);
    const [itemQuery, setItemQuery] = useState("");
    const filteredItems =
        itemQuery === ""
            ? items
            : items.filter((item) => {
                return (
                    item.name.toLowerCase().includes(itemQuery.toLowerCase()) ||
                    String(item.item_number).includes(itemQuery.toLowerCase())
                );
            });

    const [selectedTags, setSelectedTags] = useState([]);
    const [tagQuery, setTagQuery] = useState("");
    const filteredTags =
        tagQuery === ""
            ? tags
            : tags.filter((tag) => {
                return tag.name.toLowerCase().includes(tagQuery.toLowerCase());
            });

    const [isUploading, setIsUploading] = useState(false);
    const [newDP, setNewDP] = useState({});
    const [idx, setIdx] = useState(0);
    const [n_questions, setN_questions] = useState(5);
    const [selectedQuestion, setSelectedQuestion] = useState({
        type: "Basic question",
        question: "",
        answers: Array(5).fill({
            choice: "",
            desc: "",
            answer: false,
        }),
        comment: "",
        cards: [],
    });
    const [err, setErr] = useState({});
    const changeQuestionForm = (question, index) => {
        const tempDP = { ...newDP };
        tempDP.questions[index] = { ...question };
        setNewDP(tempDP);
        setSelectedQuestion(question);
    };

    useEffect(() => {
        if (n_questions > idx) return;
        setIdx(n_questions - 1);
        setSelectedQuestion(newDP.questions[n_questions - 1]);
    }, [n_questions, idx]);

    useEffect(() => {
        setNewDP(() => ({
            matieres: [],
            items: [],
            tags: [],
            desc: "",
            dp_number: null,
            questions: Array(5).fill({
                validated: false,
                type: "Basic question",
                question: "",
                answers: Array(5).fill({
                    choice: "",
                    desc: "",
                    answer: false,
                }),
                comment: "",
                cards: [],
            }),
        }));
    }, []);

    useEffect(() => {
        if (selectedSession)
            setErr((err) => ({
                ...err,
                session_id: null,
            }));
        setNewDP((newDP) => ({
            ...newDP,
            session_id: selectedSession?._id,
            matieres: selectedMatieres.map((matiere) => matiere._id),
            items: selectedItems.map((item) => item._id),
            tags: selectedTags.map((tag) => tag._id),
        }));
    }, [selectedMatieres, selectedItems, selectedTags, selectedSession]);

    const increaseQuestions = () => {
        const temp_DP = { ...newDP };
        temp_DP.questions.push({
            validated: false,
            type: "Basic question",
            question: "",
            answers: Array(5).fill({
                choice: "",
                desc: "",
                answer: false,
            }),
            comment: "",
            cards: [],
        });
        setNewDP(temp_DP);
        setN_questions(n_questions + 1);
        setQuestionsFileData([...questionsFileData, null]);
    };

    const decreaseQuestions = () => {
        if (newDP.questions.length < 2) return;
        const temp_DP = { ...newDP };
        temp_DP.questions.pop();
        setNewDP(temp_DP);
        setN_questions(n_questions - 1);
        let aux = [...questionsFileData];
        aux.pop();
        setQuestionsFileData(aux);
    };

    const handleSubmit = async () => {
        if (
            isUploading ||
            newDP.questions.filter(({ validated }) => !validated).length > 0
        )
            return;
        setIsUploading(true);
        const temp_DP = { ...newDP };
        temp_DP.questions = temp_DP.questions.map((question) => ({
            ...question,
            type: questionTypes.find(({ type }) => type === question.type).modelType,
        }));
        try {
            const formData = new FormData();
            formData.append("dp", JSON.stringify(temp_DP));
            if (fileData) {
                formData.append("images", fileData);
            }
            for (let fd of questionsFileData) {
                formData.append("images", fd);
            }

            await authHttpClient.post("/dp/", formData);
            setIsUploading(false);
            setN_questions(5);
            setQuestionsFileData(Array(5).fill(null));
            setNewDP({
                ...newDP,
                desc: "",
                dp_number: "",
                questions: Array(5).fill({
                    validated: false,
                    type: "Basic question",
                    question: "",
                    answers: Array(5).fill({
                        choice: "",
                        desc: "",
                        answer: false,
                    }),
                    comment: "",
                    cards: [],
                }),
            });
            setIdx(0);
            setErr({});
            setSelectedQuestion({
                validated: false,
                type: "Basic question",
                question: "",
                answers: Array(5).fill({
                    choice: "",
                    desc: "",
                    answer: false,
                }),
                comment: "",
                cards: [],
            });
            window.scrollTo(0, 0);
        } catch (error) {
            setIsUploading(false);
            console.log(error);
        }
    };

    const handleClick = () => {
        if (!validate()) return;
        if (idx === n_questions - 1) {
            if (!validateHeader()) {
                window.scrollTo(0, 0);
                return;
            }
            handleSubmit();
        } else {
            setIdx(idx + 1);
            setSelectedQuestion(newDP.questions[idx + 1]);
            window.scrollTo(0, 500);
        }
    };

    const validateHeader = () => {
        if (!newDP.session_id)
            setErr((err) => ({ ...err, session_id: "required" }));
        if (newDP.desc === "") setErr((err) => ({ ...err, desc: "required" }));
        if (!newDP.dp_number) setErr((err) => ({ ...err, dp_number: "required" }));
        if (newDP.session_id && newDP.desc) return true;
        else return false;
    };
    const validate = () => {
        if (selectedQuestion.question === "")
            setErr((err) => ({ ...err, question: "required" }));
        // if (selectedQuestion.comment === "")
        //   setErr((err) => ({ ...err, comment: "required" }));
        const { type } = selectedQuestion;
        const answers =
            type === "Basic question" || type === "Long question"
                ? selectedQuestion.answers.map(({ choice }) =>
                    choice === "" ? "required" : null
                )
                : selectedQuestion.answers.map((answer) =>
                    answer === "" ? "required" : null
                );
        if (answers.filter((_) => _).length > 0)
            setErr((err) => ({ ...err, answers: answers }));
        if (
            selectedQuestion.question &&
            // selectedQuestion.comment &&
            answers.filter((_) => _).length === 0
        ) {
            newDP.questions[idx].validated = true;
            return true;
        } else {
            newDP.questions[idx].validated = false;
            return false;
        }
    };

    function onKeyDown(event) {
        if (event.keyCode === 13 && (event.metaKey || event.ctrlKey)) {
            console.log("onKeyDown");
            handleClick();
        }
    }
    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });

    useEffect(() => {
        const fetchDP = async () => {
            try {
                const response = await authHttpClient.get(`/dp/${id}`);
                console.log(response.data.data);
                const tempDP = {
                    ...response.data.data,
                    questions: response.data.data.questions.map((question) => ({
                        ...question,
                        type:
                            question.__t === "MultiChoice"
                                ? question.answers.length > 9
                                    ? "Long question"
                                    : "Basic question"
                                : "QROC",
                    })),
                };
                setNewDP(tempDP);
                setN_questions(tempDP.questions.length);
                setSelectedSession(tempDP.session_id);
                setSelectedMatieres(tempDP.matieres);
                setSelectedItems(tempDP.items);
                setSelectedTags(tempDP.tags);
                setSelectedQuestion(tempDP.questions[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDP();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            if (authHttpClient) {
                setIsLoading(true);
                try {
                    const [fetchMatiere, fetchItem, fetchCard, fetchTag, fetchSession] = await Promise.all([
                        authHttpClient.get("/matiere"),
                        authHttpClient.get("/item"),
                        authHttpClient.get("/card/withOutContent"),
                        authHttpClient.get("/tag"),
                        authHttpClient.get("/session"),
                    ]);
                    setMatieres(fetchMatiere.data.data);
                    setItems(fetchItem.data.data);
                    setCards(fetchCard.data.data);
                    setTags(fetchTag.data.data);
                    setSessions(fetchSession.data.data);
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        fetchData();
    }, []);

    // const handleInputChange = (name, value) => {
    //     setName(value)
    // };

    return (
        <div>
            <div className="">
                <div className="p-10 rounded-lg bg-white text-black">
                    <div className="text-xl flex justify-center font-bold">Create DP</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 my-2 gap-2">
                        {/*   select session   */}
                        <Combobox
                            as="div"
                            value={selectedSession}
                            onChange={setSelectedSession}
                        >
                            <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                                Select Session
                            </Combobox.Label>
                            <div className="relative mt-2">
                                <Combobox.Input
                                    className={classNames(
                                        "shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white capitalize",
                                        err.session_id && "ring-red-600"
                                    )}
                                    onChange={(event) => setSessionQuery(event.target.value)}
                                    displayValue={(session) => session?.name}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                                </Combobox.Button>

                                {filteredSessions && filteredSessions.length > 0 && (
                                    <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredSessions.map((session) => (
                                            <Combobox.Option
                                                key={session._id}
                                                value={session}
                                                className={({ active }) =>
                                                    classNames(
                                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                                        active ? "bg-violet-600 text-white" : "text-gray-900"
                                                    )
                                                }
                                            >
                                                {({ active, selected }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames(
                                                                    "ml-3 truncate",
                                                                    selected && "font-semibold"
                                                                )}
                                                            >
                                                                {session.name}
                                                            </span>
                                                        </div>

                                                        {selected && (
                                                            <span
                                                                className={classNames(
                                                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                    active ? "text-white" : "text-primary-600"
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}
                            </div>
                        </Combobox>
                    </div>
                    {/*   select matieres   */}
                    <Combobox
                        as="div"
                        value={selectedMatieres}
                        onChange={setSelectedMatieres}
                        multiple
                    >
                        <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                            Select Matieres
                        </Combobox.Label>
                        <div className="flex gap-2">
                            <div className="relative mt-2 max-w-fit">
                                <Combobox.Input
                                    className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white capitalize"
                                    onChange={(event) => setMatiereQuery(event.target.value)}
                                // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>

                                {filteredMatieres && filteredMatieres.length > 0 && (
                                    <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredMatieres.map((matiere) => (
                                            <Combobox.Option
                                                key={matiere._id}
                                                value={matiere}
                                                className={({ active }) =>
                                                    classNames(
                                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                                        active ? "bg-violet-600 text-white" : "text-gray-900"
                                                    )
                                                }
                                            >
                                                {({ active, selected }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames(
                                                                    "ml-3 truncate",
                                                                    selected && "font-semibold"
                                                                )}
                                                            >
                                                                {matiere.name}
                                                            </span>
                                                        </div>

                                                        {selected && (
                                                            <span
                                                                className={classNames(
                                                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                    active ? "text-white" : "text-primary-600"
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}
                            </div>
                            <div className="mt-1.5 flex-1 rounded-lg border-dashed border-2 border-gray-200 p-2">
                                <div className="flex gap-2 flex-wrap ">
                                    {selectedMatieres && selectedMatieres.map((matiere) => (
                                        <div
                                            className="px-2  hover:text-red-900 hover:border-red-900 hover:cursor-pointer min-w-fit border border-gray-400 rounded-md text-[12px]"
                                            onClick={() =>
                                                setSelectedMatieres(
                                                    selectedMatieres.filter(
                                                        (selectedTag) => selectedTag._id !== matiere._id
                                                    )
                                                )
                                            }
                                        >
                                            {matiere.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Combobox>
                    {/*   select items   */}
                    <Combobox
                        as="div"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        multiple
                    >
                        <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                            Select Items
                        </Combobox.Label>
                        <div className="flex gap-2">
                            <div className="relative mt-2 max-w-fit">
                                <Combobox.Input
                                    className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white capitalize"
                                    onChange={(event) => setItemQuery(event.target.value)}
                                // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>

                                {filteredItems && filteredItems.length > 0 && (
                                    <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredItems.map((item) => (
                                            <Combobox.Option
                                                key={item._id}
                                                value={item}
                                                className={({ active }) =>
                                                    classNames(
                                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                                        active ? "bg-violet-600 text-white" : "text-gray-900"
                                                    )
                                                }
                                            >
                                                {({ active, selected }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames(
                                                                    "ml-3 truncate",
                                                                    selected && "font-semibold"
                                                                )}
                                                            >
                                                                {`${item.item_number}. ${item.name}`}
                                                            </span>
                                                        </div>

                                                        {selected && (
                                                            <span
                                                                className={classNames(
                                                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                    active ? "text-white" : "text-primary-600"
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}
                            </div>
                            <div className="mt-1.5 flex-1 rounded-lg border-dashed border-2 border-gray-200 p-2">
                                <div className="flex gap-2 flex-wrap ">
                                    {selectedItems && selectedItems.map((item) => (
                                        <div
                                            className="px-2  hover:text-red-900 hover:border-red-900 hover:cursor-pointer min-w-fit border border-gray-400 rounded-md text-[12px]"
                                            onClick={() =>
                                                setSelectedItems(
                                                    selectedItems.filter(
                                                        (selectedItem) => selectedItem._id !== item._id
                                                    )
                                                )
                                            }
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Combobox>
                    {/*   select tags   */}
                    <Combobox
                        as="div"
                        value={selectedTags}
                        onChange={setSelectedTags}
                        multiple
                    >
                        <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                            Select Tags
                        </Combobox.Label>
                        <div className="flex gap-2">
                            <div className="relative mt-2 max-w-fit">
                                <Combobox.Input
                                    className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white capitalize"
                                    onChange={(event) => setTagQuery(event.target.value)}
                                // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>

                                {filteredTags && filteredTags.length > 0 && (
                                    <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredTags.map((tag) => (
                                            <Combobox.Option
                                                key={tag._id}
                                                value={tag}
                                                className={({ active }) =>
                                                    classNames(
                                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                                        active ? "bg-violet-600 text-white" : "text-gray-900"
                                                    )
                                                }
                                            >
                                                {({ active, selected }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames(
                                                                    "ml-3 truncate",
                                                                    selected && "font-semibold"
                                                                )}
                                                            >
                                                                {tag.name}
                                                            </span>
                                                        </div>

                                                        {selected && (
                                                            <span
                                                                className={classNames(
                                                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                    active ? "text-white" : "text-primary-600"
                                                                )}
                                                            >
                                                                <CheckIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Combobox.Option>
                                        ))}
                                    </Combobox.Options>
                                )}
                            </div>
                            <div className="mt-1.5 flex-1 rounded-lg border-dashed border-2 border-gray-200 p-2">
                                <div className="flex gap-2 flex-wrap ">
                                    {selectedTags && selectedTags.map((tag) => (
                                        <div
                                            className="px-2  hover:text-red-900 hover:border-red-900 hover:cursor-pointer min-w-fit border border-gray-400 rounded-md text-[12px]"
                                            onClick={() =>
                                                setSelectedTags(
                                                    selectedTags.filter(
                                                        (selectedTag) => selectedTag._id !== tag._id
                                                    )
                                                )
                                            }
                                        >
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Combobox>
                    <label className="mt-4 text-left block text font-bold leading-6 text-gray-900">
                        Description
                    </label>
                    <div className="mt-2 w-1/5">
                        <input
                            className={classNames(
                                "shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white capitalize",
                                err.dp_number && "ring-red-600"
                            )}
                            type="text"
                            placeholder="DP ID"
                            value={newDP.dp_number}
                            onChange={(e) => {
                                if (err.dp_number) {
                                    const errTemp = { ...err };
                                    errTemp.dp_number = null;
                                    setErr(errTemp);
                                }
                                setNewDP({
                                    ...newDP,
                                    dp_number: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <textarea
                        type="text"
                        className={classNames(
                            "shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white capitalize",
                            err.desc && "ring-red-600"
                        )}
                        value={newDP.desc}
                        placeholder="Type the DP here..."
                        onChange={(e) => {
                            const errTemp = { ...err };
                            errTemp.desc = null;
                            setErr(errTemp);
                            const tempDP = { ...newDP };
                            tempDP.desc = e.target.value;
                            setNewDP(tempDP);
                        }}
                    />
                    <div class="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                        <FileUpload selectedFile={fileData} setSelectedFile={setFileData} />
                    </div>
                    <label className="mt-4 text-left block text font-bold leading-6 text-gray-900">
                        Number of questions
                    </label>
                    <div className="mt-2 max-w-fit flex items-center rounded-lg border border-gray-300 shadow-sm text-sm font-bold divide-x divide-gray-300">
                        <div
                            className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-l-lg"
                            onClick={() => decreaseQuestions()}
                        >
                            <MinusIcon className="h-5" />
                        </div>
                        <div className="flex items-center min-w-fit px-4 py-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100">
                            {n_questions}
                        </div>
                        <div
                            className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-r-lg"
                            onClick={() => increaseQuestions()}
                        >
                            <PlusIcon className="h-5" />
                        </div>
                    </div>
                    {newDP && newDP.questions && (
                        <div className="flex justify-center py-4 flex-wrap gap-2">
                            {newDP && newDP.questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={classNames(
                                        "hover:cursor-pointer relative inline-flex items-center justify-center w-11 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300",
                                        idx === i && "bg-violet-600 text-white",
                                        _.validated && "ring-primary-600"
                                    )}
                                    onClick={() => {
                                        if (validate()) {
                                            setIdx(i);
                                            setSelectedQuestion(newDP.questions[i]);
                                        }
                                    }}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="h-[1px] bg-gray-300 my-4 -mx-10" />
                    <label className="mt-4 text-left block text font-bold leading-6 text-gray-900">
                        Question {idx + 1}
                    </label>
                    {selectedQuestion && (
                        <QuestionForm
                            key={idx}
                            fileDataQ={questionsFileData[idx]}
                            setFileDataQ={(item) => {
                                let aux = [...questionsFileData];
                                aux[idx] = item;
                                console.log(fileData);
                                setQuestionsFileData(aux);
                            }}
                            selectedQuestion={selectedQuestion}
                            setSelectedQuestion={(_) => {
                                changeQuestionForm(_, idx);
                            }}
                            cards={cards}
                            err={err}
                            setErr={setErr}
                        />
                    )}
                    <div className="mt-12 m-4 flex flex-row-reverse">
                        <button
                            onClick={() => {
                                handleClick(idx);
                            }}
                            type="button"
                            className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-violet-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                        >
                            {isUploading && <Spinner small />}
                            {idx === n_questions - 1 ? "Upload DP" : "Next Question"}
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="mt-4 flex flex-row-reverse">
                <button
                    onClick={() => {
                        handleSubmit();
                    }}
                    disabled={isUploading}
                    type="button"
                    className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-violet-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                >
                    {
                        isUploading && <Spinner size="sm" fillColor="white" />
                    }
                    {
                        isUploading ? <span>Submitting</span> : <span>Add Session</span>
                    }
                </button>
            </div> */}
        </div>
    );
};
export default EditDPPage;
