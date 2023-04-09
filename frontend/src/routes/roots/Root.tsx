import { Outlet } from "react-router-dom";
import Nav from "../../components/Nav";
import "../../css/root.css";

export default function Root() {
  return (
    <div className="container">
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
