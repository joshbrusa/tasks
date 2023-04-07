import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="errorPage">
      <h1>Route not found</h1>
      <Link to="/">Take me back</Link>
    </div>
  );
}
