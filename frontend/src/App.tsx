import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import ErrorPage from "./routes/ErrorPage";
import Root from "./routes/roots/Root";
import SignInRoot from "./routes/roots/SignInRoot";
import SignOutRoot from "./routes/roots/SignOutRoot";
import Index from "./routes/Index";
import Tasks from "./routes/tasks/Tasks";
import TasksId from "./routes/tasks/TasksId";
import MyTasks from "./routes/myTasks/MyTasks";
import MyTasksCreates from "./routes/myTasks/MyTasksCreates";
import MyTasksUpdates from "./routes/myTasks/MyTasksUpdates";
import MyTasksDeletes from "./routes/myTasks/MyTasksDeletes";
import MyTasksId from "./routes/myTasks/MyTasksId";
import MyTasksIdCreates from "./routes/myTasks/MyTasksIdCreates";
import MyTasksIdUpdates from "./routes/myTasks/MyTasksIdUpdates";
import MyTasksIdDeletes from "./routes/myTasks/MyTasksIdDeletes";
import SignIn from "./routes/auth/SignIn";
import SignUp from "./routes/auth/SignUp";
import ChangePassword from "./routes/auth/ChangePassword";
import ChangePasswordJwt from "./routes/auth/ChangePasswordJwt";
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
        path: "tasks/:id",
        element: <TasksId />,
      },
      {
        element: <SignInRoot />,
        children: [
          {
            path: "myTasks",
            element: <MyTasks />,
          },
          {
            path: "myTasks/creates",
            element: <MyTasksCreates />,
          },
          {
            path: "myTasks/updates",
            element: <MyTasksUpdates />,
          },
          {
            path: "myTasks/deletes",
            element: <MyTasksDeletes />,
          },
          {
            path: "myTasks/:id",
            element: <MyTasksId />,
          },
          {
            path: "myTasks/:id/creates",
            element: <MyTasksIdCreates />,
          },
          {
            path: "myTasks/:id/updates",
            element: <MyTasksIdUpdates />,
          },
          {
            path: "myTasks/:id/deletes",
            element: <MyTasksIdDeletes />,
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
