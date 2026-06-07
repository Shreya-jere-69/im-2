import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="header">
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link className="small-btn" to="/">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;