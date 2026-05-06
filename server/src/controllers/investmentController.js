import { investemntService } from "../service/investmentService.js"

export const investmentController = {
  addInvestment: (req, res) => {
    try {
      const response = investemntService.addInvestment(req.body);
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
  getInvestments: async (req, res) => {
    try {
        const Id = req.query["Id"];
      const response = await investemntService.getInvestments(Id);
      return res.json(response);
    } catch (error) {
      console.log(error);
    }
  },
};