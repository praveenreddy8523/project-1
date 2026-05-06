import { useEffect, useState } from "react";
import { InvestmentService } from "../services/InvestmentService";
import InvestmentCard from "./Investmentcards";
import WorkflowDetails from "./WorkflowDetails";
import { Box } from "@mui/material";
import PreviousWorkflowDetails from "./PreviousWorkflowDetails";


const UserInvestments =()=>{

    const [investments,setInvestments] = useState([]);
    const [workflowViewClick,setWorkflowViewClick] = useState(false);
        const [viewWorkflowData,setViewWorkFlowData] = useState();
        const [viewWorkFlowProjectData,setViewWorkFlowProjectData] = useState();
        const [viewPreviousWorkFlowsClick,setViewPreviousWorkFlowsClick] = useState(false);
        
    //const [projectTags,setProjectTags] = useState();

    const fetchInvestmentsOfUser = async () =>{
        const response = await InvestmentService.getInvestments({Email: "kushalchowdary23@gmail.com"});
        if(response){
            console.log(response);
            setInvestments(response);
        }
    }

    useEffect(()=>{
        fetchInvestmentsOfUser();
    },[]);
    return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '800px', // limit max width
              textAlign: 'center', // center the h2
            }}
          >
            { !workflowViewClick && !viewPreviousWorkFlowsClick && (<h2>User Investments</h2>)}
            { !workflowViewClick && !viewPreviousWorkFlowsClick && investments && 
              investments.map((investment, index) => (
                <InvestmentCard
                  key={index}
                  investment={investment}
                  viewWorkFlowProjectData={viewWorkFlowProjectData}
                  setViewWorkFlowProjectData={setViewWorkFlowProjectData}
                  setViewWorkFlowData={setViewWorkFlowData}
                  generateMonths={generateMonths}
                  workflowViewClick={workflowViewClick}
                  setWorkflowViewClick={setWorkflowViewClick}
                  viewWorkflowData={viewWorkflowData}
                  setViewPreviousWorkFlowsClick={setViewPreviousWorkFlowsClick}
                  viewPreviousWorkFlowsClick={viewPreviousWorkFlowsClick}
                />
              ))
            } 
            { workflowViewClick && viewWorkflowData && !viewPreviousWorkFlowsClick && (
                <WorkflowDetails
                  workflowDetails={viewWorkflowData}
                  projectDetails={viewWorkFlowProjectData}
                  setWorkflowViewClick={setWorkflowViewClick}
                />
              )
            }
            {
              viewPreviousWorkFlowsClick && !workflowViewClick && viewWorkflowData &&
              (
                <PreviousWorkflowDetails viewPreviousWorkFlowsClick={viewPreviousWorkFlowsClick} setViewPreviousWorkFlowsClick={setViewPreviousWorkFlowsClick} projectDetails={viewWorkFlowProjectData}/>
              )
            }
          </Box>
        </Box>
      );
      
      
}

export default UserInvestments;

const generateMonths = (startDate) => {
    const start = new Date(startDate);
    const end = new Date();
    const months = [];
  
    while (start <= end) {
      months.push(start.toLocaleString("default", { month: "short", year: "numeric" }));
      start.setMonth(start.getMonth() + 1);
    }
    return months;
};