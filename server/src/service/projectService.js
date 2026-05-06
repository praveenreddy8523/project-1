import Project from "../models/Project.js";
import { projectRepository } from "../repositories/projectRepository.js"

export const projectService = {
  rand: (n = 4) => Math.floor(Math.random() * Math.pow(10, n)),
  getAllProjects: async () => {
    return projectRepository.getAllProjects();
  },
  addProject: async (data) => {
    const projectModel = {
      Name: data.projectName,
      Tag: data.tag || data.projectName + "" + projectService.rand(4),
      Description: data.description,
      SCountry: data.sourceCountry,
      SPort: data.sourcePort,
      DCountry: data.destinationCountry,
      DPort: data.destinationPort,
      ProductType: data.productType,
    };
    return projectRepository.addProject(projectModel);
  },
  updateProject: async (data) => {
    const projectModel = {
      Name: data.projectName,
      Tag: data.tag || "DefaultTag",
      Description: data.description,
      SCountry: data.sourceCountry,
      SPort: data.sourcePort,
      DCountry: data.destinationCountry,
      DPort: data.destinationPort,
      ProductType: data.productType,
    };
    return projectRepository.updateProject(projectModel);
  },
  deleteProject: async (data) => {
    return projectRepository.deleteProject({ Name: data.Name, Tag: data.Tag });
  },
  addWorkFlow: async (data) => {
    const workFlowModel = {
      Name: data.workflowName,
      ProjectName: data.projectName,
      Status: data.status,
      NoOfContainers: data.noOfContainers,
      ContainerSize: data.sizeOfContainers,
      TrackingUrl: data.trackingUrl,
      SourceActivities: data.sourceActivities,
      DestinationActivities: data.destinationActivities,
    };
    return projectRepository.addWorkFlow(workFlowModel);
  },
  updateWorkFlow: async (data) => {
    const workFlowModel = {
      Name: data.workflowName,
      ProjectName: data.projectName,
      Status: data.status,
      NoOfContainers: data.noOfContainers,
      ContainerSize: data.sizeOfContainers,
      TrackingUrl: data.trackingUrl,
      SourceActivities: data.sourceActivities,
      DestinationActivities: data.destinationActivities,
    };
    return projectRepository.updateWorkFlow(workFlowModel);
  },
  deleteWorkFlow: async (data) => {
    return projectRepository.deleteWorkFlow({
      ProjectName: data.ProjectName,
      Name: data.Name,
    });
  },
  getAllWorkFlows: async () => {
    return projectRepository.getAllWorkFlows();
  },
  getWorkFlowsBasedOnProjectName: async (projectName) => {
    return projectRepository.getWorkFlowsBasedOnProjectName(projectName);
  },
  getProjectsBasedOnTags: async (tags) => {
    const tagIds = tags.map((tag) => tag.id);
    let projects = await projectRepository.getProjectsBasedOnTags(tagIds);

    let projectModels=[];
    projects.map((project)=>{
        projectModels.push({
            Id: project.Id,
            Name: project.Name,
            Tag: project.Tag,
            Description: project.Description,
            SCountry: project.SCountry,
            DCountry: project.DCountry,
            SPort: project.SPort,
            DPort: project.DPort,
            ProductType: project.ProductType
        });
    });

    // Use Promise.all to ensure all async operations are completed before proceeding
    await Promise.all(
        projectModels.map(async (project, index) => {
        const workflows =
          await projectRepository.getWorkFlowsBasedOnProjectName(project.Name);
        project.completedWorkflowsCount = workflows.filter(
                                          (workflow) => workflow.Status == 2
                                          ).length;
        const currWorkFlow = workflows.find(
            (workflow) => workflow.Status != 2
          );
        project.currentWorkflow = {Id:currWorkFlow.Id,Name:currWorkFlow.Name};
      })
    );
    return projectModels;
  },
  getWorkFlowBasedOnId:async (id)=>{
    return projectRepository.getWorkFlowBasedOnId(id);
  },
  getPreviousWorkFlowsBasedOnProjectName: async (projectName) => {
    return projectRepository.getPreviousWorkFlowsBasedOnProjectName(projectName);
  },
};