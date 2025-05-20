import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          🚗 Car Rental
        </Link>
      </div>

      <div className="flex-none flex items-center gap-2 sm:gap-4 pr-4">
        
        <Link to="/" className="btn btn-ghost btn-sm">Home</Link>
        <Link to="/cars" className="btn btn-ghost btn-sm">Available Cars</Link>

        {user ? (
          <>
            <Link to="/add-car" className="btn btn-ghost btn-sm">Add Car</Link>
            <Link to="/my-cars" className="btn btn-ghost btn-sm">My Cars</Link>
            <Link to="/my-bookings" className="btn btn-ghost btn-sm">My Bookings</Link>

            {isAdmin && (
              <Link to="/admin" className="btn btn-warning btn-sm">Admin Panel</Link>
            )}

            <span className="text-sm font-medium whitespace-nowrap">
              Hello, {user.displayName || "User"}
            </span>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
