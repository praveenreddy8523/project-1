import { Outlet, useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AdminLayout from "../Components/AdminLayout";

const AdminDashboard = ()=>{
    //const navigate = useNavigate();
    // const handleAddProjectClick = ()=>{
    //     navigate('addproject');
    // }

    // const handleAddInvestmentClick = ()=>{
    //     navigate('addinvestment');
    // }

    // const handleAddProjectTagClick = ()=>{
    //     navigate('addprojecttag')
    // }

    // const handleProjectsListClick=()=>{
    //     navigate('projects');
    // }
    return (<>
    <AdminLayout/>
    
    </>);
}

export default AdminDashboard;