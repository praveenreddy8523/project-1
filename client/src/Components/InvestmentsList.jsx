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
import { InvestmentService } from "../services/InvestmentService";
export const InvestmentList= ({user,setInvestmentList,setAddInvestment})=>{


    const [investments,setInvestmnets] = useState();


    const fetchInvestments = async (user)=>{
        try{
            const investments = await InvestmentService.getInvestments(user);
            setInvestmnets(investments);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchInvestments(user);
    },[]);


    const columns = [
        { field: "UserId", headerName: "User ID", width: 150 },
        { field: "Ammount", headerName: "Amount", width: 150 },
        { field: "Date", headerName: "Date", width: 150 },
        { field: "TypeOfReturn", headerName: "Type of Return", width: 150 },
        { field: "Intrest", headerName: "Interest / Return Value", width: 180 },
        
        {
          field: "Tags",
          headerName: "Tags",
          width: 250,
          renderCell: (params) => (
            // <Tooltip title={JSON.stringify(params.row.Tags)}>
              <span>{params.row.Tags.map(tag => tag.name).join(", ")}</span>
            // </Tooltip>
          ),
        },
      ];
      
    return (<>
        <Box
        sx={{
          width: "900px",
          mx: "auto",
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
            <IconButton
                onClick={() => {
                    setInvestmentList(false);
                }}
              >
                <ArrowBackIcon />
              </IconButton>
          <Typography variant="h4" gutterBottom>
            Investments
          </Typography>
          <Button onClick={()=>{
            setInvestmentList(false);
            setAddInvestment(true);
          }} sx={{ border: 1 }}>Add New Invesment</Button>
        </Box>

        <Box sx={{ height: "auto" }}>
          <DataGrid
            autoHeight
            rows={investments}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
            getRowId={(row) => row.Id }
          />
        </Box>
      </Box>
      </>
    );
}