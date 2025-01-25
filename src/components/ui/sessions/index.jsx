import useAuthHttpClient from '@/hooks/useAuthHttpClient';
import * as cn from "classnames";
import { ArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import LibraryHeader from '../libraryHeader';
import VerticalDivider from '../vertical-divider';
import EditIcon from '@/assets/icons/edit';
import DeleteModal from '../modals/deleteModal';
import { Toaster, ToastType } from '../toaster';
import EditTagModal from '../modals/library/EditTagModal';
import AddSessionModal from '../modals/library/AddSessionModal';
import ListIcon from '@/assets/icons/list-icon';
import ChatIcon from '@/assets/icons/chart-icon';
import { useAuth } from '@/providers/authProvider';
import { Collapse } from 'react-collapse';
import AngleDown from '@/assets/icons/angle-down';
import EditSessionModal from '../modals/library/EditSessionModal';

const Sessions = () => {
    const authHttpClient = useAuthHttpClient();
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [sessionData, setSessionData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isRendering, setIsRendering] = useState(true);

    const filterData =
        searchKeyword === ""
            ? sessionData
            : sessionData.filter(({ name }) =>
                name.toLowerCase().includes(searchKeyword.toLowerCase())
            );

    useEffect(() => {
        const fetchData = async () => {
            if (authHttpClient) {
                setIsLoading(true);
                try {
                    const response = await authHttpClient.get(`/session`);
                    setSessionData(response.data.data);
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

    const handleDeleteItem = async (e) => {
        setDeleting(true);
        try {
            await authHttpClient.delete(`/session/${selectedData._id}`);
            setDeleting(false);
            setOpenDeleteModal(false);
            Toaster(ToastType.SUCCESS, "Session deleted successfully!");
            setIsRendering(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="">
            <div className="inline-block min-w-full align-middle">
                <LibraryHeader buttonTitle="Add Session" searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} buttonClick={() => setOpenNewModal(true)}
                />
                {filterData.map((session, index) => (
                    <EditableTag
                        index={index}
                        session={session}
                        editAction={() => {
                            setSelectedData(session);
                            setOpenEditModal(true);
                        }}
                        deleteAction={() => {
                            setSelectedData(session);
                            setOpenDeleteModal(true);
                        }}
                    />
                ))}
            </div>
            <AddSessionModal
                setIsRendering={setIsRendering}
                openModal={openNewModal}
                setOpenModal={setOpenNewModal}
            />
            <DeleteModal
                title="Session"
                openModal={openDeleteModal}
                setOpenModal={setOpenDeleteModal}
                isDeleting={deleting}
                handleDelete={handleDeleteItem}
            />
            <EditSessionModal
                currentData={selectedData}
                openModal={openEditModal}
                setIsRendering={setIsRendering}
                setOpenModal={setOpenEditModal}
            />
        </div>
    );
};


function EditableTag({ session, index, editAction, deleteAction }) {
    const [expanded, setExpanded] = useState(false);
    const { user } = useAuth();

    return (
        <div className="shadow-card rounded-lg my-2">
            <div className="flex items-center gap-4 px-5 py-2 bg-white text-black rounded-t-lg">
                <div className="flex flex-col justify-center flex-1 gap-2">
                    <h3 className="w-full font-manrope font-extrabold capitalize">{session.name}</h3>
                    {/* <ProgressBar percent={completed} /> */}
                </div>
                <VerticalDivider className="!h-16 mx-6" />
                <div className="flex px-5 py-2 bg-[#FAFAFA] rounded-md">
                    <div className="flex flex-col justify-center items-center">
                        <ChatIcon />
                        <span className="mt-2 text-xs text-[#2F3037] font-manrope font-bold leading-none">
                            {session.n_dps}
                        </span>
                        <span className="text-xs text-[#C8C9CE] font-manrope">
                            DPS
                        </span>
                    </div>
                    <div className="px-6">
                        <VerticalDivider className="h-12" />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <ListIcon />
                        <span className="mt-2 text-xs text-[#2F3037] font-manrope font-bold leading-none">
                            {session.n_questions}
                        </span>
                        <span className="text-xs text-[#C8C9CE] font-manrope">
                            questions
                        </span>
                    </div>
                </div>
                {
                    user && user.role === "admin" && (
                        <>
                            <div className="flex gap-5">
                                <button onClick={editAction} className="group">
                                    <EditIcon className="w-7 h-7" />
                                </button>
                                <button
                                    onClick={deleteAction}
                                    className="group">
                                    <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </>
                    )
                }

            </div>
            <div className="bg-[#FCFCFD] border-t">
                <Collapse
                    isOpened={expanded}
                    initialStyle={{ height: 0, overflow: "hidden" }}
                >
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 flex items-center gap-2"
                                >
                                    <div>Invoice</div>
                                    <ArrowDownIcon className="w-4 h-4" />
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Last Assessed
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Item
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Matières
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                    Last score
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Test</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {session.dps?.map((dp) => (
                                <tr key={dp.dp_number} className="even:bg-gray-50">
                                    <td className="whitespace-wrap font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 flex items-center gap-2">
                                        {dp.title}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {dp.lastAssessed}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {dp.item && <Label>{dp.item}</Label>}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {dp.matiere}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {dp.lastScore && `${dp.lastScore}/20`}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <Link
                                            // to="/quiz"
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 stroke-2" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Collapse>
            </div>
            <div className="flex items-center h-14 px-4 bg-[#FAFAFA] rounded-b-lg">
                <button
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                >
                    <span
                        className={cn({
                            "transition-all duration-300": true,
                            "rotate-180": expanded,
                        })}
                    >
                        <AngleDown />
                    </span>
                    <span className="ml-4 font-inter font-medium text-sm text-[#85868E]">
                        Détails
                    </span>
                </button>
            </div>
        </div >
    );
}
export default Sessions;
