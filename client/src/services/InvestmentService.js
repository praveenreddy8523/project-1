import axios from "axios";
import axiosInstance from "../services/axiosInstance"


const API_BASE_URL = "/api/investment"; 

export const InvestmentService = {
    // async getAllUsers() {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}/GetUsers`);
    //         return response.data;
    //     }catch(error){
    //         console.log(error);
    //     }
    // },
    async addInvestment(investmentData) {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/AddInvestment`, investmentData);
            return response;
        }catch(error){
            console.log(error);
        }
    },
    async getInvestments(user){
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}/GetInvestments`,{
                params: { Id : user.Email }, 
            });
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
}