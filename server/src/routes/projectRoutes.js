import { Router } from "express";
import { projectController } from "../controllers/projectController.js";
import { projectRepository } from "../repositories/projectRepository.js";

const router = Router();

router.get("/GetAllProjects",projectController.getAllProjects);
router.post("/AddProject",projectController.addProject);
router.put("/UpdateProject",projectController.updateProject);
router.delete("/DeleteProject",projectController.deleteProject);
router.post("/AddWorkFlow",projectController.addWorkFlow);
router.get("/GetAllWorkFlows",projectController.getAllWorkFlows);
router.get("/GetWorkFlowsBasedOnProject",projectController.getWorkFlowsBasedOnProjectName);
router.put("/UpdateWorkFlow",projectController.updateWorkFlow);
router.delete("/DeleteWorkFlow",projectController.deleteWorkFlow);
router.post("/GetProjectsOfTags",projectController.getProjectsBasedOnTags);
router.get("/GetWorkFlowBasedOnId",projectController.getWorkFlowBasedOnId);
router.get("/GetPreviousWorkFlowsBasedOnProject",projectController.getPreviousWorkFlowsBasedOnProjectName);

export default router;
