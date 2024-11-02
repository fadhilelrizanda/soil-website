import axios from "axios";

// Define the base URL for your API
const API_BASE_URL = "https://soil-api-rho.vercel.app/projects"; // Adjust as needed

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const api_predict = axios.create({
  baseURL: "https://fadhilelrizanda-soil-space.hf.space",
  headers: {
    "Content-Type": "application/json",
  },
});

// Create Projects
export const createProject = async (data: { title: string; desc: string }) => {
  try {
    const response = await api.post(`/create/project`, data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Get Project
export const getProject = async () => {
  try {
    const response = await api.get("/projects");
    return response.data;
  } catch (error) {
    console.log("Error get projects", error);
    throw error;
  }
};

// Delete Project

export const deleteProject = async (id: string) => {
  try {
    const response = await api.delete(`/delete/project/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error occurs", error);
  }
};

// Get project data by ID

export const getProjectById = async (id: string) => {
  try {
    const response = await api.get(`/project/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error occurs : ", error);
  }
};

// Post to predict
export const predictData = async (data: {
  id: string;
  depth: number;
  HL: number;
  HB: number;
  FR: number;
  point: number;
}) => {
  try {
    const response = await api_predict.post("/predict/add", data);
    return response.data;
  } catch (error) {
    console.log("error : ", error);
    throw error;
  }
};

// delete data based on project
export const deleteDataEntry = async (p_id: string, d_id: string) => {
  try {
    const response = await api.delete(`/delete/data/${p_id}/${d_id}`);
    return response;
  } catch (error) {
    console.log("error deleting data", error);
  }
};
