import axios from "axios";
import AddWorkFlow from "../Components/AddWorkflow";
import axiosInstance from "../services/axiosInstance"



const API_BASE_URL = "/api/project"; 


export const ProjectService = {
  addProject: async (data) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/AddProject`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "Failed to Add Project" };
    }
  },
  getAllProjects: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/GetAllProjects`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateProject: async (data) => {
    try {
      const response = await axiosInstance.put(
        `${API_BASE_URL}/UpdateProject`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "Failed to Update Project" };
    }
  },
  deleteProject: async (data) => {
    try {
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/DeleteProject`,
        {
          data: data, // Send data in the config object
        }
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "Failed to Delete Project" };
    }
  },
  addWorkFlow: async (data) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/AddWorkFlow`,
        data
      );

      return response.data;
    } catch (error) {}
  },
  updateWorkFlow: async (data) => {
    try {
      const response = await axiosInstance.put(
        `${API_BASE_URL}/UpdateWorkFlow`,
        data
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "Failed to Update WorkFlow" };
    }
  },
  deleteWorkFlow: async (data) => {
    try {
      const response = await axiosInstance.delete(
        `${API_BASE_URL}/DeleteWorkFlow`,
        {
          data: data, // Send data in the config object
        }
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, message: "Failed to Delete Project" };
    }
  },
  getAllWorkflows: async () => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/GetAllWorkFlows`
      );

      return response.data;
    } catch (error) {}
  },
  getWorkFlowsBasedOnProject: async (projectName) => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/GetWorkFlowsBasedOnProject`,
        {
          params: { Name: projectName },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getProjectsOfTags: async (tags) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE_URL}/GetProjectsOfTags`,
        tags
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  getWorkFlowBasedOnId : async (id)=>{
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/GetWorkFlowBasedOnId`,
        {
          params: { Id: id },
        }
      );
      return response.data;
    }catch(error)
    {
      console.log(error);
    }
  },
  getPreviousWorkFlowsBasedOnProject: async (projectName) => {
    try {
      const response = await axiosInstance.get(
        `${API_BASE_URL}/GetPreviousWorkFlowsBasedOnProject`,
        {
          params: { Name: projectName },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};