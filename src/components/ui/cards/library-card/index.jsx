import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import AddNewCardSlide from "./AddNewCardSlide";
import useAuthHttpClient from "@/hooks/useAuthHttpClient";
import LibraryHeader from "../../libraryHeader";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/providers/authProvider";
import { Toaster, ToastType } from "../../toaster";
import DeleteModal from "../../modals/deleteModal";
import EditCardSlide from "./EditCardSlide";

export default function Cards() {
    const authHttpClient = useAuthHttpClient();
    const { user } = useAuth();

    const [cardData, setCardData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [isRendering, setIsRendering] = useState(true);
    const [deleting, setDeleting] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const filterCards =
        searchText === ""
            ? cardData
            : cardData.filter(({ name }) =>
                name.toLowerCase().includes(searchText.toLowerCase())
            );
    const [openNewCardSlide, setOpenNewCardSlide] = useState(false);
    const [openEditCardSlide, setOpenEditCardSlide] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (authHttpClient) {
                setIsLoading(true);
                try {
                    const response = await authHttpClient.get(`/card/withOutContent`);
                    setCardData(response.data.data);
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

    const handleDeleteCardItem = async (e) => {
        setDeleting(true);
        try {
            await authHttpClient.delete(`/card/${selectedCard._id}`);
            setDeleting(false);
            setOpenDeleteModal(false);
            Toaster(ToastType.SUCCESS, "Card deleted successfully!");
            setIsRendering(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="">
                <LibraryHeader buttonTitle="Add New Card" searchKeyword={searchText} setSearchKeyword={setSearchText} buttonClick={() => setOpenNewCardSlide(true)} />

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filterCards.map((card) => (
                        <div className="relative group border-2 rounded-lg h-auto min-h-[200px] bg-white text-black p-5 hover:shadow-lg hover:shadow-gray-300 click-action ">
                            <div className="text-2xl font-extrabold capitalize"> {card.name} </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {card.items.map((item) => (
                                    <div className="px-2 py-1 border bg-violet-200 border-violet-600 rounded-md text-[12px]">
                                        {item.item_number}. {item.name}
                                    </div>
                                ))}
                            </div>
                            <div className="flex-1 flex-wrap ">{card.def}</div>
                            {
                                user && user.role === "admin" && (
                                    <div className="absolute right-3 bottom-3 flex items-center justify-end gap-3 mt-2">
                                        <button
                                            onClick={() => {
                                                setSelectedCard(card);
                                                setOpenEditCardSlide(true);
                                            }}
                                            type="button"
                                            className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                                        >
                                            Edit
                                            <Bars3Icon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedCard(card);
                                                setOpenDeleteModal(true);
                                            }}
                                            type="button"
                                            className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                                        >
                                            Delete
                                            <TrashIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>

            </div>
            <AddNewCardSlide
                open={openNewCardSlide}
                setOpen={setOpenNewCardSlide}
                setCards={setCardData}
            />
            <EditCardSlide
                open={openEditCardSlide}
                setOpen={setOpenEditCardSlide}
                setCards={setCardData}
                selectedCard={selectedCard}
                setIsRendering={setIsRendering}
            />
            <DeleteModal
                title="Card"
                openModal={openDeleteModal}
                setOpenModal={setOpenDeleteModal}
                isDeleting={deleting}
                handleDelete={handleDeleteCardItem}
            />
        </>
    );
}
