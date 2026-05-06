import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const Home = ()=>{

    const navigate = useNavigate();
    const handleLoginClick = ()=>
    {
        navigate('/login');
    }
    
    const handleAdminLoginClick=()=>{
        navigate('/adminlogin');
    }

    return (<>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column", // Stacks buttons vertically
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full-page height
        bgcolor: "whitesmoke", // Light background color
      }}
    >
      <Button 
        onClick={handleAdminLoginClick} 
        sx={{ border: "2px solid black", mb: 2, px: 4, py: 1 }}
        variant="outlined"
      >
        Admin Login
      </Button>
      <Button 
        onClick={handleLoginClick} 
        sx={{ px: 4, py: 1 }}
        variant="contained"
      >
        Login
      </Button>
    </Box>
    </>);
}

export default Home;