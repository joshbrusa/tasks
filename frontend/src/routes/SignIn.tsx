import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import type { ChangeEvent, SyntheticEvent } from "react";

export default function SignIn() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const { check } = useUser();

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setDisabled(true);

    try {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_ORIGIN + "/auth/signIn",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formValues.email,
            password: formValues.password,
          }),
        }
      );

      if (res.ok) {
        check();
        navigate("/");
      } else {
        const json = await res.json();
        setMessage(json.message);
        setDisabled(false);
      }
    } catch {
      setMessage("cannot reach server");
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
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
        {message ? <div className="errorMessage">{message}</div> : null}
      </form>
      <Link to="/signUp">No account? Sign Up</Link>
    </>
  );
}
