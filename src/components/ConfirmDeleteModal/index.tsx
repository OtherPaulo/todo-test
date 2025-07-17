import { Trash, Warning } from "phosphor-react";
import { Modal } from "../Modal";
import styles from "./confirmDeleteModal.module.css";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
    onConfirm: () => void;
    taskTitle: string;
}

export function ConfirmDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    taskTitle,
}: ConfirmDeleteModalProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <Warning size={48} />
                </div>

            <h2 className={styles.title}>
                Confirmar exclusão
            </h2>

            <p className={styles.message}>
                Você tem certeza que deseja excluir a tarefa?
            </p>

            <div className={styles.taskPreview}>
                "{taskTitle}"
            </div>

            <p className={styles.warning}>
                Esta ação não pode ser desfeita.
            </p>

            <div className={styles.actions}>
                <button className={styles.cancelButton} onClick={onClose}>
                    Cancelar
                </button>
                <button className={styles.confirmButton} onClick={handleConfirm}>
                    <Trash size={16} />
                    Excluir
                </button>
            </div>
            </div>
        </Modal>
    );
}