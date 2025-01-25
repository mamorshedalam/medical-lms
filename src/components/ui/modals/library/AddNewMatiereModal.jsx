
const { default: useAuthHttpClient } = require("@/hooks/useAuthHttpClient");
const { useState } = require("react");
import { PhotoIcon } from "@heroicons/react/24/outline";
import Modal from "../index";
import Spinner from "../../spinner";
import Input from "../../input";
import { updateLibraryState } from "@/store/store";
import { Toaster, ToastType } from "../../toaster";

const AddNewMatiereModal = ({ openNewMatiereModal, setOpenNewMatiereModal }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [imageBuffer, setImageBuffer] = useState();
    const [name, setName] = useState("");
    const authHttpClient = useAuthHttpClient();

    const handleSubmit = async (e) => {
        console.log("click to submit")
        setIsUploading(true);
        try {
            const response = await authHttpClient.post("/matiere", {
                name,
                image: imageBuffer,
            });
            if (response) {
                Toaster(ToastType.SUCCESS, "Matiere added successfully!!!");
                setIsUploading(false);
                setOpenNewMatiereModal(false);
                setName("");
                setImageBuffer(null)
                updateLibraryState({
                    isRenderingData: true
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const convert = (e) => {
        // setFiles(e.target.files);
        if (e.target.files[0].size > 2000000) {
            console.log("File too large");
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            setImageBuffer(reader.result);
            console.log(typeof reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    const handleInputChange = (name, value) => {
        setName(value);
    };

    return (
        <Modal title="Add Matiere" size="sm" open={openNewMatiereModal} setOpen={setOpenNewMatiereModal}>
            <div className="">
                <Input
                    name="matiere"
                    label="Matiere Name"
                    type="text"
                    value={name}
                    inputChange={handleInputChange}
                    isRequired={true}
                    placeholder="Enter Matiere Name"
                />
                <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900 text-left"
                >
                    Matiere Image
                </label>
                <div className="flex flex-col gap-2 justify-center items-center">
                    {imageBuffer ? (
                        <img
                            className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 h-32"
                            alt="Matiere"
                            src={imageBuffer}
                        />
                    ) : (
                        <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 w-60 h-32">
                            <PhotoIcon
                                className="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                            />
                        </div>
                    )}
                    <div className="flex text-sm leading-6 text-gray-600">
                        <label
                            htmlFor="file-upload"
                            className="relative h-fit cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 hover:text-primary-500 px-2"
                        >
                            <span>Upload an image file</span>
                            <input
                                accept="image/*"
                                onChange={convert}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                            />
                        </label>
                    </div>
                </div>
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
                            isUploading ? <span>Submitting</span> : <span>Add Matiere</span>
                        }
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AddNewMatiereModal;
