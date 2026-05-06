import { AppBar, Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import LogoutIcon from '@mui/icons-material/Logout';
import UserInvestments from "./UserInvestments";


const UserLayout = ()=>{
    const navigate = useNavigate();
    const LogoutUser = ()=>{
        AuthService.logout();
        navigate("/");
        
    }
    return (
        <>
        <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar>
            <img
              src="/assets/img/mantrixlogo.jpg"
              alt="Logo"
              height="60px"
              width="60px"
            />

            {/* Empty space to push logout button to the end */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Logout Button at the end of the toolbar */}
            <Tooltip title="Logout">
            <IconButton
              variant="contained"
              color="white"
              sx={{ background: "white" }}
              
            >
              <LogoutIcon onClick={()=>{(LogoutUser())}}/>
            </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box sx={{ mt: 8,ml: 2 }}>
            <UserInvestments />
        </Box>
        </Box>
    </>);
}

export default UserLayout;