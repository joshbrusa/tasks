import { Link } from "react-router-dom";

export default function MyTask({
  id,
  name,
  description,
}: {
  id: number;
  name: string;
  description: string;
}) {
  return (
    <>
      <div className="myTaskContainer">
        <Link to={`/myTasks/${id}`}>
          <h2>{name}</h2>
          <p>{description}</p>
        </Link>
      </div>
    </>
  );
}
