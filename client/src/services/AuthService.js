import axios from "axios";
import axiosInstance from "../services/axiosInstance"


const API_BASE_URL = "/api/auth"; 


export const AuthService = {
    userLogin : async (email, password) => {
        try {
        const response = await axiosInstance.get(`${API_BASE_URL}/Login`, {
            params: { email, password }, 
        });
        if(response.data.token){
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("isAdmin",false);
        }
        return response.data; 
        } catch (error) {
        console.error("API Error:", error);
        return { success: false, message: "Failed to validate user" };
        }
    },
    adminLogin : async (email, password) => {
        try {
        const response = await axiosInstance.get(`${API_BASE_URL}/AdminLogin`, {
            params: { email, password }, 
        });
        if(response.data.token){
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("isAdmin",true);
        }
        return response.data; 
        } catch (error) {
        console.error("API Error:", error);
        return { success: false, message: "Failed to validate user" };
        }
    },
    forgotPassword : async (email) =>{
        try{
            const response = await axiosInstance.get(`${API_BASE_URL}/ForgotPassword`, {
                params: { email }, 
            });
            return response.data; 
        }catch(error){
            console.log(error);
        }
    },
    logout: ()=>{
        try{
            if(localStorage.getItem("token")){
            localStorage.removeItem("token");
            }
        }catch(error)
        {

        }
    }
}