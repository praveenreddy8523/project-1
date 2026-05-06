import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, Button, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthService } from "../services/AuthService";

const drawerWidth = 200; // Fixed drawer width

const AdminDrawer = ({setDrawerOpen,isDrawerOpen}) => {
    const navigate = useNavigate();

    const [projectAnchor, setProjectAnchor] = useState(null);
  const [investorAnchor, setInvestorAnchor] = useState(null);

  // Handlers for Project Dropdown
  const handleProjectClick = (event) => setProjectAnchor(event.currentTarget);
  const handleProjectClose = () => setProjectAnchor(null);

  // Handlers for Investor Dropdown
  const handleInvestorClick = (event) => setInvestorAnchor(event.currentTarget);
  const handleInvestorClose = () => setInvestorAnchor(null);

    return (
        <Box sx={{ width: drawerWidth, padding: 2 }}>
            
            {/* <Button fullWidth onClick={() => navigate("/dashboard/addinvestment")}>
                Add Investment by User
            </Button>
            <Button fullWidth onClick={() => navigate("/dashboard/addprojecttag")}>
                Add Project Tag to Investment of User
            </Button> */}
            <Button fullWidth onClick={() => 
            {
              setDrawerOpen(!isDrawerOpen);
              navigate("/dashboard/project") ;
              
            }}>
                Project Management
            </Button>
            <Button fullWidth onClick={() => 
              {
                setDrawerOpen(!isDrawerOpen);
                navigate("/dashboard/investor");
                
              }}>
                Investor Management
            </Button>
            {/* <Button fullWidth onClick={() => navigate("addproject")}>
                Add Project
            </Button>
            <Button fullWidth onClick={() => navigate("projects")}>
                Projects List
            </Button> */}
            {/* <Button fullWidth onClick={() => navigate("addinvestor")}>
                Add Investor
            </Button>
            <Button fullWidth onClick={() => navigate("/dashboard/users")}>
                Investors
            </Button> */}
            {/* <Button fullWidth onClick={() => navigate("/dashboard/addinvestment")}>
                Add Investment by User
            </Button> */}
            {/* <Button fullWidth onClick={() => navigate("/dashboard/addworkflow")}>
                Add WorkFlow 
            </Button> */}
            {/* <Button fullWidth onClick={() => navigate("/dashboard/workflows")}>
                WorkFlow List
            </Button> */}
            
        </Box>
    );
};

const AdminLayout = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(true);
    const navigate = useNavigate();
    const LogoutUser = ()=>{
        AuthService.logout();
        navigate("/");
        
    }

    return (
      <Box sx={{ display: "flex" }}>
        {/* AppBar */}
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>

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

        <Drawer variant="persistent" open={isDrawerOpen}>
          <AdminDrawer setDrawerOpen={setDrawerOpen} isDrawerOpen={isDrawerOpen}/>
        </Drawer>

        {/* Main Content (Starts from 251px) */}
        <Box
          component="main"
          sx={{
            marginLeft: isDrawerOpen ? "250px" : "50px", // Ensure content starts from 251px
          }}
        >
          <Toolbar /> {/* Pushes content below AppBar */}
          <Outlet />
        </Box>
      </Box>
    );
};

export default AdminLayout;
