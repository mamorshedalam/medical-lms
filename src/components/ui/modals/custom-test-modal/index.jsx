import React, { Fragment, useEffect, useState } from "react";

import { libraryAtom, modal, updateLibraryState, updateQuizeState } from "@/store/store";
import { useAtom } from "jotai";
import Dropdown from "../../dropdown";
import {
  historyType,
  rangTypes,
  sessionTypes,
  successTypes,
} from "@/constants/mockup-data/library";
import Segmented from "../../Segmented";
import NumberInput from "../../number-input";
import TogglerOne from "../../togglers/toggler-one";
import Tooltip from "../../tooltip";
import VerticalDivider from "../../vertical-divider";
import HorizontalDivider from "../../horizontal-divider";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import { Toaster, ToastType } from "../../toaster";
import { useAuth } from "@/providers/authProvider";
import Spinner from "../../spinner";
import { useQuiz } from "@/hooks/useQuiz";
import { useExam } from "@/providers/examProvider";

const CustomTestModal = () => {
  const authHttpClient = useAuthHttpClient();
  const { user } = useAuth();
  const { loadQuestions } = useQuiz();
  const { setQuestions, showCreateTestModal, setShowCreateTestModal } =
    useExam();
  const [libraryState, setLibraryState] = useAtom(libraryAtom);
  const [openState, setOpenState] = useAtom(modal); // Get the current state of the modal
  const [opened, setOpened] = useState(false);
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [selectedMatieres, setSelectedMatieres] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [rank, setRank] = useState("all");
  const [history, setHistory] = useState("both");
  const [difficulty, setDifficulty] = useState("any");
  const [sessionType, setSessionType] = useState("all");
  const [n_questions, setN_questions] = useState(0);
  const [total_questions, setTotalQuestions] = useState(0);
  const [modeExam, setEnabled] = useState(false);

  useEffect(() => {
    openState && setOpened(openState.customTest);
  }, [openState]);


  useEffect(() => {
    const fetchData = async () => {
      if (authHttpClient) {
        setLoading(true);
        try {
          const [fetchMatiere, fetchItem, fetchTag] = await Promise.all([
            authHttpClient.get("/matiere"),
            authHttpClient.get("/item"),
            authHttpClient.get("/tag"),
          ]);
          updateLibraryState({
            materialsAtom: fetchMatiere.data.data,
            itemsAtom: fetchItem.data.data,
            tagsAtom: fetchTag.data.data,
            isRenderingData: false
          });
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);


  const closeModal = () => {
    setOpened(false);
    setOpenState({ ...openState, customTest: false });
  };

  const filteredMatieres = React.useMemo(() => {
    if (!libraryState?.materialsAtom) return [];

    return libraryState.materialsAtom.map(matiere => ({
      name: matiere.name,
      value: matiere._id
    })).filter(matiere =>
      query === "" || matiere.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [libraryState?.materialsAtom, query]);

  const filteredItems = React.useMemo(() => {
    if (!libraryState?.itemsAtom) return [];

    return libraryState.itemsAtom.map(item => ({
      name: item.name,
      value: item._id
    })).filter(item =>
      query === "" || item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [libraryState?.materialsAtom, query]);

  const filteredTags = React.useMemo(() => {
    if (!libraryState?.tagsAtom) return [];

    return libraryState.tagsAtom.map(tag => ({
      name: tag.name,
      value: tag._id
    })).filter(tag =>
      query === "" || tag.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [libraryState?.materialsAtom, query]);


  const handleSubmit = async () => {
    if (n_questions == 0) {
      Toaster(ToastType.ERROR, "Cannot create a test with 0 questions!");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await authHttpClient.post(
        "/question/filterRandomMultiple",
        {
          user_id: user._id,
          matieres_id: selectedMatieres,
          items_id: selectedItems,
          n_questions: n_questions,
          tags: selectedTags,
          history: history,
          rang: rank,
          difficulty: difficulty,
        }
      );
      Toaster(ToastType.SUCCESS, "Test exam created successfully!");
      setIsSubmitting(false);

      // updateQuizeState({
      //   questions: response.data.data,
      //   loadQuestions: fetchItem.data.data,
      // });
      // closeModal();
      if (modeExam) {
        router.push("/exam");
        setQuestions(response.data.data);
        setShowCreateTestModal(false);
      } else {
        loadQuestions(response.data.data);
        router.push("/quiz");
        setShowCreateTestModal(false);
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <Fragment>
      {opened ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <div className="bg-white rounded-lg shadow-lg max-w-[700px] w-fill-available z-10">
            <div className="flex px-7 py-5 justify-between items-center border-b">
              <h2 className="w-full text-center text-xl font-manrope font-extrabold text-black">
                Custom Test
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
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-[#2F3037] text-base font-bold mb-2"> Matières </label>
                <Dropdown
                  className="w-full"
                  options={filteredMatieres}
                  selected={selectedMatieres}
                  setSelected={setSelectedMatieres}
                  placeholder="Select Matières"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#2F3037] text-base font-bold mb-2"> Item </label>
                <Dropdown
                  className="w-full"
                  options={filteredItems}
                  selected={selectedItems}
                  setSelected={setSelectedItems}
                  placeholder="Select Item"
                />
              </div>

              <HorizontalDivider className="w-full h-px bg-[#EDEDF0] bg-opacity-100" />

              <div className="flex gap-4">
                <div className="mb-4">
                  <label className="block text-[#2F3037] text-base font-bold mb-2">
                    Rang
                  </label>
                  <Segmented options={rangTypes} current={rank} setCurrent={setRank} />
                </div>

                <div className="flex flex-1 justify-center">
                  <VerticalDivider className="h-14 w-px" />
                </div>

                <div className="mb-4">
                  <label className="flex text-[#2F3037] text-base font-bold mb-2 gap-1">
                    History
                    <Tooltip />
                  </label>
                  <Segmented options={historyType} current={history} setCurrent={setHistory} />
                </div>

                <div className="flex flex-1 justify-center">
                  <VerticalDivider className="h-14 w-px" />
                </div>

                <div className="mb-4">
                  <label className="flex text-[#2F3037] text-base font-bold mb-2 gap-1">
                    Success
                    <Tooltip />
                  </label>
                  <Segmented options={successTypes} current={difficulty} setCurrent={setDifficulty} />
                </div>
              </div>

              <div>
                <label className="flex text-[#2F3037] text-base font-bold mb-2 gap-1">
                  Session type
                </label>
                <Segmented options={sessionTypes} current={sessionType} setCurrent={setSessionType} />
              </div>

              <HorizontalDivider className="w-full h-px bg-[#EDEDF0] bg-opacity-100" />

              <div className="mb-6">
                <label className="block text-[#2F3037] text-base font-bold mb-2"> Tags </label>
                <Dropdown
                  className="w-full"
                  options={filteredTags}
                  selected={selectedTags}
                  setSelected={setSelectedTags}
                  placeholder="Select Tag"
                />
              </div>

              <div className="flex justify-between">
                <div>
                  <label className="block text-[#2F3037] text-base font-bold mb-2">
                    Questions number
                  </label>
                  <NumberInput count={n_questions} setCount={setN_questions} />
                </div>

                <div className="flex flex-col">
                  <label className="flex justify-end text-[#2F3037] text-base font-bold mb-2 gap-1">
                    Exam mode
                    <Tooltip />
                  </label>
                  <div className="flex justify-end h-fill-available">
                    <TogglerOne isChecked={modeExam} setIsChecked={setEnabled} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse p-6">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                disabled={isSubmitting}
                type="button"
                className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-violet-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
              >
                {
                  isSubmitting && <Spinner size="sm" fillColor="white" />
                }
                {
                  isSubmitting ? <span>Submitting</span> : <span>Create a custom test</span>
                }
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

export default CustomTestModal;
