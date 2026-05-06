import axios from "axios";
import axiosInstance from "../services/axiosInstance"


const API_BASE_URL = "/api/users"; 

export const UserService = {
    async getAllUsers() {
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}/GetUsers`);
            return response.data;
        }catch(error){
            console.log(error);
        }
    },
    async addUser(user) {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/AddUser`, user);
            return response;
        }catch(error){
            console.log(error);
        }
    }
}