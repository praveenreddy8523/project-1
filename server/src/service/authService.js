import AdminUser from "../models/AdminUser.js";
import { userRepository } from "../repositories/userRepositories.js"
import { mailService } from "./mailService.js";

export const authService = {
  
  validateAdminUser : async (data) => userRepository.validateAdminUser(data),
  validateUser: async (data) => userRepository.validateUser(data),
  forgotAdminPassword : async (email) => {
    try{
      const adminuser = await userRepository.getByEmailId(email);

      const isMailSent = mailService.sendForgotPasswordMail(adminuser.Email,adminuser.Password);

      return isMailSent;

    }catch(error)
    {
      console.log(error);
    }
  }
}
