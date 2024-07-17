import axios from "axios";
import { Suspense, useContext, useEffect } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Card from "../../Components/Cards/Card";

function Profile() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log(data);
    // Log AxiosError if data.postResponse is rejected
    if (data.postResponse instanceof Promise) {
      data.postResponse.catch(error => console.error("AxiosError:", error));
    }
  }, [data]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/user/${currentUser.userInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          withCredentials: true,
        }
      );
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:h-full md:flex overflow-auto">
      <div className="w-full md:w-3/5 h-fit md:h-full">
        <div className="w-full h-3/5">
          <div className="w-full h-[20%] flex justify-between items-center pl-5 pr-5">
            <h1 className="text-md font-semibold text-slate-800">
              User Information
            </h1>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/profileUpdate");
              }}
              className="w-fit px-2 py-1 text-sm font-bold rounded-md text-slate-800 bg-slate-100 border border-slate-300"
            >
              Update Profile
            </button>
          </div>
          <div className="w-full h-[65%] rounded-md flex flex-col justify-center items-start pl-5">
            <div className="flex gap-2">
              <img
                className=" w-[100px] object-cover h-[100px] bg-slate-200 border mb-2 border-slate-500 rounded-full"
                src={
                  currentUser.userInfo.avatar ||
                  "https://cdn0.iconfinder.com/data/icons/instagram-ui-button/32/instagram_ui_icon_account-512.png"
                }
                alt="User_Profile_Avatar"
              />
            </div>
            <div className="w-[90%] h-10 bg-zinc-300 border border-slate-300 rounded-md p-2 flex justify-center items-center ">
              <h1 className="w-full h-full font-bold text-zinc-800 text-sm pl-3">
                <span className="text-black">User Id :</span>{" "}
                <span className="text-green-800">
                  {currentUser.userInfo.id}
                </span>
              </h1>
            </div>
            <div className="w-[90%] h-10 bg-slate-100 border border-slate-300 rounded-md mt-1 p-2 flex justify-center items-center ">
              <h1 className="w-full h-full font-semibold text-slate-800 text-sm pl-3">
                Username : {currentUser.userInfo.username}
              </h1>
            </div>
            <div className="w-[90%] h-10 bg-slate-100 border border-slate-300 rounded-md p-2 mb-1 mt-1 flex justify-center items-center ">
              <h1 className="w-full h-full font-semibold text-slate-800 text-sm pl-3">
                Email : {currentUser.userInfo.email}
              </h1>
            </div>
          </div>
          <div className="w-full h-[20%] flex justify-start gap-2 items-center pl-5">
            <button
              onClick={handleLogout}
              className="hover:scale-90 duration-300 w-fit px-2 py-1 rounded-md font-semibold bg-blue-400 text-sm text-white border border-slate-300"
            >
              Logout
            </button>
            <button
              onClick={handleDelete}
              className="hover:scale-90 duration-300 w-fit px-2 py-1 rounded-md font-semibold text-sm bg-red-500 text-white border border-slate-300"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="w-full h-fit overflow-y-auto overflow-auto pb-[100px]">
          <div className="w-full h-[20%] flex justify-between items-center pl-5 pr-5 mt-5">
            <h1 className="font-semibold text-lg">My List</h1>
            <button
              onClick={() => {
                navigate("/NewPostPage");
              }}
              className="hover:scale-90 duration-300 w-fit px-2 py-1 text-sm font-bold rounded-md text-black bg-slate-100 border border-slate-300"
            >
              Create New Post
            </button>
          </div>
          <div className="w-full h-full flex flex-col justify-start items-center pl-1 pr-5 space-y-4">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts</p>}
              >
                {(postResponse) => {
                  console.log("postResponse:", postResponse);
                  if (!postResponse || !postResponse.data) {
                    return <p>No posts available</p>;
                  }
                  return postResponse.data.map((post) => (
                    <Card key={post.id} item={post} />
                  ));
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/5 h-full bg-slate-100"></div>
    </div>
  );
}

export default Profile;
