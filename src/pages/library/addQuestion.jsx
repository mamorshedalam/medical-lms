import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Spinner from "@/components/ui/Spinner";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox, Switch } from "@headlessui/react";
import FileUpload from "@/components/ui/FileUpload";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import { useRouter } from "next/navigation";
import { updateLibraryState } from "@/store/store";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const AddQuestionPage = () => {
    const router = useRouter();

    const authHttpClient = useAuthHttpClient(true);
    // const { matieres, items, tags, sessions, cards } = useData();
    const [isLoading, setIsLoading] = useState(false);
    const [matieres, setMatieres] = useState([]);
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [cards, setCards] = useState([]);
    const [sessions, setSessions] = useState([]);

    const [addToAnnales, setAddToAnnales] = useState(false);
    const [isRankA, setRankA] = useState(true);
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

    const [selectedMatiere, setSelectedMatiere] = useState(null);
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

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [itemQuery, setItemQuery] = useState("");
    const filteredItems =
        itemQuery === ""
            ? items.filter(
                (item) =>
                    addToAnnales ||
                    !selectedMatiere ||
                    item.matiere_id === selectedMatiere._id
            )
            : items.filter((item) => {
                return (
                    (item.name.toLowerCase().includes(itemQuery.toLowerCase()) ||
                        String(item.item_number).includes(itemQuery.toLowerCase())) &&
                    (!selectedMatiere || item.matiere_id === selectedMatiere._id)
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

    const [selectedCards, setSelectedCards] = useState([]);
    const [cardQuery, setCardQuery] = useState("");
    const filteredCards =
        cardQuery === ""
            ? cards
            : cards.filter((card) => {
                return card.name.toLowerCase().includes(cardQuery.toLowerCase());
            });

    const [isUploading, setIsUploading] = useState(false);
    const [newQuestion, setNewQuestion] = useState({});
    const [err, setErr] = useState({});
    useEffect(() => {
        setNewQuestion({
            question: "",
            question_number: "",
            answers: Array(5).fill({
                choice: "",
                desc: "",
                answer: false,
            }),
            comment: "",
            matiere_id: null,
            item_id: null,
            tags: [],
            cards: [],
        });
    }, []);
    const [n_choices, setN_choices] = useState(5);
    const [questionTypes, setQuestionTypes] = useState([
        {
            type: "Basic question",
            selected: true,
            n: 5,
            modelType: "MultiChoice",
        },
        { type: "QROC", selected: false, n: 3, modelType: "ShortAnswer" },
        {
            type: "Long question",
            selected: false,
            n: 12,
            modelType: "MultiChoice",
        },
    ]);

    useEffect(() => {
        setNewQuestion((newQuestion) => {
            if (selectedSession)
                setErr((err) => ({
                    ...err,
                    session_id: null,
                }));
            if (selectedMatiere)
                setErr((err) => ({
                    ...err,
                    matiere_id: null,
                }));
            if (selectedItem)
                setErr((err) => ({
                    ...err,
                    item_id: null,
                }));
            return {
                ...newQuestion,
                session_id: selectedSession?._id,
                matiere_id: selectedMatiere?._id,
                item_id: selectedItem?._id,
                tags: selectedTags.map((tag) => tag._id),
                cards: selectedCards.map((card) => card._id),
                matieres: selectedMatieres.map((matiere) => matiere._id),
                items: selectedItems.map((item) => item._id),
            };
        });
    }, [
        selectedMatiere,
        selectedItem,
        selectedTags,
        selectedCards,
        selectedSession,
        selectedMatieres,
        selectedItems,
    ]);

    const changeType = ({ type, selected, n }) => {
        if (selected) return;
        setN_choices(n);
        setNewQuestion((question) => ({
            ...question,
            answers: Array(n).fill(
                type === "Basic question" || type === "Long question"
                    ? {
                        choice: "",
                        desc: "",
                        answer: false,
                    }
                    : ""
            ),
        }));
        setQuestionTypes((questionTypes) => {
            return questionTypes.map((questionType) => ({
                ...questionType,
                selected: questionType.type === type,
            }));
        });
    };
    const plusN_choices = () => {
        const temp_question = newQuestion;
        temp_question.answers.push(
            questionTypes.find((_) => _.selected).type === "Basic question" ||
                questionTypes.find((_) => _.selected).type === "Long question"
                ? {
                    choice: "",
                    desc: "",
                    answer: false,
                }
                : ""
        );
        setNewQuestion(temp_question);
        setN_choices(n_choices + 1);
    };
    const minusN_choices = () => {
        if (n_choices < 2) return;
        setN_choices(n_choices - 1);
        const temp_question = newQuestion;
        temp_question.answers.pop();
        setNewQuestion(temp_question);
    };
    const handleSubmit = async (e) => {
        if (isUploading) {
            return;
        }
        if (!validate()) return;
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append(
                "question",
                JSON.stringify({ ...newQuestion, difficulty: isRankA })
            );
            formData.append("type", questionTypes.find((_) => _.selected).modelType);
            if (fileData) {
                formData.append("image", fileData);
            }
            const response = await authHttpClient.post("/question/", formData);
            setIsUploading(false);
            const { type, n } = questionTypes.find(({ selected }) => selected);
            setN_choices(n);
            setNewQuestion((question) => ({
                ...question,
                question: "",
                question_number: "",
                comment: "",
                answers: Array(n).fill(
                    type === "Basic question" || type === "Long question"
                        ? {
                            choice: "",
                            desc: "",
                            answer: false,
                        }
                        : ""
                ),
            }));
            router.push('/library');
            updateLibraryState({
                activeTabIndex: "questions",
                isRenderingData: true
            });
        } catch (error) {
            setIsUploading(false);
            console.log(error);
        }
    };

    const validate = () => {
        if (addToAnnales) {
            if (!newQuestion.session_id)
                setErr((err) => ({ ...err, session_id: "required" }));
        } else {
            if (!newQuestion.matiere_id)
                setErr((err) => ({ ...err, matiere_id: "required" }));
            if (!newQuestion.item_id)
                setErr((err) => ({ ...err, item_id: "required" }));
        }
        if (newQuestion.question_number === "")
            setErr((err) => ({ ...err, question_number: "required" }));
        if (newQuestion.question === "")
            setErr((err) => ({ ...err, question: "required" }));
        // if (newQuestion.comment === "")
        //   setErr((err) => ({ ...err, comment: "required" }));
        const { type } = questionTypes.find(({ selected }) => selected);
        const answers =
            type === "Basic question" || type === "Long question"
                ? newQuestion.answers.map(({ choice }) =>
                    choice === "" ? "required" : null
                )
                : newQuestion.answers.map((answer) =>
                    answer === "" ? "required" : null
                );
        if (answers.filter((_) => _).length > 0)
            setErr((err) => ({ ...err, answers: answers }));
        if (
            newQuestion.question &&
            (addToAnnales
                ? newQuestion.session_id
                : newQuestion.matiere_id && newQuestion.item_id) &&
            answers.filter((_) => _).length === 0
        )
            return true;
        console.log("validation failed");
        return false;
    };
    function onKeyDown(event) {
        if (event.keyCode === 13 && (event.metaKey || event.ctrlKey)) {
            console.log("onKeyDown");
            handleSubmit();
        }
    }
    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });
    const [fileData, setFileData] = useState(null);

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


    return (
        <div className="">
            <div className="p-10 rounded-lg bg-white text-black">
                <div className="text-xl flex justify-center font-bold">Create QI</div>
                <div className="flex gap-4">
                    <Switch
                        checked={addToAnnales}
                        onChange={() => {
                            setAddToAnnales(!addToAnnales);
                        }}
                        className={classNames(
                            addToAnnales ? "bg-violet-600" : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                addToAnnales ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                        />
                    </Switch>
                    <span>Add to Annales</span>
                </div>
                {addToAnnales ? (
                    <>
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
                                            "shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white",
                                            err.session_id && "ring-red-600"
                                        )}
                                        onChange={(event) => setSessionQuery(event.target.value)}
                                        displayValue={(session) => session?.name}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                                    </Combobox.Button>

                                    {filteredSessions.length > 0 && (
                                        <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filteredSessions.map((session) => (
                                                <Combobox.Option
                                                    key={session._id}
                                                    value={session}
                                                    className={({ active }) =>
                                                        classNames(
                                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                                            active
                                                                ? "bg-violet-600 text-white"
                                                                : "text-gray-900"
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
                                                                        active ? "text-white" : "text-violet-600"
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
                                        className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white"
                                        onChange={(event) => setMatiereQuery(event.target.value)}
                                    // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>

                                    {filteredMatieres.length > 0 && (
                                        <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filteredMatieres.map((matiere) => (
                                                <Combobox.Option
                                                    key={matiere._id}
                                                    value={matiere}
                                                    className={({ active }) =>
                                                        classNames(
                                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                                            active
                                                                ? "bg-violet-600 text-white"
                                                                : "text-gray-900"
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
                                                                        active ? "text-white" : "text-violet-600"
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
                                        {selectedMatieres.map((matiere) => (
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
                                        className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white"
                                        onChange={(event) => setItemQuery(event.target.value)}
                                    // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>

                                    {filteredItems.length > 0 && (
                                        <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filteredItems.map((item) => (
                                                <Combobox.Option
                                                    key={item._id}
                                                    value={item}
                                                    className={({ active }) =>
                                                        classNames(
                                                            "relative cursor-default select-none py-2 pl-3 pr-9",
                                                            active
                                                                ? "bg-violet-600 text-white"
                                                                : "text-gray-900"
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
                                                                        active ? "text-white" : "text-violet-600"
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
                                        {selectedItems.map((item) => (
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
                    </>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 my-2 gap-2">
                        {/*   select matiere   */}
                        <Combobox
                            as="div"
                            value={selectedMatiere}
                            onChange={(matiere) => {
                                setSelectedItem(null);
                                setSelectedMatiere(matiere);
                            }}
                        >
                            <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                                Select Matiere
                            </Combobox.Label>
                            <div className="relative mt-2">
                                <Combobox.Input
                                    className={classNames(
                                        `shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white`,
                                        err.matiere_id && `ring-red-600`
                                    )}
                                    onChange={(event) => {
                                        setMatiereQuery(event.target.value);
                                    }}
                                    displayValue={(matiere) => matiere?.name}
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
                                                        active
                                                            ? "bg-violet-600 text-white"
                                                            : "text-gray-900"
                                                    )
                                                }
                                            >
                                                {({ active, selected }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <img
                                                                src={matiere.image}
                                                                alt={matiere.name}
                                                                className="h-6 w-6 flex-shrink-0 rounded-full"
                                                            />
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
                                                                    active ? "text-white" : "text-violet-600"
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
                        {/*   select item    */}
                        <Combobox
                            as="div"
                            value={selectedItem}
                            onChange={(item) => {
                                setSelectedMatiere(
                                    item && matieres.find(({ _id }) => _id === item.matiere_id)
                                );
                                setSelectedItem(item);
                            }}
                        >
                            <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                                Select Item
                            </Combobox.Label>
                            <div className="relative mt-2">
                                <Combobox.Input
                                    className={classNames(
                                        `shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white`,
                                        err.item_id && `ring-red-600`
                                    )}
                                    onChange={(event) => {
                                        setItemQuery(event.target.value);
                                    }}
                                    displayValue={(item) =>
                                        item && `${item.item_number}. ${item.name}`
                                    }
                                />
                                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Combobox.Button>

                                {filteredItems.length > 0 && (
                                    <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {filteredItems.map((item) => (
                                            <Combobox.Option
                                                key={item._id}
                                                value={item}
                                                className={({ active }) =>
                                                    classNames(
                                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                                        active
                                                            ? "bg-violet-600 text-white"
                                                            : "text-gray-900"
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
                                                                    active ? "text-white" : "text-violet-600"
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
                )}
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
                                className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white"
                                onChange={(event) => setTagQuery(event.target.value)}
                            // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>

                            {filteredTags.length > 0 && (
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
                                                                active ? "text-white" : "text-violet-600"
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
                                {selectedTags.map((tag, index) => (
                                    <div
                                        key={index}
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
                    Question
                </label>
                <div className="mt-2 flex flex-wrap justify-between items-center gap-2">
                    {/* question type */}
                    <div className="flex rounded-lg border border-gray-300 shadow-sm text-sm font-bold divide-x divide-gray-300">
                        {questionTypes.map(({ type, selected, n }, index) => (
                            <div
                                key={index}
                                onClick={() => changeType({ type, selected, n })}
                                // className="flex gap-2 items-center min-w-fit px-4 py-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100"
                                className={`flex gap-2 items-center min-w-fit px-4 py-2  hover:cursor-pointer hover:bg-violet-600 ${selected && "bg-violet-600 text-white"}`}


                            >
                                <div
                                    className={classNames(
                                        `w-4 h-4 rounded-full border-2 border-gray-400`,
                                        selected && "bg-white border-violet-200"
                                    )}
                                />
                                {type}
                            </div>
                        ))}
                    </div>
                    {/* number of answers */}
                    <div className="flex items-center gap-2">
                        <div className="text-center max-w-fit">Number of answers</div>
                        <div className="flex items-center rounded-lg border border-gray-300 shadow-sm text-sm font-bold divide-x divide-gray-300">
                            <div
                                className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-l-lg"
                                onClick={() => minusN_choices()}
                            >
                                <MinusIcon className="h-5" />
                            </div>
                            <div className="flex items-center min-w-fit px-4 py-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100">
                                {n_choices}
                            </div>
                            <div
                                className="flex items-center min-w-fit p-2 border-gray-300 hover:cursor-pointer hover:bg-gray-100 rounded-r-lg"
                                onClick={() => plusN_choices()}
                            >
                                <PlusIcon className="h-5" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 w-1/5">
                    <input
                        className={classNames(
                            "w-full shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block p-3 my-2 bg-white",
                            err.question_number && "ring-red-600"
                        )}
                        type="text"
                        placeholder="Question ID"
                        value={newQuestion.question_number}
                        onChange={(e) => {
                            if (err.question_number) {
                                const errTemp = { ...err };
                                errTemp.question_number = null;
                                setErr(errTemp);
                            }
                            setNewQuestion({
                                ...newQuestion,
                                question_number: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="my-2 flex gap-2">
                    <textarea
                        type="text"
                        className={classNames(
                            "shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white",
                            err.question && "ring-red-600"
                        )}
                        value={newQuestion.question}
                        placeholder="Type the question here..."
                        onChange={(e) => {
                            setErr((err) => ({
                                ...err,
                                question: null,
                            }));
                            setNewQuestion(() => ({
                                ...newQuestion,
                                question: e.target.value,
                            }));
                        }}
                    />
                </div>
                <div className="flex gap-4">
                    <span>Rang A</span>
                    <Switch
                        checked={isRankA}
                        onChange={() => {
                            setRankA(!isRankA);
                        }}
                        className={classNames(
                            "bg-violet-600",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
                        )}
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                isRankA ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                        />
                    </Switch>
                    <span>B</span>
                </div>
                <div class="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                    <FileUpload selectedFile={fileData} setSelectedFile={setFileData} />
                </div>
                {/* <div className="h-[1px] bg-gray-300 my-4 -mx-6"/> */}
                {/* answers */}
                {(questionTypes.find((_) => _.selected).type === "Basic question" ||
                    questionTypes.find((_) => _.selected).type === "Long question") && (
                        <div className="text-left my-2 ml-2 flex flex-col gap-2 text-sm">
                            {newQuestion.answers?.map(({ choice, desc, answer }, index) => (
                                <div key={index} className="mt-2 w-full">
                                    Proposition {String.fromCharCode("A".charCodeAt(0) + index)}
                                    <div className="flex gap-2">
                                        <div className="mt-2.5">
                                            <input
                                                type="checkbox"
                                                checked={answer}
                                                className="h-5 w-5 mx-2 rounded border-gray-300  focus:ring-violet-600"
                                                onChange={(e) => {
                                                    setNewQuestion({
                                                        ...newQuestion,
                                                        answers: newQuestion.answers.map((_, _i) => {
                                                            if (_i === index) {
                                                                return {
                                                                    ..._,
                                                                    answer: e.target.checked,
                                                                };
                                                            }
                                                            return _;
                                                        }),
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1 my-1">
                                            <div>
                                                <input
                                                    className={classNames(
                                                        "shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white",
                                                        err.answers && err.answers[index] && "ring-red-600"
                                                    )}
                                                    type="text"
                                                    value={choice}
                                                    onChange={(e) => {
                                                        if (err.answers) {
                                                            const errTemp = { ...err };
                                                            errTemp.answers[index] = null;
                                                            setErr(errTemp);
                                                        }
                                                        setNewQuestion({
                                                            ...newQuestion,
                                                            answers: newQuestion.answers.map((_, _i) => {
                                                                if (_i === index) {
                                                                    return {
                                                                        ..._,
                                                                        choice: e.target.value,
                                                                    };
                                                                }
                                                                return _;
                                                            }),
                                                        });
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <textarea
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6 bg-gray-100"
                                                    type="text"
                                                    value={desc}
                                                    onChange={(e) => {
                                                        setNewQuestion({
                                                            ...newQuestion,
                                                            answers: newQuestion.answers.map((_, _i) => {
                                                                if (_i === index)
                                                                    return {
                                                                        ..._,
                                                                        desc: e.target.value,
                                                                    };
                                                                return _;
                                                            }),
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                {questionTypes.find((_) => _.selected).type === "QROC" && (
                    <div className="my-2 text-left text-sm">
                        Answer
                        <div className="my-2 grid grid-cols-3 gap-2">
                            {newQuestion.answers?.map((answer, index) => (
                                <div key={index} className="min-w-fit">
                                    <input
                                        className={classNames(
                                            "w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6",
                                            err.answers && err.answers[index] && "ring-red-600"
                                        )}
                                        type="text"
                                        value={answer}
                                        onChange={(e) => {
                                            if (err.answers) {
                                                const errTemp = { ...err };
                                                errTemp.answers[index] = null;
                                                setErr(errTemp);
                                            }
                                            setNewQuestion({
                                                ...newQuestion,
                                                answers: newQuestion.answers.map((_, _i) => {
                                                    if (_i === index) return e.target.value;
                                                    return _;
                                                }),
                                            });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <label className="mt-2 text-left block text-sm font-medium leading-6 text-gray-900">
                    Commentaire
                </label>
                <div className="my-2 flex gap-2">
                    <textarea
                        type="text"
                        className={classNames(
                            "shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white",
                            err.comment && "ring-red-600"
                        )}
                        value={newQuestion.comment}
                        onChange={(e) => {
                            const errTemp = { ...err };
                            errTemp.comment = null;
                            setErr(errTemp);
                            setNewQuestion(() => ({
                                ...newQuestion,
                                comment: e.target.value,
                            }));
                        }}
                    />
                </div>
                <Combobox
                    as="div"
                    value={selectedCards}
                    onChange={setSelectedCards}
                    multiple
                >
                    <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                        Select Cards
                    </Combobox.Label>
                    <div className="flex gap-2">
                        <div className="relative mt-2 max-w-fit">
                            <Combobox.Input
                                className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2 bg-white"
                                onChange={(event) => setCardQuery(event.target.value)}
                            // displayValue={(items) => { return items.map((item) => item.name).join(", "); }}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>

                            {filteredCards.length > 0 && (
                                <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {filteredCards.map((card) => (
                                        <Combobox.Option
                                            key={card._id}
                                            value={card}
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
                                                            {card.name}
                                                        </span>
                                                    </div>

                                                    {selected && (
                                                        <span
                                                            className={classNames(
                                                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                                                active ? "text-white" : "text-violet-600"
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
                                {selectedCards.map((card) => (
                                    <div
                                        key={card._id}
                                        className="px-2  hover:text-red-900 hover:border-red-900 hover:cursor-pointer min-w-fit border border-gray-400 rounded-md text-[12px]"
                                        onClick={() =>
                                            setSelectedCards(
                                                selectedCards.filter(
                                                    (selectedCard) => selectedCard._id !== card._id
                                                )
                                            )
                                        }
                                    >
                                        {card.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Combobox>

                <div className="mt-12 m-4 flex flex-row-reverse">
                    <button
                        onClick={() => {
                            handleSubmit();
                        }}
                        type="button"
                        className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-violet-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-violet-600"
                    >
                        {isUploading && <Spinner small />}
                        {isUploading ? "Submitting" : "Upload QI"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddQuestionPage;
