import { useState } from "react";
import Modal from "../index";
import Spinner from "../../spinner";
import Input from "../../input";
import { updateLibraryState } from "@/store/store";
import { Toaster, ToastType } from "../../toaster";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";

const AddSessionModal = ({ openModal, setOpenModal, setIsRendering }) => {
    const authHttpClient = useAuthHttpClient();
    const [isUploading, setIsUploading] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        setIsUploading(true);
        try {
            const response = await authHttpClient.post("/session", { name });
            Toaster(ToastType.SUCCESS, "Session added successfully!!!");
            setName("")
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
        setName(value)
    };

    return (
        <Modal title="Add Tag" size="md" open={openModal} setOpen={setOpenModal}>
            <Input
                name="name"
                label="New Session"
                type="text"
                value={name}
                inputChange={handleInputChange}
                isRequired={false}
                placeholder="Title"
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
                        isUploading ? <span>Submitting</span> : <span>Add Session</span>
                    }
                </button>
            </div>
        </Modal>
    );
};
export default AddSessionModal;
