import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        updateUser(res.data);
        console.log(res.data);
        toast(res.data.message);
        navigate("/");
      }
      // Handle successful registration (e.g., redirect or show success message)
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="w-80 h-20 flex justify-start items-start">
        <h1 className="font-bold text-xl">Login</h1>
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
            minLength={7}
            required
          />
          <input
            className="w-full pl-2 h-10 rounded-md shadow-sm border border-slate-300"
            type="password"
            name="password"
            placeholder="Password"
            maxLength={20}
            minLength={7}
            required
          />
          <button
            type="submit"
            className="w-full h-10 bg-blue-400 rounded-lg text-white font-semibold"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <h1>
            dont have an account?{" "}
            <span className="text-blue-700 font-semibold">
              <Link to="/register">SignIn</Link>
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
}

export default Login;
