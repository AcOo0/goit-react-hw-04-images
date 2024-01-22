import { useCallback, useEffect } from "react"
import { createPortal } from "react-dom";

import styles from "./modal.module.css"

const modalRoot = document.getElementById("modal-root");

const Modal = ({ close,  children}) => {
    const closeModal = useCallback(({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            close()
        }
    },
        [close]
    );

    useEffect(() => {
        const handleKeyUp = (event) => closeModal(event);
        document.addEventListener("keyup", handleKeyUp);

        return ()=> document.removeEventListener("keyup", handleKeyUp)
    }, [closeModal])

    return createPortal(
            (<div onClick={closeModal} className={styles.overlay} >
            <div className={styles.modal}>
                {children}
            </div>
            </div>),
            modalRoot
        )        
}

export default Modal;