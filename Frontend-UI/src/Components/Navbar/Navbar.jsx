import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  return (
    <div className="relative w-full h-[70px] flex justify-center items-center">
      {/* Navbar */}
      <div className="w-full md:w-8/12 h-full flex justify-between items-center">
        {/* Logo and Title */}
        <div
          onClick={() => navigate("/")}
          className="w-full h-full flex justify-start items-center pl-5 pr-5"
        >
          <img
            className="w-[30px] cursor-pointer h-auto"
            src="/logo.png"
            alt="Logo"
          />
          <h1 className="sm:block cursor-pointer font-semibold ml-2 text-md py-auto md:text-md">
            DreamEstate
          </h1>
        </div>
        {/* Navigation Links */}
        <ul className="hidden md:flex w-full h-full items-center justify-center gap-5 text-sm font-bold">
          <li
            onClick={() => navigate("/")}
            className="cursor-pointer hover:underline"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/about")}
            className="cursor-pointer hover:underline"
          >
            About
          </li>
          <li
            onClick={() => navigate("/contact")}
            className="cursor-pointer hover:underline"
          >
            Contact
          </li>
          <li
            onClick={() => navigate("/agents")}
            className="cursor-pointer hover:underline"
          >
            Agents
          </li>
        </ul>
        {/* Mobile Menu Icon */}
        <div className="w-full h-full md:hidden flex justify-end items-center pr-2">
          <img
            className="h-auto w-7 hover:scale-90 duration-300 cursor-pointer"
            src="/menu.png"
            onClick={() => setOpen((prev) => !prev)}
            alt="Menu Icon"
          />
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden md:flex w-4/12 h-full bg-[#fcf5f3] justify-end pr-10 items-center gap-3">
        {currentUser ? (
          <>
            <div
              onClick={() => navigate("/profile")}
              className="w-fit h-7 flex justify-center items-center cursor-pointer px-2 text-[13px] font-semibold text-slate-900 rounded-sm bg-yellow-300 border border-yellow-400 hover:scale-90 duration-300"
            >
              Profile
            </div>
            <div className="w-fit h-full flex justify-center text-slate-500 items-center cursor-pointer px-2 text-[13px] font-semibold">
              <img
                className=" w-[40px] h-[40px] rounded-full bg-slate-200 border mb-2 border-slate-500"
                src={
                  currentUser.userInfo.avatar ||
                  "https://cdn0.iconfinder.com/data/icons/instagram-ui-button/32/instagram_ui_icon_account-512.png"
                }
                alt="User_Profile_Avatar"
              />
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => navigate("/register")}
              className="w-fit h-7 flex justify-center items-center cursor-pointer px-2 text-[13px] font-semibold text-slate-900 rounded-sm bg-yellow-300 border border-yellow-400 hover:scale-90 duration-300"
            >
              Sign in
            </div>
            <div
              onClick={() => navigate("/login")}
              className="w-fit h-7 flex justify-center items-center cursor-pointer px-2 text-[13px] font-semibold text-slate-900 rounded-sm bg-yellow-300 border border-yellow-400 hover:scale-90 duration-300"
            >
              Sign up
            </div>
          </>
        )}
      </div>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-black bg-opacity-90 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            X
          </button>
        </div>
        <ul className="flex flex-col items-center gap-5 text-white font-medium mt-10">
          <li
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-slate-600 transition duration-300"
          >
            Home
          </li>
          <li
            onClick={() => {
              navigate("/about");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-slate-600 transition duration-300"
          >
            About
          </li>
          <li
            onClick={() => {
              navigate("/contact");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-slate-600 transition duration-300"
          >
            Contact
          </li>
          <li
            onClick={() => {
              navigate("/agents");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-slate-600 transition duration-300"
          >
            Agents
          </li>
          <li
            onClick={() => {
              navigate("/register");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-slate-600 transition duration-300"
          >
            Sign in
          </li>
          <li
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="cursor-pointer hover:text-slate-600 transition duration-300"
          >
            Sign up
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
