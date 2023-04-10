import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskId from "../../components/TaskId";

export default function TasksId() {
  const [task, setTask] = useState({
    name: "",
    description: "",
    user: { username: "" },
  });
  const { id } = useParams();

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_ORIGIN}/tasks/${id}`
        );
        if (res.ok) {
          const task = await res.json();
          setTask(task);
        }
      } catch {}
    }
    fetchTask();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <TaskId
        name={task.name}
        description={task.description}
        user={task.user}
      />
    </>
  );
}
