import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import { ProjectService } from "../services/ProjectService";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Tooltip } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import WorkflowDetails from "./WorkflowDetails";
import UndoIcon from '@mui/icons-material/Undo';


const InvestmentCard = ({ investment,generateMonths,handleProjectTagClick,workflowViewClick ,
   viewWorkflowData,
   viewWorkFlowProjectData,
   setWorkflowViewClick,
   setViewWorkFlowData,
   setViewWorkFlowProjectData,
   viewPreviousWorkFlowsClick,
   setViewPreviousWorkFlowsClick
   }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const months = generateMonths(investment.Date);
    const [projectTags, setProjectTags] = useState(investment.Tags);
    const [projects,setProjects] = useState();
    // const [workflowViewClick,setWorkflowViewClick] = useState(false);
    // const [viewWorkflowData,setViewWorkFlowData] = useState();
    // const [viewWorkFlowProjectData,setViewWorkFlowProjectData] = useState();
    const [isPercentageReturn, setPercentageReturn] = useState(investment.TypeOfReturn=="Percentage");
    
  
    useEffect(() => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
      
      if (canvasRef.current) {
        chartRef.current = new Chart(canvasRef.current, {
          type: "bar",
          data: {
            labels: months,
            datasets: [
              // {
              //   label: "Invested Amount",
              //   data: new Array(months.length).fill(investment.Ammount),
              //   backgroundColor: "blue",
              // },
              {
                label: "Interest Gained",
                data: isPercentageReturn ? months.map((_, index) => ((investment.Ammount * investment.Intrest) / 100) * (index + 1)) : months.map((_, index) => (parseInt((index)* parseInt(investment.Intrest))+parseInt(investment.Intrest))),
                backgroundColor: "green",
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: isPercentageReturn ? "Investment vs Interest Gained Over Time":"Investment vs Return Value Over Time",
              },
            },
            responsive: true,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          },
        });
      }

      fetchProjectsDetails();
    }, [investment]);


    const fetchProjectsDetails = async () => {
      const response = await ProjectService.getProjectsOfTags(projectTags);
      if(response){
        console.log("projects",response);
        setProjects(response);
      }
    }

    // useEffect(() => {
      
    // }, [investment]);

    const columns = [
      { field: "Name", headerName: "Name", flex: 1, minWidth: 120 },
      {
        field: "SCountry",
        headerName: "Source Country",
        flex: 1,
        minWidth: 120,
      },
      { field: "SPort", headerName: "Source Port", flex: 1, minWidth: 120 },
      {
        field: "DCountry",
        headerName: "Destination Country",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "DPort",
        headerName: "Destination Port",
        flex: 1,
        minWidth: 120,
      },
      {
        field: "actions",
        headerName: "C Workflow",
        
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <>
            <Tooltip title="View Workflow">
              <IconButton onClick={() => onViewWorkFlowsClick(params.row)}>
                <ManageAccountsIcon color="primary" />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
      {
        field: "P Workflows",
        headerName: "P Workflows",
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <>
            <Tooltip title="View Previous Workflows">
              <IconButton onClick={() => onViewPreviousWorkFlowClick(params.row)}>
                <UndoIcon color="primary" />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ];

    const onViewWorkFlowsClick = (row) =>{
      //console.log(row);
      setViewWorkFlowProjectData(row);
      setViewWorkFlowData(row.currentWorkflow);
      setWorkflowViewClick(true);
    }


    const onViewPreviousWorkFlowClick = (row)=>{
      setViewWorkFlowProjectData(row);
      setViewWorkFlowData(row.currentWorkflow);
      setViewPreviousWorkFlowsClick(true);
    }
  
    return (
      <>
      {!workflowViewClick && !viewPreviousWorkFlowsClick &&
      (<Box>
        <div
          className="card"
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            display: "flex",
            margin: "10px auto",
          }}
        >
          <div>
            <p>
              <strong>Investment Date:</strong> {investment.Date}
            </p>
            <p>
              <strong>Invested Amount:</strong> ${investment.Ammount}
            </p>
            <p>
              <strong>Return Type:</strong> {investment.TypeOfReturn}
            </p>
            <p>
              <strong>{ isPercentageReturn ? "Interest": "Return Value"}:</strong> {investment.Intrest}{ isPercentageReturn ? "%": ""}
            </p>
            { 
            isPercentageReturn ?(
            <p>
              <strong>Interest Gained:</strong> $
              {((investment.Ammount * investment.Intrest) / 100).toFixed(2)}
            </p>): (<></>)
            // (<p>
            //   <strong>Return Value:</strong> $
            //   {(investment.Intrest)}
            // </p>)
            }
            <strong>Project Tags:</strong>
            {investment.Tags.map((tag, index) => {
              return (
                //<Link to="/project" state={tag} style={{ padding: 10 }}>
                  <>{tag.name}</>
                //</Link>
              );
            })}
          </div>
          <div>
            <canvas ref={canvasRef} width="400" height="200"></canvas>
          </div>
        </div>
        <div>
          <DataGrid
            autoHeight
            rows={projects}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.Name + row.Tag}
          />
        </div>
      </Box>)
}

  
      </>
    );
  };

  export default InvestmentCard;