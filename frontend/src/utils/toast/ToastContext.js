import { useContext, createContext, useState } from "react";

let ToastContext = createContext({
    getToast: () => {},
    addToast: () => {},
    deleteToast: () => {}
});

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const getToast = () => {
        if (toasts.length > 0) {
            return toasts[0];
        }
        return null;
    };

    // Add a new toast to the array
    const addToast = (val) => {
        setToasts((prevToasts) => [...prevToasts, val]);
    };

    // Delete the first toast from the array
    const deleteToast = (delay) => {
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.slice(1));
        }, delay);
    };

    return (
        <ToastContext.Provider value={{ getToast, addToast, deleteToast }}>
            {children}
        </ToastContext.Provider>
    );
};
