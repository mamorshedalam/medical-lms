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
import EditTagModal from '../modals/library/EditTagModal';
import AddDPsModal from '../modals/library/AddDPsModal';
import EditDPsModal from '../modals/library/EditDPsModal';
import { useRouter } from 'next/navigation';

const DPSComponent = () => {
    const router = useRouter();

    const authHttpClient = useAuthHttpClient();
    const [openNewModal, setOpenNewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [depsData, setDpsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isRendering, setIsRendering] = useState(true);

    const filteringData =
        searchKeyword === ""
            ? depsData
            : depsData.filter(({ name }) =>
                name.toLowerCase().includes(searchKeyword.toLowerCase())
            );

    useEffect(() => {
        const fetchData = async () => {
            if (authHttpClient) {
                setIsLoading(true);
                try {
                    const response = await authHttpClient.get(`/dp`);
                    setDpsData(response.data.data);
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

    const handleDeleteDPs = async (e) => {
        setDeleting(true);
        try {
            await authHttpClient.delete(`/dp/${selectedData._id}`);
            setDeleting(false);
            setOpenDeleteModal(false);
            Toaster(ToastType.SUCCESS, "DPs deleted successfully!");
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
        { title: "Matiere", id: 2 },
        { title: "Item", id: 3 },
        { title: "Session", id: 4 },
        { title: "Description", id: 5 },
        { title: "Action", id: 6 },
    ]
    return (
        <div className="">
            <div className="inline-block min-w-full align-middle">
                <LibraryHeader buttonTitle="Add New DP" searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} buttonClick={() => router.push('/library/addDP')}
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
                        {filteringData && filteringData.map((dp) => (
                            <tr key={dp._id} className="even:bg-gray-50">
                                <td className="font-extrabold py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6 gap-2">
                                    {dp.dp_number}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                    <div className="flex flex-wrap">
                                        {dp.matieres.map((matiere) => (
                                            <div
                                                key={matiere._id}
                                                className="px-2 m-1 max-w-fit border border-gray-400 rounded-md text-[12px]"
                                            >
                                                {matiere.name}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500">
                                    <div className="flex flex-wrap">
                                        {dp.items.map((item) => (
                                            <div
                                                key={item._id}
                                                className="px-2 m-1 max-w-fit border border-gray-400 rounded-md text-[12px]"
                                            >
                                                {`${item.item_number}. ${item.name}`}
                                            </div>
                                        ))}
                                    </div>
                                </td>

                                <td className=" px-3 py-4 text-sm text-gray-500">
                                    {dp.session_id?.name}
                                </td>
                                <td className=" px-3 py-4 text-sm text-gray-500 w-1/4 whitespace-nowrap  max-w-xs flex-auto truncate ">
                                    {dp.desc}
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
                                    {/* <button
                                        onClick={() => {
                                            editDP(dp._id);
                                        }}
                                        className="text-violet-600 hover:text-violet-900"
                                    >
                                        <PencilSquareIcon className="w-5 h-5 stroke-2" />
                                    </button> */}
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

export default DPSComponent;
