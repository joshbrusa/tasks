import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MyTasksIdDeletes() {
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleClick() {
    setDisabled(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_ORIGIN}/myTasks/${id}/deletes`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        navigate("/myTasks");
      } else {
        const json = await res.json();
        setErrorMessage(json.errorMessage);
        setDisabled(false);
      }
    } catch {
      setErrorMessage("cannot reach server");
      setDisabled(false);
    }
  }

  return (
    <>
      <h1>Delete Task</h1>
      <h2>Are you sure you want to delete?</h2>
      <button className="pageButton" onClick={handleClick} disabled={disabled}>
        Yes
      </button>
      {errorMessage ? <div className="errorMessage">{errorMessage}</div> : null}
    </>
  );
}
