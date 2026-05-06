import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "../services/ProjectService";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const AddProject = ({ isEditMode, data, setEditingMode }) => {
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [sourceCountry, setSourceCountry] = useState("");
  const [sourcePort, setSourcePort] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [destinationPort, setDestinationPort] = useState("");
  const [productType, setProductType] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const countryList = [
    "Afghanistan",
    "Australia",
    "Bangladesh",
    "Canada",
    "China",
    "Dubai",
    "Ghana",
    "India",
    "Israel",
    "Japan",
    "Kuwait",
    "Malaysia",
    "Myanmar",
    "Philippines",
    "Qatar",
    "Saudi Arabia",
    "Singapore",
    "Sri Lanka",
    "Taiwan",
    "Tanzania",
    "United Kingdom",
    "United States of America",
    "Vietnam",
  ];

  useEffect(() => {
    if (isEditMode) {
      setTag(data.Tag);
      setProjectName(data.Name);
      setDescription(data.Description);
      setSourceCountry(data.SCountry);
      setSourcePort(data.SPort);
      setDestinationCountry(data.DCountry);
      setDestinationPort(data.DPort);
      setProductType(data.ProductType);
    }
  }, [isEditMode, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      projectId,
      projectName,
      description,
      sourceCountry,
      sourcePort,
      destinationCountry,
      destinationPort,
      productType,
      tag,
    };

    let status;
    if (!isEditMode) {
      status = await ProjectService.addProject(projectData);
      if (status) {
        alert("Project Added Successfully");
        navigate("/dashboard/project/projects");
      }
    } else {
      status = await ProjectService.updateProject(projectData);
      if (status) {
        alert("Project Updated Successfully");
        setEditingMode(false);
      }
    }

    if (!status) alert("Some Error");
  };

  const handleClear = () => {
    setProjectId("");
    setProjectName("");
    setDescription("");
    setSourceCountry("");
    setSourcePort("");
    setDestinationCountry("");
    setDestinationPort("");
    setProductType("");
    setTag("");
  };

  const handleClose = () => {
    handleClear();
    isEditMode ? setEditingMode(false) : navigate(-1);
  };

  return (
    <Box sx={{ maxWidth: "80%", mx: "10px", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {isEditMode ? "Edit Project" : "Add Project"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Project Name */}
          <Grid item xs={12}>
            <TextField
              label="Project Name"
              variant="outlined"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              disabled={isEditMode}
            />
          </Grid>

          {/* Project Description */}
          <Grid item xs={12}>
            <TextField
              label="Project Description"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>

          {/* Source Country & Port */}
          <Grid item xs={6}>
            <TextField
              select
              label="Source Country"
              variant="outlined"
              fullWidth
              value={sourceCountry}
              onChange={(e) => setSourceCountry(e.target.value)}
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Source Port"
              variant="outlined"
              fullWidth
              value={sourcePort}
              onChange={(e) => setSourcePort(e.target.value)}
              required
            />
          </Grid>

          {/* Destination Country & Port */}
          <Grid item xs={6}>
            <TextField
              select
              label="Destination Country"
              variant="outlined"
              fullWidth
              value={destinationCountry}
              onChange={(e) => setDestinationCountry(e.target.value)}
              required
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {countryList.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Destination Port"
              variant="outlined"
              fullWidth
              value={destinationPort}
              onChange={(e) => setDestinationPort(e.target.value)}
              required
            />
          </Grid>

          {/* Product Type */}
          <Grid item xs={12}>
            <TextField
              label="Product Type"
              variant="outlined"
              fullWidth
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            {isEditMode ? "Update Project" : "Submit Project"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear Data
          </Button>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close/Back
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProject;
