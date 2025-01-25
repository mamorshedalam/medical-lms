
import Spinner from "../spinner";
import Modal from "./index";
const DeleteModal = ({title, openModal, setOpenModal, isDeleting, handleDelete }) => {
    return (
        <Modal title="Delete Confirmation" size="sm" open={openModal} setOpen={setOpenModal} isShowHeader={false}>
            <label
                htmlFor="matiere"
                className="block text-sm font-medium leading-6 text-gray-900 text-left"
            >
                Do you really want to delete this {title}?
            </label>
            <div className="mt-4 flex flex-row-reverse">
                <button
                    onClick={handleDelete}
                    type="button"
                    disabled={isDeleting}
                    className="click-action inline-flex justify-between items-center border border-gray-300 gap-x-1.5 rounded-md bg-violet-600 text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                >
                    {
                        isDeleting && <Spinner size="sm" fillColor="white" />
                    }
                    {
                       isDeleting ? <span>Deleting</span> : <span>Delete</span>
                    }
                </button>
            </div>
        </Modal>
    );
};

export default DeleteModal;
