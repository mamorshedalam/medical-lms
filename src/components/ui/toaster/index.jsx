import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS

/**
 * Toast Types
 * Comprehensive list of toast notification types
 */
export const ToastType = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    DEFAULT: 'default'
};

/**
 * Custom Toaster Function
 * Provides flexible toast notification with multiple configuration options
 * 
 * @param {string} type - Type of toast notification
 * @param {string} message - Message to display in toast
 * @param {Object} options - Optional configuration for toast
 * @returns {void}
 */
export const Toaster = (
    type = ToastType.SUCCESS,
    message,
    options = {}
) => {
    const defaultOptions = {
        autoClose: 3000,
        position: 'top-right',
        className: "primaryColor",
        ...options
    };

    switch (type) {
        case ToastType.SUCCESS:
            toast.success(message, defaultOptions);
            break;
        case ToastType.ERROR:
            toast.error(message, defaultOptions);
            break;
        case ToastType.WARNING:
            toast.warning(message, defaultOptions);
            break;
        case ToastType.INFO:
            toast.info(message, defaultOptions);
            break;
        default:
            toast(message, defaultOptions);
    }
};
