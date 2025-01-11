import { useToast } from "../../utils/toast/ToastContext"
import styles from './ToastView.module.css'
import { useEffect } from "react";
const ToastView = () => {
    const { getToast} = useToast();
    return (
        <>
            {
                getToast() ?
                    <div className={styles.toastContainer}>
                        <span>{getToast()}</span>
                    </div>
                    :
                    <div></div>
            }
        </>
    )
}
export default ToastView;