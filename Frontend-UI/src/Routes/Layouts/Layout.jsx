import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
function Layout() {
  return (
    <div className="w-[100%] h-screen flex flex-col justify-start items-center">
      <div className="md:w-[75%] md:h-fit w-full bg-white">
        <Navbar />
      </div>
      <div className="md:w-[75%] md:h-[100%] w-full">
        <Outlet />
      </div>
    </div>
  );
}
function RequiredAuth() {
  const { currentUser } = useContext(AuthContext);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="w-[100%] h-screen flex flex-col justify-start items-center">
      <div className="md:w-[75%] md:h-fit w-full bg-white">
        <Navbar />
      </div>
      <div className="md:w-[75%] md:h-[100%] w-full">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, RequiredAuth };
