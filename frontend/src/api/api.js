import axios from "axios";

export const fetchData = async () => {
  const respnonse = await fetch(
    "https://mern-todo-app-production-8503.up.railway.app/api/products"
  );
  const res = await respnonse.json();
  return res.data;
};
export const fetchSingleData = async (id) => {
  const respnonse = await fetch(
    `https://mern-todo-app-production-8503.up.railway.app/api/products/${id}`
  );
  const res = await respnonse.json();
  return res.data;
};

export const editData = async ({ id, payload }) => {
  const response = await fetch(
    `https://mern-todo-app-production-8503.up.railway.app/api/products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  return await response.json();
};

export const postData = async (post) => {
  await fetch(
    "https://mern-todo-app-production-8503.up.railway.app/api/products",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }
  );
};

export const deleteData = async (id) => {
  const res = await axios.delete(
    `https://mern-todo-app-production-8503.up.railway.app/api/products/${id}`
  );
  return res.data;
};
