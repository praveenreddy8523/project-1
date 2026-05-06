import Project from "../models/Project.js"
import WorkFlow from "../models/WorkFlow.js";
import { Op } from 'sequelize';

export const projectRepository = {
  getAllProjects: async () => {
    try {
      const projects = await Project.findAll();
      return projects;
    } catch (error) {
      console.log(error);
    }
  },
  addProject: async (data) => {
    try {
      const status = await Project.create(data);
      return !!status;
    } catch (error) {
      console.log(error);
    }
  },

  updateProject: async (data) => {
    try {
      const { Name, Tag, ...updateFields } = data;

      const project = await Project.findOne({ where: { Name, Tag } });
      if (!project) {
        throw new Error("Project not found.");
      }
      const updatedProject = await project.update(updateFields);
      return !!updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },
  deleteProject: async (data) => {
    try {
      const { Name, Tag } = data;

      const project = await Project.findOne({ where: { Name, Tag } });
      if (!project) {
        throw new Error("Project not found.");
      }
      const isDeleted = await project.destroy();
      return !!isDeleted;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },
  getAllWorkFlows: async () => {
    try {
      const workflows = await WorkFlow.findAll();
      return workflows;
    } catch (error) {
      console.log(error);
    }
  },
  addWorkFlow: async (data) => {
    try {
      const status = await WorkFlow.create(data);
      return !!status;
    } catch (error) {
      console.log(error);
    }
  },
  updateWorkFlow: async (data) => {
    try {
      const { Name, ProjectName, ...updateFields } = data;

      const workFlow = await WorkFlow.findOne({ where: { Name, ProjectName } });
      if (!WorkFlow) {
        throw new Error("Workflow not found.");
      }
      const updatedWorkFlow = await workFlow.update(updateFields);
      return !!updatedWorkFlow;
    } catch (error) {
      console.error("Error updating workflow:", error);
      throw error;
    }
  },
  deleteWorkFlow: async (data) => {
    try {
      const { ProjectName, Name } = data;

      const workflow = await WorkFlow.findOne({ where: { Name, ProjectName } });
      if (!workflow) {
        throw new Error("Workflow not found.");
      }
      const isDeleted = await workflow.destroy();
      return !!isDeleted;
    } catch (error) {
      console.error("Error deleting workflow:", error);
      throw error;
    }
  },
  getWorkFlowsBasedOnProjectName: async (projectName) => {
    try {
      const workflows = await WorkFlow.findAll({
        where: { ProjectName: projectName },
      });
      return workflows;
    } catch (error) {
      console.log(error);
    }
  },
  getProjectsBasedOnTags: async (tagIds) => {
    try {
      const projects = await Project.findAll({
        where: {
          Id: {
            [Op.in]: tagIds,
          },
        }
      });

      return projects;
    } catch (error) {
      console.log(error);
    }
  },
  getWorkFlowBasedOnId: async (id)=>{
    try{
      const workflow = await WorkFlow.findOne({where:{Id:id}});
      return workflow;
      }catch(error){
        console.log(error);
      }
  },
  getPreviousWorkFlowsBasedOnProjectName: async (projectName) => {
    try {
      const workflows = await WorkFlow.findAll({
        where: { ProjectName: projectName },
      });
      return workflows.filter((workFlow)=>workFlow.Status == 2);
    } catch (error) {
      console.log(error);
    }
  },

};