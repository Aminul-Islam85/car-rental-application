import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="404 Not Found"
        className="max-w-xs mb-6"
      />
      <h1 className="text-4xl font-bold mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-600 mb-4">The page you're looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
