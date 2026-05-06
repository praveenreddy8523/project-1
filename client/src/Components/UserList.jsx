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
import { UserService } from "../services/UserService.js";
import { ConstructionOutlined } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Addinvestmentbyuser from "./Addinvestmentbyuser.jsx";
import { InvestmentList } from "./InvestmentsList.jsx";

export const UsersList = () => {
    const navigate = useNavigate();
    const [users,setUsers] = useState(null);
    const [addInvestment,setAddInvestment] = useState(false);
    const [editRow,setEditRow] = useState();
    const [investmentList,setInvestmentList]= useState(false);

    const getUsers = async ()=>{
        try{
            const usersList = await UserService.getAllUsers();
            if(usersList){
                setUsers(usersList);
            }else{
                console.log(error);
            }
        }catch(error){
            console.log(error);
        }
    }
    
    useEffect(()=>{
        getUsers();
    },[]);


    const onAddInvestmentClick = (row) =>{
      console.log("Clicked Add investemnt",row);
      setEditRow(row);
      setAddInvestment(true);
      

      
    }

    const onInvestmentList=(row)=>{
      setEditRow(row);
      setInvestmentList(true);
    }
    
    const columns = [
      {
        field: "actions",
        headerName: "Actions",
        width: 180,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <>
            <Tooltip title="Add Investment">
              <IconButton onClick={() => onAddInvestmentClick(params.row)}>
                <AddIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="List Investments of User">
              <IconButton onClick={() => onInvestmentList(params.row)}>
                <FormatListBulletedIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
      { field: "FirstName", headerName: "First Name", width: 120 },
      { field: "LastName", headerName: "Last Name", width: 120 },
      { field: "DateOfBirth", headerName: "Date of Birth", width: 120 },
      { field: "Email", headerName: "Email", width: 120 },
      { field: "State", headerName: "State", width: 120 },
      { field: "Country", headerName: "Country", width: 120 },
      { field: "Number", headerName: "Phone Number", width: 120 },
      
    ];

    return (<>
      { !addInvestment && !investmentList &&(
      <Box sx={{ml: "auto" , p: 3, boxShadow: 3, borderRadius: 2}} >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Investor List
          </Typography>
          <Button onClick={()=>{
            navigate("/dashboard/investor/addinvestor");
          }} sx={{ border: 1 }}>Add New Investor</Button>
        </Box>

        <Box sx={{ height: "auto", m: "10px" }}>
          <DataGrid
            autoHeight
            rows={users}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.Name + row.Email}
          />
        </Box>
      </Box>)
      }

      {
        addInvestment && !investmentList && (
          <Addinvestmentbyuser setAddInvestment={setAddInvestment} email={editRow.Email}/>
        )
      }
      {
        investmentList && !addInvestment && (
          <InvestmentList user={editRow} setInvestmentList={setInvestmentList} setAddInvestment={setAddInvestment}/>
        )
      }
      </>
    );
};
