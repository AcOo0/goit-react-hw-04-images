import { useEffect } from "react"
import { createPortal } from "react-dom";

import styles from "./modal.module.css"

const modalRoot = document.getElementById("modal-root");

const Modal = ({ close,  children}) => {
    const closeModal = ({target, currentTarget, code}) => {
        if (target === currentTarget || code === "Escape") { 
            close()
        }
    }

    useEffect(() => {
        document.addEventListener("keyup", closeModal);

        return ()=> document.removeEventListener("keyup", closeModal)
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