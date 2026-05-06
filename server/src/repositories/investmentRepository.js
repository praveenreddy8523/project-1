import Investment from "../models/Investment.js";

export const investmentRepository = {
  addInvestment: async (data) => {
    try {
      const investment = await Investment.create(data);
      return !!investment;
    } catch (error) {
      console.log(error);
    }
  },
  getInvestments: async (Id) => {
    try {
      const investments = await Investment.findAll({
        where: {
            UserId : Id,
          }
      });
      return investments;
    } catch (error) {
      console.log(error);
    }
  },
};