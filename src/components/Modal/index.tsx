import { X } from "phosphor-react";
import { ReactNode } from "react";
import styles from "./modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}
export function Modal ({ isOpen, onClose, children}: ModalProps) {
    if (!isOpen) return null;
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    )

}