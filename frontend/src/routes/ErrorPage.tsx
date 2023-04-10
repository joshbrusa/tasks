import { Link } from "react-router-dom";
import "../css/errorPage.css";

export default function ErrorPage() {
  return (
    <div className="errorPage">
      <h1>Route not found</h1>
      <Link to="/">Take me home</Link>
    </div>
  );
}
