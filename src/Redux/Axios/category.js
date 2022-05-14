import axios from "axios";

export const category = axios.create({
    baseURL: "http://localhost:8000/api/category/"
  });

  export const featuredCategory = axios.create({
    baseURL: "http://localhost:8000/api/category/",
    params: {featured: true}
  });

