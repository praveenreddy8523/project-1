import { authService } from "../service/authService.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authController = {
    userLogin: async (req,res)=>{
        const { email, password } = req.query;
        const isExists = await authService.validateUser({Email: email,Password: password});
        if(isExists){
            const token = jwt.sign({ email: email,isAdmin: false}, process.env.JWT_SECRET_KEY, {
                expiresIn: "24h",
            });
        
            //console.log(token);
            return res.json({ success: isExists,token: token });
        }else{
            return res.json({success: false});
        }
    },
    adminLogin: async (req,res)=>{
        const { email, password } = req.query;
        const isExists = await authService.validateAdminUser({Email: email,Password: password});
        if(isExists){
            const token = jwt.sign({ email: email,isAdmin: true}, process.env.JWT_SECRET_KEY, {
                expiresIn: "24h",
            });
        
            //console.log(token);
            return res.json({ success: isExists,token: token });
        }else{
            return res.json({success: false});
        }
    },
    forgotPassword: async (req,res)=>{
        const { email } = req.query;
        return res.json(await authService.forgotAdminPassword(email));
    }
}