import { useParams } from "react-router-dom";
import Task from "../../components/Task";

export default function MyTasksId() {
  const { id } = useParams();

  return (
    <>
      <h1>My Tasks</h1>
      <h2>Name</h2>
      <p>Description</p>
      <Task id={2} name="Name" description="Description" user={null} />
    </>
  );
}
