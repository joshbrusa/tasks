import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/app.css";
import { UserContext } from "./contexts/UserContext";
import ErrorPage from "./routes/ErrorPage";
import Root from "./routes/Root";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import type { User } from "./contexts/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/SignIn",
        element: <SignIn />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    async function check() {
      const res = await fetch(
        import.meta.env.VITE_BACKEND_ORIGIN + "/auth/check",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        const user = await res.json();
        setUser(user);
      }
    }

    check();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
