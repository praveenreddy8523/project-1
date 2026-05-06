
import {userService}  from "../service/userService.js"
//const userService = require("../services/userService.js");

export const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.log({ error: error.message });
    }
  },

  // createUser: async (req,res)=>{
  //   try{
  //     await userService
  //   }
  // }

  validateUserCreds: async (req, res) =>{
    const { email, password } = req.query;
    const isExists = await userService.validateUser({Email: email,Password: password});
    return res.json({ success: isExists });
  },
  addUser : async (req,res) =>{
    try{
      const user = await userService.addUser(req.body);
      return res.json(user);
    }catch(error){
      console.log(error);
    }
  }

}

// const getUser = async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.params.id);
//     if (!user) return res.status(404).json({ error: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch user" });
//   }
// };

// const createUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const newUser = await userService.addUser(name, email);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create user" });
//   }
// };

// const updateUser = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     const updatedUser = await userService.updateUser(req.params.id, name, email);
//     if (!updatedUser) return res.status(404).json({ error: "User not found" });
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update user" });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await userService.deleteUser(req.params.id);
//     if (!deletedUser) return res.status(404).json({ error: "User not found" });
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete user" });
//   }
// };


