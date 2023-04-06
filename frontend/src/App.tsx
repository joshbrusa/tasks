import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { UserContext } from "./contexts/UserContext";
import ErrorPage from "./routes/ErrorPage";
import Root from "./routes/Root";
import Index from "./routes/Index";
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
        element: <Index />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
]);

export default function App() {
  const [authenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    async function check() {
      try {
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
      } catch {}
      setAuthenticating(false);
    }
    check();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {authenticating ? null : <RouterProvider router={router} />}
    </UserContext.Provider>
  );
}
