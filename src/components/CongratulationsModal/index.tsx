import { CheckCircle } from "phosphor-react";
import { Modal } from "../Modal";
import styles from "./congratulationsModal.module.css";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskTitle: string;
}

export function CongratulationsModal({
    isOpen,
    onClose,
    taskTitle,
}: CongratulationsModalProps) {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    <CheckCircle size={64} />
                </div>

                <h2 className={styles.title}>
                    Parabéns! 🎉
                </h2>

                <p className={styles.message}>
                    Você concluiu a tarefa:
                </p>

                <div className={styles.taskPreview}>
                    "{taskTitle}"
                </div>

                <p className={styles.motivationalText}>
                    Continue assim! Cada tarefa concluída é um passo em direção aos seus objetivos.
                </p>

                <button className={styles.closeButton} onClick={onClose}>
                    Continuar
                </button>
            </div>
        </Modal>
    )
}