import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import TaskId from "../../components/TaskId";

export default function MyTasksId() {
  const [task, setTask] = useState({ name: "", description: "" });
  const { id } = useParams();

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_ORIGIN}/myTasks/${id}`,
          {
            credentials: "include",
          }
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
      <h1>My Tasks</h1>
      <TaskId name={task.name} description={task.description} user={null} />
      <Link className="pageLink" to={`/myTasks/${id}/updates`}>
        Update Task
      </Link>
      <Link className="pageLink" to={`/myTasks/${id}/deletes`}>
        Delete Task
      </Link>
    </>
  );
}
