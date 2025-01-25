
const { useState } = require("react");
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
const AddNewItemModal = ({ openModal, setOpenModal }) => {
    const authHttpClient = useAuthHttpClient();
    const [libraryState, setLibraryState] = useAtom(libraryAtom);

    const [query, setQuery] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [selectedMatiere, setSelectedMatiere] = useState(null);
    const [itemObject, setItemObject] = useState({
        item_number: "",
        name: ""
    });

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const [objects, setObjects] = useState([
        {
            title: "",
            isRankA: true,
        },
    ]);

    const filteredMatieres =
        query === ""
            ? libraryState?.materialsAtom
            : libraryState.materialsAtom.filter((matiere) => {
                return matiere.name.toLowerCase().includes(query.toLowerCase());
            });

    const handleSubmit = async (e) => {
        setIsUploading(true);
        try {
            const updatedData = { ...itemObject, matiere_id: selectedMatiere._id, n_questions: 0, objects }
            const response = await authHttpClient.post("/item", updatedData);
            Toaster(ToastType.SUCCESS, "Items added successfully!!!");
            setIsUploading(false);
            setOpenModal(false);
            setQuery("");
            setItemObject({
                item_number: "",
                name: ""
            });
            setSelectedMatiere(null);
            setObjects([{
                title: "",
                isRankA: true,
            }]);
            updateLibraryState({
                isRenderingData: true
            });
        } catch (error) {
            setIsUploading(false);
            console.log(error);
        }
    };

    const handleInputChange = (name, value) => {
        setItemObject({
            ...itemObject,
            [name]: value
        });
    };

    return (
        <Modal title="Add Items" size="md" open={openModal} setOpen={setOpenModal}>
            <div className="text-black">
                <Combobox
                    as="div"
                    value={selectedMatiere}
                    onChange={setSelectedMatiere}
                >
                    <Combobox.Label className="text-left block text-sm font-medium leading-6 text-gray-900">
                        Select Matiere
                    </Combobox.Label>
                    <div className="relative mt-2">
                        <Combobox.Input
                            className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2  bg-white  capitalize"
                            onChange={(event) => setQuery(event.target.value)}
                            displayValue={(matiere) => matiere?.name}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>

                        {filteredMatieres.length > 0 && (
                            <Combobox.Options className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white text-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredMatieres.map((matiere) => (
                                    <Combobox.Option
                                        key={matiere._id}
                                        value={matiere}
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
                                                            active ? "text-white" : "text-primary-600"
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
                <label
                    htmlFor="item"
                    className="mt-2 block text-sm font-medium leading-6 text-gray-900 text-left"
                >
                    Item
                </label>
                <div className="my-2 flex gap-2">
                    <div className="w-1/3">
                        <Input
                            name="item_number"
                            label=""
                            type="text"
                            value={itemObject.item_number}
                            inputChange={handleInputChange}
                            isRequired={false}
                            placeholder="Number"
                        />
                    </div>
                    <div className="w-2/3">
                        <Input
                            name="name"
                            label=""
                            type="text"
                            value={itemObject.name}
                            inputChange={handleInputChange}
                            isRequired={false}
                            placeholder="Name"
                        />
                    </div>
                </div>
                <label
                    htmlFor="item"
                    className="mt-2 block text-sm font-medium leading-6 text-gray-900 text-left"
                >
                    Item Objects
                </label>
                {objects.map((object, idx) => (
                    <ItemObjectInput
                        object={object}
                        setObjects={setObjects}
                        last={idx === objects.length - 1}
                        index={idx}
                        key={idx}
                    />
                ))}
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
            </div>
        </Modal>
    );
};


function ItemObjectInput({ index, object, setObjects, last, deleteAction }) {
    const switchIsRankA = (isRankA) => {
        setObjects((objects) =>
            objects.map((object, idx) => {
                if (index === idx) object.isRankA = isRankA;
                return object;
            })
        );
    };
    return (
        <div className="my-2">
            <div className="flex justify-between items-center">
                <div className="ml-4 flex gap-2 justify-center text-sm items-center">
                    <span>Rang A</span>
                    <Switch
                        checked={object.isRankA}
                        onChange={switchIsRankA}
                        className="bg-violet-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
                    >
                        <span
                            aria-hidden="true"
                            className={classNames(
                                !object.isRankA ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                        />
                    </Switch>
                    <span>B</span>
                </div>
                <div
                    onClick={() => {
                        if (last) {
                            console.log("Last");
                            setObjects((objects) => {
                                return [
                                    ...objects,
                                    {
                                        title: "",
                                        isRankA: true,
                                    },
                                ];
                            });
                        } else {
                            setObjects((objects) => {
                                return objects.filter((object, idx) => {
                                    return index !== idx;
                                });
                            });
                        }
                    }}
                    className="click-action hover:outline hover:outline-2 outline-primary-600 rounded-lg hover:cursor-pointer"
                >
                    {last ? (
                        <PlusIcon className="w-6 h-6" />
                    ) : (
                        <XMarkIcon className="w-6 h-6" />
                    )}
                </div>
            </div>
            <div className="text-left my-2 first:focus:border-primary-600">
                <input
                    type="text"
                    name="item"
                    id="item"
                    autoComplete="item"
                    className="shadow-sm border-[1px] border-gray-300 text-gray-900 sm:text-sm rounded-md input-transition focus:outline-none focus:ring-0 focus:border-violet-600 block w-full p-3 my-2  bg-white  capitalize"
                    value={object.title}
                    onChange={(e) => {
                        setObjects((objects) =>
                            objects.map((object, idx) => {
                                if (index === idx) object.title = e.target.value;
                                return object;
                            })
                        );
                    }}
                />
            </div>
        </div>
    );
}


export default AddNewItemModal;
