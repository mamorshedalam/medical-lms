import { Fragment } from "react";
export default function ConfirmModal({ open = true, setOpen, content = "Are you sure you answered this question correctly?", onConfirm = () => { }, onCancel = () => { }, withOutCancel = false }) {
    return (
        <Fragment>
            {open ? (
                <div className="fixed inset-0 flex items-center justify-center p-3 bg-gray-800 bg-opacity-90 backdrop-blur-sm transition-opacity">
                    <div className="mt-20 p-6 border-2 border-gray-200 rounded-lg bg-white text-black sm:w-[400px]">
                        <label
                            htmlFor="matiere"
                            className="block text-sm font-medium leading-6 text-gray-900 text-left"
                        >
                            {content}
                        </label>
                        <div className="mt-4 flex flex-row-reverse gap-2">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onConfirm();
                                }}
                                type="button"
                                className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md bg-primary text-white px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                            >Yes
                            </button>
                            {!withOutCancel && <button
                                onClick={() => {
                                    setOpen(false);
                                    onCancel();
                                }}
                                type="button"
                                className="click-action inline-flex justify-between border border-gray-300 items-center gap-x-1.5 rounded-md  px-2.5 py-1.5 text-sm font-semibol focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:outline-primary-600"
                            >
                                {/* {deleting && <Spinner small />}  */}
                                Cancel
                            </button>}
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
}