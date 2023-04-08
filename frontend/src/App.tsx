import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import ErrorPage from "./routes/ErrorPage";
import Root from "./routes/Root";
import SignInRoot from "./routes/SignInRoot";
import SignOutRoot from "./routes/SignOutRoot";
import Index from "./routes/Index";
import Tasks from "./routes/Tasks";
import MyTasks from "./routes/MyTasks";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import ChangePassword from "./routes/ChangePassword";
import ChangePasswordJwt from "./routes/ChangePasswordJwt";
import type { User } from "./contexts/UserContext";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        element: <SignInRoot />,
        children: [
          {
            path: "myTasks",
            element: <MyTasks />,
          },
        ],
      },
      {
        element: <SignOutRoot />,
        children: [
          {
            path: "signIn",
            element: <SignIn />,
          },
          {
            path: "signUp",
            element: <SignUp />,
          },
          {
            path: "changePassword",
            element: <ChangePassword />,
          },
          {
            path: "changePassword/:jwt",
            element: <ChangePasswordJwt />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  const [authenticating, setAuthenticating] = useState(true);
  const [user, setUser] = useState<User>(null);

  console.log(import.meta.env.VITE_BACKEND_ORIGIN);

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
