import { useEffect, useState } from "react";
import { ProjectService } from "../services/ProjectService.js";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box, Typography, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddProject from "./Addproject.jsx";
import { useNavigate } from "react-router-dom";
import WorkflowDataGrid from "./WorkFlowsList.jsx";

export const ProjectList = () => {
    const navigate = useNavigate();
    const [projects, setProjectsList] = useState([]);
    const [isProjectEditMode, setProjectEditMode] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [openConfirmPopup, setOpenConfirmPopup] = useState(false);
    const [workFlowListOpen, setWorkFlowListOpen] = useState(false);
    const [projectDataForWorkFlow, setProjectDataForWorkFLow] = useState(null);

    const onEditClick = (row) => {
        setEditingRow(row);
        setProjectEditMode(true);
    };

    const onDeleteClick = (row) => {
        setEditingRow(row);
        setOpenConfirmPopup(true);
    };

    const fetchProjects = async () => {
        try {
            const projectsData = await ProjectService.getAllProjects();
            setProjectsList(projectsData);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        if (!isProjectEditMode) {
            fetchProjects();
        }
    }, [isProjectEditMode]);

    const handleClose = () => {
        setEditingRow(null);
        setOpenConfirmPopup(false);
    };

    const handleConfirm = async () => {
        setOpenConfirmPopup(false);
        const isDeleted = await ProjectService.deleteProject(editingRow);
        if (isDeleted) {
            alert("Project Deleted");
            fetchProjects();
        } else {
            alert("Error in Deleting Project");
        }
    };

    const onManageWorkFlowsClick = (row) =>{
        setProjectDataForWorkFLow(row);
        setWorkFlowListOpen(true);
    }

    const columns = [
        { field: "Name", headerName: "Name", flex: 1, minWidth: 120 },
        { field: "SCountry", headerName: "Source Country", flex: 1, minWidth: 120 },
        { field: "SPort", headerName: "Source Port", flex: 1, minWidth: 120 },
        { field: "DCountry", headerName: "Destination Country", flex: 1, minWidth: 120 },
        { field: "DPort", headerName: "Destination Port", flex: 1, minWidth: 120 },
        {
            field: "actions",
            headerName: "Actions",
            width: 180,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <Tooltip title="Edit Project">
                        <IconButton onClick={() => onEditClick(params.row)}>
                            <EditIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Manage Workflows">
                        <IconButton onClick={() => onManageWorkFlowsClick(params.row)}>
                            <ManageAccountsIcon color="primary" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Project">
                        <IconButton onClick={() => onDeleteClick(params.row)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    return ( !workFlowListOpen ?
        <Box sx={{mx: "auto" , p: 3, boxShadow: 3, borderRadius: 2}} >

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Project List
                </Typography>
                <Button onClick={() => navigate("/dashboard/project/addproject")} sx={{ border: 1 }}>
                    Add Project
                </Button>
            </Box>
            

            {!isProjectEditMode ? (
                <Box sx={{ height: "auto", m: "10px" }}>
                    <DataGrid
                        autoHeight
                        rows={projects}
                        columns={columns}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10]}
                        getRowId={(row) => row.Name + row.Tag}
                    />
                </Box>
            ) : (
                <AddProject isEditMode={isProjectEditMode} data={editingRow} setEditingMode={setProjectEditMode} />
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={openConfirmPopup} onClose={handleClose}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete the selected project?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} variant="contained" color="error">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
        : workFlowListOpen && projectDataForWorkFlow && (
        <WorkflowDataGrid isFromProjectList={workFlowListOpen} projectData={projectDataForWorkFlow} setWorkFlowListOpen={setWorkFlowListOpen}/>
        )
    );
};
