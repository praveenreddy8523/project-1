import { useEffect, useState } from "react";
import { TextField, Button, Autocomplete,FormControl,InputLabel,Select,MenuItem, Container, Typography, Box,Stack } from "@mui/material";
import { ProjectService } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";
import { InvestmentService } from "../services/InvestmentService";


const AddInvestmentByUser = ({setAddInvestment,email}) => {
  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [project,setProject] = useState("Select a Project");
  const [returnType, setReturnType] = useState("percentage");

  const users = ["User 1", "User 2", "User 3", "User 4"]; 

  const [projects,setProjects] = useState({Name:"Example Project"});

  const handleClear = () => {
    setUserEmail("");
    setAmount("");
    setInterest("");
    setProject("");
    setReturnType();
  };

  const getAllProjects = async ()=>{
    try{
      const response = await ProjectService.getAllProjects();
      setProjects(response);
    }catch(error)
    {
      console.log(error);
    }
  }


  useEffect(()=>{
    getAllProjects();
    if(email != "")
    {
      setUserEmail(email);
    }
  },[])

  const handleClose = () => {
    // Logic to close the form, e.g., calling a parent function
    console.log("Close button clicked");
    if(email != ""){
      setAddInvestment(false);
    }else{
      navigate(-1);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const investmentData = {
      email: userEmail,
      ammount : amount,
      interest,
      project: project != "Select a Project" ? {id:project.Id,name:project.Name} : {id:"",name:"Yet To Be Tagged"},
      typeOfReturn: returnType == "percentage" ? "Percentage" : "Return Value"
     };
    console.log(project);
    const response = await InvestmentService.addInvestment(investmentData);
    if(response.status==200)
    {
      alert("Investment Succes");
      setAddInvestment(false);
    }else{
      alert("Error in investment");
    }
    console.log("Investment Submitted: ", investmentData);
  };

  

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" gutterBottom>
          Add Investment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
            margin="normal"
            disabled={true}
          />
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="return-type-label" sx={{
                  background: "white",
                  padding: "0px 9px"
            }}>Type of Investment</InputLabel>
            <Select
              labelId="return-type-label"
              id="return-type"
              value={returnType}
              onChange={(e) => setReturnType(e.target.value)}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>Select Investment Type</MenuItem>
              <MenuItem value="percentage">Percentage of Return</MenuItem>
              <MenuItem value="returnValue">Project Related</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label={returnType == "percentage" ? "Interest (%)" : "Return Value"}
            type="number"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
            margin="normal"
          />
          <Autocomplete
            fullWidth
            options={projects}
            getOptionLabel={(option) => option.Name}
            onChange={(event, newValue) => setProject(newValue)}
            renderInput={(params) => <TextField {...params} label="Project" margin="normal" />}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Add Investment
            </Button>
            <Button onClick={handleClear} variant="outlined" color="secondary">
              Clear
            </Button>
            <Button onClick={handleClose} variant="text" color="error">
              Close
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default AddInvestmentByUser;
