import useAuthHttpClient from '@/hooks/useAuthHttpClient';
import { useData } from '@/providers/learningDataProvider';
import { ChatBubbleLeftIcon, EllipsisVerticalIcon, ListBulletIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import LibraryHeader from '../libraryHeader';
import AddTagModal from '../modals/library/AddTagModal';
import VerticalDivider from '../vertical-divider';
import EditIcon from '@/assets/icons/edit';
import DeleteModal from '../modals/deleteModal';
import { Toaster, ToastType } from '../toaster';
import EditTagModal from '../modals/library/EditTagModal';
import { updateLibraryState } from '@/store/store';

const Tags = () => {
    const authHttpClient = useAuthHttpClient();
    const [openNewTagModal, setOpenNewTagModal] = useState(false);
    const [openEditTagModal, setOpenEditTagModal] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagData, setTagData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [isRendering, setIsRendering] = useState(true);

    const filterTags =
        searchKeyword === ""
            ? tagData
            : tagData.filter(({ name }) =>
                name.toLowerCase().includes(searchKeyword.toLowerCase())
            );

    useEffect(() => {
        const fetchData = async () => {
            if (authHttpClient) {
                setIsLoading(true);
                try {
                    const response = await authHttpClient.get(`/tag`);
                    updateLibraryState({
                        tagsAtom: response.data.data,
                        isRenderingData: false
                    });
                    setTagData(response.data.data);
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
            await authHttpClient.delete(`/tag/${selectedTag._id}`);
            setDeleting(false);
            setOpenDeleteModal(false);
            Toaster(ToastType.SUCCESS, "Tag deleted successfully!");
            setIsRendering(true);
            updateLibraryState({
                isRenderingData: true
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="">
            <div className="inline-block min-w-full align-middle">
                <LibraryHeader buttonTitle="Add Tag" searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} buttonClick={() => setOpenNewTagModal(true)}
                />
                {filterTags.map((tag, index) => (
                    <EditableTag
                        index={index}
                        tag={tag}
                        editAction={() => {
                            setSelectedTag(tag);
                            setOpenEditTagModal(true);
                        }}
                        deleteAction={() => {
                            setSelectedTag(tag);
                            setOpenDeleteModal(true);
                        }}
                    />
                ))}
            </div>
            <AddTagModal
                setIsRendering={setIsRendering}
                openModal={openNewTagModal}
                setOpenModal={setOpenNewTagModal}
            />
            <DeleteModal
                title="Tag"
                openModal={openDeleteModal}
                setOpenModal={setOpenDeleteModal}
                isDeleting={deleting}
                handleDelete={handleDeleteItem}
            />
            <EditTagModal
                currentTag={selectedTag}
                openModal={openEditTagModal}
                setIsRendering={setIsRendering}
                setOpenModal={setOpenEditTagModal}
            />
        </div>
    );
};


function EditableTag({ tag, index, editAction, deleteAction }) {
    return (
        <div className="flex items-center my-2 px-12 pt-3 pb-4 shadow-card rounded-lg bg-white text-black">
            <div className="flex justify-between gap-2 flex-1">
                <div>
                    <h3 className="font-manrope font-bold capitalize">
                        {tag.name}
                    </h3>
                    <p> {tag.desc}</p>
                </div>

                <div className="flex items-center gap-2">
                    <ListBulletIcon />
                    <span className="font-manrope inline text-xs text-[#85868E]">
                        {tag.n_questions} Questions
                    </span>
                </div>
            </div>

            <VerticalDivider className="!h-[58px] mx-8" />
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
        </div>
    );
}
export default Tags;
