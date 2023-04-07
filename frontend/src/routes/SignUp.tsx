import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent, SyntheticEvent } from "react";

export default function SignUp() {
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
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
        import.meta.env.VITE_BACKEND_ORIGIN + "/auth/signUp",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formValues.email,
            username: formValues.username,
            password: formValues.password,
          }),
        }
      );

      if (res.ok) {
        navigate("/signIn");
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formValues.username}
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
    </>
  );
}
