import { useState } from "react";
import Modal from "../index";
import Spinner from "../../spinner";
import Input from "../../input";
import { updateLibraryState } from "@/store/store";
import { Toaster, ToastType } from "../../toaster";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";

const AddTagModal = ({ openModal, setOpenModal, setIsRendering }) => {
    const authHttpClient = useAuthHttpClient();
    const [isUploading, setIsUploading] = useState(false);
    const [tagObject, setTagObject] = useState({
        name: "",
        desc: ""
    });

    const handleSubmit = async (e) => {
        setIsUploading(true);
        try {
            const response = await authHttpClient.post("/tag", tagObject);
            Toaster(ToastType.SUCCESS, "Tag added successfully!!!");
            setTagObject({
                name: "",
                desc: ""
            });
            updateLibraryState({
                isRenderingData: true
            });
            setIsUploading(false)
            setOpenModal(false)
            setIsRendering(true);
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
                        isUploading ? <span>Submitting</span> : <span>Add Item</span>
                    }
                </button>
            </div>
        </Modal>
    );
};
export default AddTagModal;
