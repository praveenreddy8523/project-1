import { projectService } from "../service/projectService.js"

export const projectController = {
  getAllProjects: async (req, res) => {
    const projects = await projectService.getAllProjects();
    return res.json(projects);
  },
  addProject: async (req, res) => {
    try {
      const status = await projectService.addProject(req.body);
      return res.json(status);
    } catch (error) {
      console.log(error);
    }
  },
  updateProject: async (req, res) => {
    try {
      const status = await projectService.updateProject(req.body);
      return res.json(status);
    } catch (error) {
      console.log(error);
    }
  },
  deleteProject: async (req, res) => {
    try {
      const status = await projectService.deleteProject(req.body);
      return res.json(status);
    } catch (error) {
      console.log(error);
    }
  },
  addWorkFlow: async (req, res) => {
    try {
      const status = await projectService.addWorkFlow(req.body);
      return res.json(status);
    } catch (error) {}
  },
  updateWorkFlow: async (req, res) => {
    try {
      const status = await projectService.updateWorkFlow(req.body);
      return res.json(status);
    } catch (error) {
      console.log(error);
    }
  },
  deleteWorkFlow: async (req, res) => {
    try {
      const status = await projectService.deleteWorkFlow(req.body);
      return res.json(status);
    } catch (error) {
      console.log(error);
    }
  },
  getAllWorkFlows: async (req, res) => {
    try {
      const workflows = await projectService.getAllWorkFlows();
      return res.json(workflows);
    } catch (error) {}
  },
  getWorkFlowsBasedOnProjectName: async (req, res) => {
    try {
      //const project
      const workflows = await projectService.getWorkFlowsBasedOnProjectName(
        req.query["Name"]
      );
      return res.json(workflows);
    } catch (error) {
      console.log(error);
    }
  },
  getProjectsBasedOnTags: async (req, res) => {
    try {
      const projects = await projectService.getProjectsBasedOnTags(req.body);
      return res.json(projects);
    } catch (error) {
      console.log(error);
    }
  },
  getWorkFlowBasedOnId: async (req, res) => {
    try {
      const workflow = await projectService.getWorkFlowBasedOnId(req.query["Id"]);
      return res.json(workflow);
    } catch (error) {
      console.log(error);
    }
  },
   getPreviousWorkFlowsBasedOnProjectName: async (req, res) => {
    try {
      //const project
      const workflows = await projectService.getPreviousWorkFlowsBasedOnProjectName(
        req.query["Name"]
      );
      return res.json(workflows);
    } catch (error) {
      console.log(error);
    }
  },
};