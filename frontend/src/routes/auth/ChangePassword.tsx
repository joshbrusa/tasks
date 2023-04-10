import { useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";

export default function ChangePassword() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setDisabled(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_ORIGIN}/auth/changePassword/`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formValues.email,
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        setErrorMessage("");
        setSuccessMessage(json.successMessage);
        setDisabled(false);
      } else {
        const json = await res.json();
        setSuccessMessage("");
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
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={disabled}>
          Submit
        </button>
        {successMessage ? (
          <div className="successMessage">{successMessage}</div>
        ) : null}
        {errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : null}
      </form>
    </>
  );
}
