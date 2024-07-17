import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileUpdate() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!currentUser || !currentUser.userInfo) {
      setError("User information is missing.");
      return;
    }

    console.log(`http://localhost:8000/api/user/${currentUser.userInfo.id}`);
    try {
      const res = await axios.put(
        `http://localhost:8000/api/user/${currentUser.userInfo.id}`,
        { username, email, password },
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      updateUser(res.data.userInfo);
      console.log(username, password, email);
      navigate("/"); // Navigate to the desired route after update
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-1/2 h-[600px] rounded-md">
        <div className="w-full h-[20%] flex justify-start items-center pl-5">
          <h1 className="font-semibold text-slate-800">Profile Update</h1>
        </div>
        <div className="w-full h-[30%] flex flex-col justify-start items-start pl-5">
          <img
            className="w-[100px] h-[100px] bg-slate-200 border mb-2 border-slate-500 rounded-xl"
            src={
              currentUser?.userInfo?.avatar ||
              "https://cdn0.iconfinder.com/data/icons/instagram-ui-button/32/instagram_ui_icon_account-512.png"
            }
            alt="User_Profile_Avatar"
          />
          <input type="file" name="avatar" id="avatar" />
        </div>
        <div className="w-full h-[50%] flex justify-start items-center pl-5">
          <form
            className="w-full h-full flex flex-col gap-2 justify-center items-start"
            onSubmit={handleSubmit}
          >
            <input
              className="w-4/5 h-10 rounded-md text-sm pl-3 border text-slate-600 border-slate-400 bg-zinc-50"
              placeholder="Username"
              type="text"
              name="username"
              defaultValue={currentUser?.userInfo?.username}
            />
            <input
              className="w-4/5 h-10 rounded-md text-sm pl-3 border text-slate-600 border-slate-400 bg-zinc-50"
              placeholder="Email"
              type="email"
              name="email"
              defaultValue={currentUser?.userInfo?.email}
            />
            <input
              className="w-4/5 h-10 rounded-md text-sm pl-3 border border-slate-400 bg-zinc-50"
              placeholder="Password"
              type="password"
              name="password"
            />
            {error && <span>{error}</span>}
            <button
              type="submit"
              className="px-2 py-1 rounded-md mt-5 text-white bg-blue-400"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
