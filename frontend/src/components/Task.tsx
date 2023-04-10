import { Link } from "react-router-dom";
import "../css/task.css";

export default function Task({
  to,
  name,
  description,
  user,
}: {
  to: string;
  name: string;
  description: string;
  user: {
    username: string;
  } | null;
}) {
  return (
    <>
      <Link className="taskContainer" to={to}>
        {user ? <h1>@{user.username}</h1> : null}
        <h2>{name}</h2>
        <p>{description}</p>
      </Link>
    </>
  );
}
