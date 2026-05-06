import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Stack,
} from "@mui/material";
import { ProjectService } from "../services/ProjectService";
import { UserService } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const AddInvestor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    mobile: "",
    email: "",
    state: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
      const response = await UserService.addUser(formData);
      if(response){
        alert("Succesfully Added");
        navigate("/dashboard/investor/users");
      }else{
        alert("Failed to Add");
      }
    }catch(error){
      console.log(error);
    }
    
    // Add further submission logic here
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dob: "",
      mobile: "",
      email: "",
      state: "",
      country: "",
    });
  };

  const handleClose = () => {
    // Logic to close the form or navigate away
    navigate(-1);
  };

  return (
    <Card sx={{ maxWidth: "80%", mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom textAlign="center">
          Add Investor
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Mobile Number", name: "mobile" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "State", name: "state" },
              { label: "Country", name: "country" },
            ].map(({ label, name, type = "text" }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={type === "date" ? { shrink: true } : {}}
                />
              </Grid>
            ))}
          </Grid>
          <CardActions sx={{ justifyContent: "center", mt: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Close
              </Button>
            </Stack>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddInvestor;
