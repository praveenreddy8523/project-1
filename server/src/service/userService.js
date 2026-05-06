// Fetch all users
import { userRepository } from "../repositories/userRepositories.js"
import { mailService } from "./mailService.js";

export const userService = {

  generatePassword : (length = 8)=> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  },

  getAllUsers: async () => await userRepository.getAll(),

  //createUser : async () => await userRepository.create()

  //getUserById: async () => await userRepository.getById() 

  validateUser : async (data) => userRepository.validateUser(data),
  addUser : async (data) =>{
    const newPassword = userService.generatePassword();
    //send mail
    const userData = {
      FirstName : data.firstName,
      LastName : data.lastName,
      Email : data.email,
      Number : data.mobile,
      State: data.state,
      Country : data.country,
      DateOfBirth : data.dob,
      Password : newPassword//data?.password ? data?.password : null
    }
    //mailService.sendNewPasswordMail(data.email,newPassword);
    const user = await userRepository.addUser(userData);
    return user;
  }
}

// Fetch user by ID
// const getUserById = async (id) => {
//   const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
//   return result.rows[0];
// };

// // Add a new user
// const addUser = async (name, email) => {
//   const result = await pool.query(
//     "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
//     [name, email]
//   );
//   return result.rows[0];
// };

// // Update user details
// const updateUser = async (id, name, email) => {
//   const result = await pool.query(
//     "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
//     [name, email, id]
//   );
//   return result.rows[0];
// };

// // Delete a user
// const deleteUser = async (id) => {
//   const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
//   return result.rows[0];
// };

//module.exports = { getAllUsers };//, getUserById, addUser, updateUser, deleteUser}
