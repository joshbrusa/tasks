import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/solid";
import "../css/root.css";

export default function Root() {
  const [isAsideOpen, setIsAsideOpen] = useState(true);

  return (
    <>
      <header>
        <button onClick={() => setIsAsideOpen(!isAsideOpen)}>
          <Bars3Icon />
        </button>
        <a href="/">
          <h1>Josh Tasks</h1>
        </a>
        <a href="https://github.com/joshbrusa/joshtasks" target="_blank">
          <img src="/githubLogo.svg" alt="GitHub Logo" />
        </a>
      </header>
      {isAsideOpen ? (
        <aside>
          <ul>
            <li>
              <a href="/SignIn">SignIn</a>
            </li>
            <li>
              <a href="/SignUp">SignUp</a>
            </li>
          </ul>
        </aside>
      ) : null}
      <main className={isAsideOpen ? "asideOpen" : ""}>
        <Outlet />
      </main>
    </>
  );
}
