import { investmentRepository } from "../repositories/investmentRepository.js"

export const investemntService= {
    addInvestment: async (data) =>{
        const investmentData = {
            UserId : data.email,
            Ammount : data.ammount,
            Date : new Date().toISOString(),
            TypeOfReturn: data.typeOfReturn,
            Intrest: data.interest,
            Tags : [data.project]
        }
        return await investmentRepository.addInvestment(investmentData);
    },
    getInvestments: async (Id) =>{
        return await investmentRepository.getInvestments(Id);
    }
}