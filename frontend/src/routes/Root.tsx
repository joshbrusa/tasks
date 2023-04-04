import { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import "../css/root.css";

export default function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      {sidebarOpen ? (
        <>
          <aside className="asideSidebarOpen">
            <ul>
              <li>
                <a href="/">
                  <h1>Josh Tasks</h1>
                </a>
              </li>
              <li>
                <a href="/home">
                  <HomeIcon className="icon" />
                  <h2>Home</h2>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/joshbrusa/joshtasks"
                  target="_blank"
                >
                  <img src="/githubLogo.svg" alt="GitHub Logo" />
                  <h2>GitHub</h2>
                </a>
              </li>
              <li>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <ChevronDoubleLeftIcon className="icon" />
                </button>
              </li>
            </ul>
          </aside>
          <main className="mainSidebarOpen">
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <aside className="asideSidebarClosed">
            <ul>
              <li>
                <a href="/">
                  <h1>JT</h1>
                </a>
              </li>
              <li>
                <a href="/home">
                  <HomeIcon className="icon" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/joshbrusa/joshtasks"
                  target="_blank"
                >
                  <img src="/githubLogo.svg" alt="GitHub Logo" />
                </a>
              </li>
              <li>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <ChevronDoubleRightIcon className="icon" />
                </button>
              </li>
            </ul>
          </aside>
          <main className="mainSidebarClosed">
            <Outlet />
          </main>
        </>
      )}
    </>
  );
}
