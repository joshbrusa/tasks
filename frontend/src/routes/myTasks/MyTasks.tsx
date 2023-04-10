import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Task from "../../components/Task";
import PageNavigation from "../../components/PageNavigation";

export default function MyTasks() {
  const [page, setPage] = useState(0);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_ORIGIN}/myTasks/10/${page}`,
          {
            credentials: "include",
          }
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
      <h1>My Tasks</h1>
      <Link className="pageLink" to="/myTasks/creates">
        Create Task
      </Link>
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
            to={`/myTasks/${task.id}`}
            name={task.name}
            description={task.description}
            user={null}
          />
        )
      )}
      <PageNavigation page={page} setPage={setPage} />
    </>
  );
}
