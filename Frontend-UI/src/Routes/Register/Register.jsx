import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        password,
      });
      if (res.data) {
        toast(res.data.message);
        navigate("/login");
      }
      // Handle successful registration (e.g., redirect or show success message)
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="w-80 h-20 flex justify-start items-start">
        <h1 className="font-bold text-xl">Register</h1>
      </div>
      <div className="w-full h-[80] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-80 h-full flex flex-col justify-center items-center gap-5"
        >
          <input
            className="w-full pl-2 h-10 rounded-md shadow-sm border border-slate-300"
            type="text"
            name="username"
            placeholder="Username"
            maxLength={20}
            minLength={5}
            required
          />
          <input
            className="w-full pl-2 h-10 rounded-md shadow-sm border border-slate-300"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="w-full pl-2 h-10 rounded-md shadow-sm border border-slate-300"
            type="password"
            name="password"
            placeholder="Password"
            maxLength={20}
            minLength={8}
            required
          />
          <button
            type="submit"
            className="w-full h-10 bg-blue-400 rounded-lg text-white font-semibold"
          >
            Register
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <h1>
            Already have an account?{" "}
            <span className="text-blue-700 font-semibold">
              <Link to="/login">Login</Link>
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
}

export default Register;
