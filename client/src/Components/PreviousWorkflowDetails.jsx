import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ProjectService } from "../services/ProjectService";
import {  Link, CircularProgress, Button } from "@mui/material";
import { IconButton, Box, Typography, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddWorkFlow from "./AddWorkflow";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from "@mui/icons-material/Delete";

const PreviousWorkflowDetails = ({viewPreviousWorkFlowsClick,setViewPreviousWorkFlowsClick,projectDetails}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Initialized as empty array
  const [loading, setLoading] = useState(true);
  const [isEditMode,setEditingMode] = useState(false);
  const [currentEditingRow,setCurrentEditingRow] = useState(null);
  const [isForCreateMode,setWorkFlowForCreateMode] = useState(false);
  const [openConfirmPopup,setOpenConfirmPopup] = useState(false);
  
  const fetchWorkflowsBasedonProject = async (data) =>{
    
    const workFlows = await ProjectService.getPreviousWorkFlowsBasedOnProject(data.Name);
    if(workFlows){
        setData(workFlows);
    }else{
      console.log(workFlows);
    }
  }

  useEffect(()=>{
    if(viewPreviousWorkFlowsClick){
        fetchWorkflowsBasedonProject(projectDetails);
    }
  },[]);

  

  



  const columns = [
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 180,
    //   sortable: false,
    //   filterable: false,
    //   renderCell: (params) => (
    //     <>
    //       <Tooltip title="Edit WorkFlow">
    //         <IconButton onClick={() => onEditClick(params.row)}>
    //           <EditIcon color="primary" />
    //         </IconButton>
    //       </Tooltip>
    //       <Tooltip title="Delete WorkFlow">
    //         <IconButton onClick={() => onDeleteClick(params.row)}>
    //           <DeleteIcon color="error" />
    //         </IconButton>
    //       </Tooltip>
    //     </>
    //   ),
    // },
    { field: "Name", headerName: "Workflow Name", flex: 1, minWidth: 150 },
    {
      field: "ProjectName",
      headerName: "Project Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => {
        const statusMap = { 0: "Awaiting", 1: "In Progress", 2: "Complete" };
        return (
          <Typography variant="body2">
            {statusMap[params.value] || "Unknown"}
          </Typography>
        );
      },
    },
    {
      field: "NoOfContainers",
      headerName: "No Of Containers",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "ContainerSize",
      headerName: "Size of Container",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "TrackingUrl",
      headerName: "Tracking URL",
      flex: 1.2,
      minWidth: 200,
      renderCell: (params) => (
        <Link
          href={params.value}
          target="_blank"
          rel="noopener"
          sx={{ textDecoration: "none", color: "primary.main" }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "activities",
      headerName: "Current Activity",
      flex: 1,
      minWidth: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
        <Typography variant="body2">
          {Object.values(params.row.SourceActivities || {})
            .sort((a, b) => a.index - b.index)
            ?.find((activity) => activity.status === 0 || activity.status === 1)
            ?.label != undefined
            ? Object.values(params.row.SourceActivities || {})
                .sort((a, b) => a.index - b.index)
                ?.find(
                  (activity) => activity.status === 0 || activity.status === 1
                )?.label
            : Object.values(params.row.DestinationActivities || {})
                .sort((a, b) => a.index - b.index)
                ?.find(
                  (activity) => activity.status === 0 || activity.status === 1
                )?.label}
          </Typography>
        </>
      ),
    },
    
  ];

  

  return (
    <>
      <Box>
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Tooltip title="Back to Investments">
              <IconButton
                onClick={() => {
                  setViewPreviousWorkFlowsClick(false);
                }}
                sx={{
                  position: "absolute",
                  left: 0,
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            
          </Box>
        <Box sx={{ height: 450, mt: 3,width: "80vw" }}>
          

          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row.Id}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "14px",
              },
            }}
          />

          
        </Box>
      </Box>
    </>
  );

};

export default PreviousWorkflowDetails;
