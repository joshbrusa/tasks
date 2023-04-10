import { useState, useEffect } from "react";
import Task from "../../components/Task";
import PageNavigation from "../../components/PageNavigation";

export default function Tasks() {
  const [page, setPage] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_ORIGIN}/tasks/10/${page}`
        );
        if (res.ok) {
          const tasks = await res.json();
          setTasks(tasks);
        }
      } catch {}
    }
    fetchTasks();
  }, [page]);

  return (
    <>
      <h1>Tasks</h1>
      {tasks.map(
        (task: {
          id: number;
          name: string;
          description: string;
          user: {
            username: string;
          } | null;
        }) => (
          <Task
            key={task.id}
            to={`/tasks/${task.id}`}
            name={task.name}
            description={task.description}
            user={task.user}
          />
        )
      )}
      <PageNavigation page={page} setPage={setPage} />
    </>
  );
}
