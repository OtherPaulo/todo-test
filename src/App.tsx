import { PlusCircle, ClipboardText } from "phosphor-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./app.module.css";
import { Header } from "./components/Header";
import { Task } from "./components/Task";

interface TaskType {
  id: string;
  title: string;
  isCompleted: boolean;
}

const data = [
  {
    id: uuidv4(),
    title: "Tarefa 1",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Tarefa 2",
    isCompleted: false,
  },
];

export function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    setTasks(data);
  }, []);

  const handleNewTaskChange = (event: any) => {
    setNewTask(event.target.value);
  };

  const handleCreateTask = (event: any) => {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: newTask,
        isCompleted: false,
      },
    ]);
    setNewTask("");
  };

  const completeTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const totalCompleted = tasks.filter((task) => task.isCompleted).length;

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
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={20} />
          </button>
        </form>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>
              <strong className={styles.createdLabel}>Tarefas criadas</strong>
              <span className={styles.counter}>{tasks.length}</span>
            </div>
            <div>
              <strong className={styles.completedLabel}>Concluídas</strong>
              <span className={styles.counter}>
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
                  onDelete={deleteTask}
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
      </main>
    </>
  );
}
