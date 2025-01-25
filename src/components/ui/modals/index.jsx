import React, { Fragment } from "react";

/**
 * Modal component for displaying content in a customizable modal dialog
 * 
 * @param {Object} props - Component properties
 * @param {string} props.title - Title of the modal
 * @param {boolean} props.open - Controls the visibility of the modal
 * @param {function} props.setOpen - Function to toggle modal visibility
 * @param {React.ReactNode} props.children - Content to be rendered inside the modal
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - Size of the modal
 * @returns {React.ReactElement} Modal component
 */
const Modal = ({
    title,
    open,
    setOpen,
    children,
    size = 'md',
    isShowHeader = true
}) => {
    // Modal width configurations
    const sizeWidths = {
        'sm': 'w-full md:max-w-[400px]',
        'md': 'w-full md:max-w-[700px]',
        'lg': 'w-full md:max-w-[1000px]',
        'xl': 'w-full md:max-w-[1200px]'
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Fragment>
            {open ? (
                <div className="fixed inset-0 flex items-center justify-center p-3">
                    <div
                        onClick={handleClose}
                        className="absolute inset-0 bg-black bg-opacity-50"
                    />
                    <div className={`bg-white rounded-lg shadow-lg ${sizeWidths[size]} z-10`}>
                        {
                            isShowHeader && (
                                <div className="flex p-5 justify-between items-center border-b">
                                    <h2 className="w-full text-xl font-manrope font-extrabold text-black">
                                        {title}
                                    </h2>

                                    <button
                                        onClick={handleClose}
                                        className="text-gray-400 hover:text-gray-600 transition-all"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )
                        }

                        <div className="p-6">
                            {children}
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default Modal;
