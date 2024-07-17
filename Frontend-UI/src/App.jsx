import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequiredAuth } from "./Routes/Layouts/Layout.jsx";
import Homepage from "./Routes/Homepage/Homepage.jsx";
import ListPage from "./Routes/ListPage/ListPage.jsx";
import SinglePage from "./Routes/SinglePage/SinglePage.jsx";
import Profile from "./Routes/Profile/Profile.jsx";
import Register from "./Routes/Register/Register.jsx";
import Login from "./Routes/Login/Login.jsx";
import ProfileUpdate from "./Routes/ProfileUpdate/ProfileUpdate.jsx";
import NewPostPage from "./Routes/NewPostPage/NewPostPage.jsx";
import {
  ListPageLoader,
  ProfilePageLoader,
  SinglePageLoader,
} from "./Lib/Loaders.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: ListPageLoader,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <RequiredAuth />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
          loader: ProfilePageLoader,
        },
        {
          path: "/profileUpdate",
          element: <ProfileUpdate />,
        },
        {
          path: "/newPostPage",
          element: <NewPostPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: SinglePageLoader,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
