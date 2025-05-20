import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      await signIn(email, password);
      form.reset();
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      await googleSignIn(); 
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-white">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
          <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary mt-4">Login</button>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleLogin} className="btn btn-outline btn-accent">
            Sign in with Google
          </button>

          <p className="text-sm text-center mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
