import { useContext } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { UserContext } from "../contexts/UserContext";

export default function Nav() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h1>Josh Tasks</h1>
          </Link>
        </li>
        <li>
          <Link to="/home">
            <HomeIcon className="icon" />
            <h2>Home</h2>
          </Link>
        </li>
        {user ? (
          <li>
            <Link to="/signOut">
              <UserCircleIcon className="icon" />
              <h2>Sign Out</h2>
            </Link>
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
