import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  GlobeAltIcon,
  MapPinIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { UserContext } from "../contexts/UserContext";
import useUser from "../hooks/useUser";

export default function Nav() {
  const { user } = useContext(UserContext);
  const { check } = useUser();

  async function handleSignOut() {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/auth/signOut/`, {
        method: "POST",
        credentials: "include",
      });
      check();
    } catch {}
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h1>Josh Tasks</h1>
          </Link>
        </li>
        <li>
          <Link to="/tasks">
            <GlobeAltIcon className="icon" />
            <h2>Tasks</h2>
          </Link>
        </li>
        {user ? (
          <li>
            <Link to="/myTasks">
              <MapPinIcon className="icon" />
              <h2>My Tasks</h2>
            </Link>
          </li>
        ) : null}
        {user ? (
          <li>
            <button onClick={handleSignOut}>
              <UserCircleIcon className="icon" />
              <h2>Sign Out</h2>
            </button>
          </li>
        ) : (
          <li>
            <Link to="/signIn">
              <UserCircleIcon className="icon" />
              <h2>Sign In</h2>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
