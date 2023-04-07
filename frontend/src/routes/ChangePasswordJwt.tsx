import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { ChangeEvent, SyntheticEvent } from "react";

export default function ChangePasswordJwt() {
  const [formValues, setFormValues] = useState({ password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { jwt } = useParams();
  const navigate = useNavigate();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setDisabled(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_ORIGIN}/auth/changePassword/${jwt}/`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: formValues.password,
          }),
        }
      );

      if (res.ok) {
        navigate("/signIn");
      } else {
        const json = await res.json();
        setErrorMessage(json.errorMessage);
        setDisabled(false);
      }
    } catch {
      setErrorMessage("cannot reach server");
    }
  }

  return (
    <>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={disabled}>
          Submit
        </button>
        {errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </form>
    </>
  );
}
