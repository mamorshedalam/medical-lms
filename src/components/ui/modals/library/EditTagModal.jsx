
const { useState, useEffect } = require("react");
import { CheckIcon, ChevronUpDownIcon, PhotoIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "../index";
import Spinner from "../../spinner";
import Input from "../../input";
import { libraryAtom, updateLibraryState } from "@/store/store";
import { Toaster, ToastType } from "../../toaster";
import { Combobox, Switch } from "@headlessui/react";
import { useAtom } from "jotai";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const EditTagModal = ({ currentTag, openModal, setOpenModal, setIsRendering }) => {
    const authHttpClient = useAuthHttpClient();
    const [libraryState, setLibraryState] = useAtom(libraryAtom);
    const [isUploading, setIsUploading] = useState(false);
    const [tagObject, setTagObject] = useState({
        name: "",
        desc: ""
    });

    useEffect(() => {
        setTagObject({
            name: currentTag?.name ?? "",
            desc: currentTag?.desc ?? ""
        });
    }, [currentTag]);

    const handleSubmit = async (e) => {
        setIsUploading(true);
        try {
            await authHttpClient.put(`/tag/${currentTag._id}`, tagObject);
            Toaster(ToastType.SUCCESS, "Tag updated successfully!!!");
            setTagObject({
                name: "",
                desc: ""
            });
            updateLibraryState({
                isRenderingData: true
            });
            setIsRendering(true);
            setIsUploading(false)
            setOpenModal(false)
        } catch (error) {
            setIsUploading(false);
            console.log(error);
        }
    };

    const handleInputChange = (name, value) => {
        setTagObject({
            ...tagObject,
            [name]: value
        });
    };

    return (
        <Modal title="Add Tag" size="md" open={openModal} setOpen={setOpenModal}>
            <Input
                name="name"
                label="Title"
                type="text"
                value={tagObject.name}
                inputChange={handleInputChange}
                isRequired={false}
                placeholder="Title"
            />
            <Input
                name="desc"
                label="Description"
                type="text"
                value={tagObject.desc}
                inputChange={handleInputChange}
                isRequired={false}
                placeholder="Description"
            />
            <div className="mt-4 flex flex-row-reverse">
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
                        isUploading ? <span>Submitting</span> : <span>Update Item</span>
                    }
                </button>
            </div>
        </Modal>
    );
};
export default EditTagModal;
