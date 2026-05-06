import AdminUser from "../models/AdminUser.js";
import User from "../models/User.js";

export const userRepository = {
  getAll: async () => await User.findAll(),
  getById: async (id) => await User.findByPk(id),
  create: async (data) => await User.create(data),
  update: async (id, data) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(data);
  },

  getByEmailId: async (email) => {
    try{
      const user = await AdminUser.findOne({where: { Email : email}});
      if (!user) {
        console.log("User not found");
        return null;
      }
      return user;
    }catch(error){
      console.log(error);
    }
  },
  delete: async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  },

  validateUser: async (data)=>{
    try{
      const user = await User.findOne(
        {
          where: {
            Email : data.Email,
            Password : data.Password
          }
        }
      );
      return !!user;
    }catch(error){
      console.log(error);
    }
  },
  validateAdminUser: async (data)=>{
    try{
      const user = await AdminUser.findOne(
        {
          where: {
            Email : data.Email,
            Password : data.Password
          }
        }
      );
      return !!user;
    }catch(error){
      console.log(error);
    }
  },
  addUser : async (data) => {
    try{
      const user = await User.create(data);
      return !!user;
    }catch(error){
      console.log(error);
    }
  }
};
