import { Link } from "react-router-dom";
import Task from "../../components/Task";

export default function MyTasks() {
  return (
    <>
      <h1>My Tasks</h1>
      <Link to="/myTasks/creates">Create Task</Link>
      <Task id={1} name="Name" description="Description" user={null} />
    </>
  );
}
