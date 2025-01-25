import useAuthHttpClient from '@/hooks/useAuthHttpClient';
import { useData } from '@/providers/learningDataProvider';
import { ChatBubbleLeftIcon, EllipsisVerticalIcon, ListBulletIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import LibraryHeader from '../libraryHeader';
import AddTagModal from '../modals/library/AddTagModal';
import VerticalDivider from '../vertical-divider';
import EditIcon from '@/assets/icons/edit';
import DeleteModal from '../modals/deleteModal';
import { Toaster, ToastType } from '../toaster';
import AddDPsModal from '../modals/library/AddDPsModal';
import EditDPsModal from '../modals/library/EditDPsModal';
import { useRouter } from 'next/navigation';

const QuestionsComponent = () => {
    const router = useRouter();

    const authHttpClient = useAuthHttpClient();
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [questionData, setQuestionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isRendering, setIsRendering] = useState(true);

    const [matieres, setMatieres] = useState([]);
    const [items, setItems] = useState([]);
    const [sessions, setSessions] = useState([]);

    const filteringData =
        searchKeyword === ""
            ? questionData
            : questionData.filter(({ question }) =>
                question.toLowerCase().includes(searchKeyword.toLowerCase())
            );

    useEffect(() => {
        const fetchData = async () => {
            if (authHttpClient) {
                setIsLoading(true);
                try {
                    const response = await authHttpClient.get(`/question`);
                    setQuestionData(response.data.data);
                    setIsLoading(false);
                    setIsRendering(false)
                } catch (err) {
                    console.log(err);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        if (isRendering) {
            fetchData();
        }
    }, [isRendering]);


    useEffect(() => {
        const fetchData = async () => {
            if (authHttpClient) {
                setIsLoading(true);
                try {
                    const [fetchMatiere, fetchItem, fetchSession] = await Promise.all([
                        authHttpClient.get("/matiere"),
                        authHttpClient.get("/item"),
                        authHttpClient.get("/session"),
                    ]);
                    setMatieres(fetchMatiere.data.data);
                    setItems(fetchItem.data.data);
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

    const handleDeleteDPs = async (e) => {
        setDeleting(true);
        try {
            await authHttpClient.delete(`/question/${selectedData._id}`);
            setDeleting(false);
            setOpenDeleteModal(false);
            Toaster(ToastType.SUCCESS, "Question deleted successfully!");
            setIsRendering(true);
            updateLibraryState({
                isRenderingData: true
            });
        } catch (error) {
            console.log(error);
        }
    };

    const editDP = (id) => {
        router.push(`/library/editDP/${id}`);
    };

    const columnData = [
        { title: "ID", id: 1 },
        { title: "Question", id: 2 },
        { title: "Matiere", id: 3 },
        { title: "Item", id: 4 },
        { title: "Session", id: 5 },
        { title: "Action", id: 6 },
    ]
    return (
        <div className="">
            <div className="inline-block min-w-full align-middle">
                <LibraryHeader buttonTitle="Add New Question" searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} buttonClick={() => router.push('/library/addQuestion')}
                />
                <table className="my-4 min-w-full shadow-card rounded-lg bg-white text-black">
                    <thead className="divide-y divide-gray-200 bg-white rounded">
                        <tr>
                            {
                                columnData.map(({ title, id }) => (
                                    <th
                                        key={id}
                                        scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6 gap-2"
                                    >
                                        {title}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {filteringData && filteringData.map((question) => (
                            <tr key={question._id} className="even:bg-gray-50">
                                <td className="font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 gap-2">
                                    {question.question_number}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                    {question.question}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                    {
                                        matieres.find(({ _id }) => _id === question.matiere_id)
                                            ?.name
                                    }
                                </td>

                                <td className=" px-3 py-4 text-sm text-gray-500">
                                    {question.item_id &&
                                        `${items.find(({ _id }) => _id === question.item_id)
                                            ?.item_number
                                        }. ${items.find(({ _id }) => _id === question.item_id)
                                            ?.name
                                        }`}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500 w-1/4 whitespace-nowrap  max-w-xs flex-auto truncate ">
                                    {question.session_id && (
                                        <div
                                            key={question.session_id}
                                            className="px-2 m-1 max-w-fit border border-gray-400 rounded-md text-[12px]"
                                        >
                                            {
                                                sessions.find(
                                                    ({ _id }) => _id === question.session_id
                                                )?.name
                                            }
                                        </div>
                                    )}
                                </td>


                                <td className="inline-flex gap-2 text-sm font-medium sm:pr-6">
                                    <button
                                        href="#"
                                        onClick={() => {
                                            setSelectedData(dp);
                                            setOpenDeleteModal(true);
                                        }}
                                        className="text-red-600 hover:text-violet-900"
                                    >
                                        <TrashIcon className="w-5 h-5 stroke-2" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            editDP(dp._id);
                                        }}
                                        className="text-violet-600 hover:text-violet-900"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 stroke-2" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddDPsModal
                setIsRendering={setIsRendering}
                openModal={openNewModal}
                setOpenModal={setOpenNewModal}
            />
            <DeleteModal
                title="DPs"
                openModal={openDeleteModal}
                setOpenModal={setOpenDeleteModal}
                isDeleting={deleting}
                handleDelete={handleDeleteDPs}
            />
            <EditDPsModal
                currentTag={selectedData}
                openModal={openEditModal}
                setIsRendering={setIsRendering}
                setOpenModal={setOpenEditModal}
            />
        </div>
    );
};

export default QuestionsComponent;
