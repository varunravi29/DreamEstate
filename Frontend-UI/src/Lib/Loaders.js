import axios from "axios";
import { defer } from "react-router-dom";

export const SinglePageLoader = async ({ params }) => {
  const res = await axios.get(`http://localhost:8000/api/post/${params.id}`);
  return res.data;
};

export const ListPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];
  const postPromise = axios.get(`http://localhost:8000/api/post?` + query);
  return defer({
    postResponse: postPromise.then((res) => res.data),
  });
};

export const ProfilePageLoader = async ({ request }) => {
  const postPromise = axios.get(`http://localhost:8000/api/user/profilePosts`, {
    withCredentials: true,
  });
  return defer({
    postResponse: postPromise,
  });
};
