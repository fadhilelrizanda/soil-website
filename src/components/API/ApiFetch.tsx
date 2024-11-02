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

export const getLatestPeopleData = async (lim: number) => {
  try {
    const response = await api.get(`/class/getLatest/${lim}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllPeopleData = async (lim: number, page: number) => {
  try {
    const response = await api.get(`/class/getAll/${lim}/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const downloadAllPeopleData = async () => {
  try {
    const response = await api.get(`/class/DownloadAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
};

export const getLatestRoomStat = async (lim: number) => {
  try {
    const response = await api.get(`/roomstat/getLatest/${lim}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllRoomStat = async (lim: number, page: number) => {
  try {
    const response = await api.get(`/roomstat/getAll/${lim}/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const downloadAllRoomstat = async () => {
  try {
    const response = await api.get(`/roomstat/DownloadAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
};

export const getLatestACStat = async (lim: number) => {
  try {
    const response = await api.get(`/acstat/getLatest/${lim}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getLatestSocketStat = async (lim: number) => {
  try {
    const response = await api.get(`/socketstat/getLatest/${lim}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllSocketStat = async (lim: number, page: number) => {
  try {
    const response = await api.get(`/socketstat/getAll/${lim}/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const downloadAlSocketStat = async () => {
  try {
    const response = await api.get(`/socketstat/DownloadAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
};

export const getLatestRelayStat = async (lim: number) => {
  try {
    const response = await api.get(`/relaystat/getLatest/${lim}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getLatestRHdata = async (lim: number) => {
  try {
    const response = await api.get(`/radian/getLatest/${lim}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllRHData = async (lim: number, page: number) => {
  try {
    const response = await api.get(`/radian/getAll/${lim}/${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const downloadAllRHData = async () => {
  try {
    const response = await api.get(`/radian/DownloadAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all data:", error);
    throw error;
  }
};

// Function for PATCH request
export const updateQuestion = async (
  id: string,
  data: {
    question: string;
    questionType: string;
    keyAnswer: string;
  }
) => {
  try {
    const response = await api.patch(`/surveyasuh/update/${id}`, data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Function for POST request
export const postPersonalQuestion = async (data: {
  question: string;
  questionType: Number;
  surveyType: Number;
}) => {
  try {
    const response = await api.post(`/personalQuest/post`, data); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const postAns = async (data: {
  pq: { [key: string]: string };
  ans: number[];
  score: number;
  surveyType: number;
}) => {
  try {
    const response = await api.post(`/answer/post`, data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export const gettAllAns = async (surveyType: number) => {
  try {
    // Pass surveyType as a query parameter
    const response = await api.get(`/answer/getAll`, {
      params: { surveyType }, // This will be appended to the URL as a query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllQuestion = async (surveyType: number) => {
  try {
    // Pass surveyType as a query parameter
    const response = await api.get(`/question/getAll`, {
      params: { surveyType }, // This will be appended to the URL as a query string
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function for DELETE request
export const deleteAns = async (id: string) => {
  try {
    const response = await api.delete(`/answer/delete/${id}`); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};

// Function for DELETE request
export const deletePersonalQuestion = async (id: string) => {
  try {
    const response = await api.delete(`/personalQuest/delete/${id}`); // Ensure the endpoint matches your API route
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
