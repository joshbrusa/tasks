import { useState } from "react";

export default function SignUp() {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

  return (
    <>
      <h1>Sign Up</h1>
      <form action="">
        <label htmlFor="">Email</label>
        <input type="text" name="" id="" />
        <label htmlFor="">Username</label>
        <input type="text" name="" id="" />
        <label htmlFor="">Password</label>
        <input type="password" name="" id="" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
