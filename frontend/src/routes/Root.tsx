import { Outlet, Link } from "react-router-dom";
import "../css/root.css";

export default function Root() {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link className="navLink" to="/">
              <h1>Link 1</h1>
            </Link>
          </li>
          <li>
            <Link className="navLink" to="/">
              <h1>Link 12</h1>
            </Link>
          </li>
          <li>
            <Link className="navLink" to="/">
              <h1>Link 123</h1>
            </Link>
          </li>
          <li>
            <Link className="navLink" to="/">
              <h1>Link 1234</h1>
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
