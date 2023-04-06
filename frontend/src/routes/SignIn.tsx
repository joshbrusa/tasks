import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [data, setData] = useState({ email: "", password: "" });

  return (
    <>
      <h1>Sign In</h1>
      <form action="">
        <label htmlFor="">Email</label>
        <input type="text" name="" id="" />
        <label htmlFor="">Password</label>
        <input type="password" name="" id="" />
        <button type="submit">Submit</button>
      </form>
      <Link to="/signUp">Sign Up</Link>
    </>
  );
}
