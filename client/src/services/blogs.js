import axios from "axios";
const baseUrl = "http://localhost:1234/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log(token);
};

const getAll = async () => {
  const blogs = await axios.get(baseUrl);
  if (!blogs) return [];
  return blogs.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default { getAll, setToken, create };
