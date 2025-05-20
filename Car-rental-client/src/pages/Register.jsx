import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth"; 

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      const result = await createUser(email, password);

      
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo || "https://i.ibb.co/default-avatar.png"
      });

      form.reset();
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md shadow-xl bg-white">
        <form onSubmit={handleRegister} className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" required />
          <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" />
          <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
          <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn btn-primary mt-4">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
