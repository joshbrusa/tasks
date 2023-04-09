import { Link } from "react-router-dom";
import "../css/task.css";

export type TaskType = {
  id: number;
  name: string;
  description: string;
  user: {
    username: string;
  } | null;
};

export default function Task({ id, name, description, user }: TaskType) {
  return (
    <>
      <Link className="taskContainer" to={`/tasks/${id}`}>
        {user ? <h1>@{user.username}</h1> : null}
        <h2>{name}</h2>
        <p>{description}</p>
      </Link>
    </>
  );
}
