import { PlusCircle, ClipboardText } from "phosphor-react";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ConfirmDeleteModal } from "./components/ConfirmDeleteModal";
import { CongratulationsModal } from "./components/CongratulationsModal";

interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>("todo-tasks", []);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    taskId: string;
    taskTitle: string;
  }>({
    isOpen: false,
    taskId: "",
    taskTitle: "",
  });
  
  const [congratsModal, setCongratsModal] = useState<{
    isOpen: boolean;
    taskTitle: string;
  }>({
    isOpen: false,
    taskTitle: "",
  });

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleCreateTask = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTask = newTask.trim();

    if (trimmedTask === "") {
      setErrorMessage("Por favor, digite uma tarefa antes de criar.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    const newTaskObj: TaskType = {
      id: uuidv4(),
      title: trimmedTask,
      isCompleted: false,
    };

    setTasks(prevTasks => [...prevTasks, newTaskObj]);
    setNewTask("");
  };

  const completeTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    
    if (task && !task.isCompleted) {
      setCongratsModal({
        isOpen: true,
        taskTitle: task.title,
      });
    }
    
    setTasks(prevTasks =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteModal({
      isOpen: true,
      taskId: id,
      taskTitle: title,
    });
  };

  const confirmDelete = () => {
    setTasks(prevTasks => prevTasks.filter((task) => task.id !== deleteModal.taskId));
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      taskId: "",
      taskTitle: "",
    });
  };

  const closeCongratsModal = () => {
    setCongratsModal({
      isOpen: false,
      taskTitle: "",
    });
  };

  const totalCompleted = useMemo(() => {
    return tasks.filter((task) => task.isCompleted).length;
  }, [tasks]);

  const isButtonDisabled = newTask.trim() === "";

  return (
    <>
      <Header />
      <main className={styles.wrapper}>
        <form className={styles.newText} onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma tarefa"
            value={newTask}
            onChange={handleNewTaskChange}
          />
          <button 
            type="submit" 
            disabled={isButtonDisabled}
            className={isButtonDisabled ? styles.buttonDisabled : ''}
          >
            Criar
            <PlusCircle size={20} />
          </button>
        </form>

        {errorMessage && (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <strong>Tarefas criadas</strong>
              <span>{tasks.length}</span>
            </div>
            <div>
              <strong>Concluídas</strong>
              <span>
                {totalCompleted} de {tasks.length}
              </span>
            </div>
          </div>
          <div className={styles.contentBox}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  checked={task.isCompleted}
                  title={task.title}
                  onComplete={completeTask}
                  onDelete={handleDeleteClick}
                />
              ))
            ) : (
              <>
                <ClipboardText size={56} />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <small>Crie tarefas e organize seus itens a fazer</small>
              </>
            )}
          </div>
        </div>

        <ConfirmDeleteModal
          isOpen={deleteModal.isOpen}
          onClose={closeDeleteModal}
          onConfirm={confirmDelete}
          taskTitle={deleteModal.taskTitle}
        />

        <CongratulationsModal
          isOpen={congratsModal.isOpen}
          onClose={closeCongratsModal}
          taskTitle={congratsModal.taskTitle}
        />
      </main>
    </>
  );
}
