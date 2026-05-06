import React, { useState,useEffect } from 'react';
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Paper,
  Box
} from '@mui/material';
import { ProjectService } from '../services/ProjectService';
import { useNavigate } from 'react-router-dom';

const AddWorkFlow = ({isEditMode,forEditData,setEditingMode,isForCreateMode,setWorkFlowForCreateMode}) => {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState(0);
  const [noOfContainers, setNoOfContainers] = useState('');
  const [sizeOfContainers, setSizeOfContainers] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [url,setUrl] = useState("");

  const [sourceActivities, setSourceActivities] = useState({
    orderConfirmation: { index: 1, label: "Order Confirmation", status: 0, comments: '', files: null, timestamp: null },
    advancePayment: { index: 2, label: "Advance Payment", status: 0, comments: '', files: null, timestamp: null },
    materialProcessing: { index: 3, label: "Material Processing", status: 0, comments: '', files: null, timestamp: null },
    materialPacking: { index: 4, label: "Material Packing", status: 0, comments: '', files: null, timestamp: null },
    shippedToPort: { index: 5, label: "Shipped to Port", status: 0, comments: '', files: null, timestamp: null },
    sailing: { index: 6, label: "Sailing", status: 0, comments: '', files: null, timestamp: null },
  });
  
  const [destinationActivities, setDestinationActivities] = useState({
    arrivedAtDestinationPort: { index: 1, label: "Arrived at Destination Port", status: 0, comments: '', files: null, timestamp: null },
    customsClearance: { index: 2, label: "Customs Clearance", status: 0, comments: '', files: null, timestamp: null },
    shippedToBuyer: { index: 3, label: "Shipped to Buyer", status: 0, comments: '', files: null, timestamp: null },
    paymentFromBuyer: { index: 4, label: "Payment from Buyer", status: 0, comments: '', files: null, timestamp: null },
  });
  

  const setValues = (editData) =>{
      setWorkflowName(editData.Name);
      setProjectName(editData.ProjectName);
      setStatus(editData.Status);
      setNoOfContainers(editData.NoOfContainers);
      setSizeOfContainers(editData.ContainerSize);
      setTrackingUrl(editData.TrackingUrl);
      setSourceActivities(editData.SourceActivities);
      setDestinationActivities(editData.DestinationActivities);
  }

  useEffect(()=>{
    if(isEditMode){
      setValues(forEditData);
    }else{
      setProjectName(forEditData.ProjectName);
    }
  },[isEditMode])

  const handleActivityChange = (setActivityState) => (activity, field, value) => {
    //console.log(activity,field,value);
      setActivityState((prev) => ({
        ...prev,
        [activity]: {
          ...prev[activity],
          [field]: value,
          ["timestamp"]: new Date().toISOString(),
        },
      }));
    
  };

  const handleFileChange = (activityType, activity, event) => {
    const file = event.target.files[0];

    const maxSizeMB = 7;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      alert(`File size should not exceed ${maxSizeMB} MB`);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result; // This is the file content in Base64 format
      setUrl(fileContent); // Set URL correctly

      if (!activity) {
        console.error("Activity is undefined or null");
        return;
      }

      if (activityType === "source") {
        setSourceActivities((prev) => ({
          ...prev,
          [activity]: {
            ...(prev[activity] || {}),
            files: fileContent,
          },
        }));
      } else {
        setDestinationActivities((prev) => ({
          ...prev,
          [activity]: {
            ...(prev[activity] || {}),
            files: fileContent,
          },
        }));
      }
    };

    // Call this AFTER setting the `onload` handler
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(url);
    const data = { workflowName, projectName, status, noOfContainers, sizeOfContainers, sourceActivities, destinationActivities, trackingUrl };
    let response = null;
    if(isEditMode){
      response = await ProjectService.updateWorkFlow(data);
    }else{
      response = await ProjectService.addWorkFlow(data);
    }
    if(response){
      alert("Sucess");
    }else{
      alert("Not Added Some error");
    }
    if(isEditMode||isForCreateMode){
      setEditingMode(false);
      setWorkFlowForCreateMode(false);
    }
    console.log('Submitted Data:', JSON.stringify(data, null, 2));
  };

  const handleClose=()=>{
    if(isEditMode||isForCreateMode){
      setEditingMode(false);
      setWorkFlowForCreateMode(false);
    }else{
      handleClear();
      navigate(-1);
    }
  }

  const handleClear = () => {
    setWorkflowName('');
    setProjectName('');
    setStatus(0);
    setTrackingUrl('');
    setSourceActivities({
      orderConfirmation: { index: 1, label: "Order Confirmation", status: 0, comments: '', files: null, timestamp: null },
      advancePayment: { index: 2, label: "Advance Payment", status: 0, comments: '', files: null, timestamp: null },
      materialProcessing: { index: 3, label: "Material Processing", status: 0, comments: '', files: null, timestamp: null },
      materialPacking: { index: 4, label: "Material Packing", status: 0, comments: '', files: null, timestamp: null },
      shippedToPort: { index: 5, label: "Shipped to Port", status: 0, comments: '', files: null, timestamp: null },
      sailing: { index: 6, label: "Sailing", status: 0, comments: '', files: null, timestamp: null },
    });
    setDestinationActivities({
      arrivedAtDestinationPort: { index: 1, label: "Arrived at Destination Port", status: 0, comments: '', files: null, timestamp: null },
      customsClearance: { index: 2, label: "Customs Clearance", status: 0, comments: '', files: null, timestamp: null },
      shippedToBuyer: { index: 3, label: "Shipped to Buyer", status: 0, comments: '', files: null, timestamp: null },
      paymentFromBuyer: { index: 4, label: "Payment from Buyer", status: 0, comments: '', files: null, timestamp: null },
    });
  };

  const getFilteredActivities = (activities) => {
    const keys = Object.keys(activities).sort((a, b) => activities[a].index - activities[b].index);
    const firstZeroIndex = keys.map((key) => activities[key].status).indexOf(0);
    return firstZeroIndex === -1 ? keys.slice(0) : keys.slice(0, firstZeroIndex + 1);
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 700, margin: "auto", mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isEditMode ? "Update WorkFlow" : "Add WorkFlow"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Project Name"
              fullWidth
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Workflow Name"
              fullWidth
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <SelectDropdown
              label="Status"
              value={status}
              onChange={setStatus}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="No Of Containers"
              fullWidth
              value={noOfContainers}
              onChange={(e) => setNoOfContainers(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Containers Size"
              fullWidth
              value={sizeOfContainers}
              onChange={(e) => setSizeOfContainers(e.target.value)}
              required
            />
          </Grid>

          {/* Source Activities */}
          <Grid item xs={12}>
            <Typography variant="h6">Source Activities</Typography>
          </Grid>
          {getFilteredActivities(sourceActivities).map((activity) => (
            <Grid item xs={12} key={activity}>
              <SelectDropdown
                label={sourceActivities[activity].label}
                value={sourceActivities[activity].status}
                onChange={(newValue) =>
                  handleActivityChange(setSourceActivities)(
                    activity,
                    "status",
                    newValue
                  )
                }
              />

              <>
                <TextField
                  label="Any Comments"
                  fullWidth
                  multiline
                  rows={2}
                  value={sourceActivities[activity].comments}
                  onChange={(e) =>
                    handleActivityChange(setSourceActivities)(
                      activity,
                      "comments",
                      e.target.value
                    )
                  }
                  sx={{ mt: 1 }}
                />
                <Box sx={{ mt: 1 }}>
                  <input
                    type="file"
                    accept=".jpg,.png"
                    onChange={(e) => handleFileChange("source", activity, e)}
                    style={{ display: "none" }}
                    id={`file-upload-${activity}`}
                  />
                  <label htmlFor={`file-upload-${activity}`}>
                    <Button variant="contained" component="span">
                      Upload File
                    </Button>
                  </label>
                  <Box>
                    {/* {
                        sourceActivities[activity].files && sourceActivities[activity].files.map((file) => (
                          <img key={file} src={file} style={{width:"100px",height:"100px"}}/>
                        ))
                      
                        } */}
                    {sourceActivities[activity].files != "" &&
                      sourceActivities[activity].files != null && (
                        <img
                          src={sourceActivities[activity].files}
                          style={{ width: "100px", height: "100px" }}
                        />
                      )}
                  </Box>
                </Box>
                <Box>
                {activity == "sailing" && (
                  <Grid item xs={12}>
                    <TextField
                      label="Enter Tracking URL"
                      type="url"
                      fullWidth
                      value={trackingUrl}
                      onChange={(e) => setTrackingUrl(e.target.value)}
                    />
                  </Grid>
                )}
                </Box>
              </>
            </Grid>
          ))}

          {/* Destination Activities */}
          {Object.keys(sourceActivities).length ==
            getFilteredActivities(sourceActivities).length && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6">Destination Activities</Typography>
              </Grid>
              {getFilteredActivities(destinationActivities).map((activity) => (
                <Grid item xs={12} key={activity}>
                  <SelectDropdown
                    label={destinationActivities[activity].label}
                    value={destinationActivities[activity].status}
                    onChange={(newValue) =>
                      handleActivityChange(setDestinationActivities)(
                        activity,
                        "status",
                        newValue
                      )
                    }
                  />
                  <>
                    <TextField
                      label="Any Comments"
                      fullWidth
                      multiline
                      rows={2}
                      value={destinationActivities[activity].comments}
                      onChange={(e) =>
                        handleActivityChange(setDestinationActivities)(
                          activity,
                          "comments",
                          e.target.value
                        )
                      }
                      sx={{ mt: 1 }}
                    />
                    <Box sx={{ mt: 1 }}>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) =>
                          handleFileChange("destination", activity, e)
                        }
                        style={{ display: "none" }}
                        id={`file-upload-${activity}`}
                      />
                      <label htmlFor={`file-upload-${activity}`}>
                        <Button variant="contained" component="span">
                          Upload File
                        </Button>
                      </label>
                      <img
                        src={destinationActivities[activity].file}
                        alt="uploaded image"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Box>
                  </>
                </Grid>
              ))}
            </>
          )}

          {/* Buttons */}
          <Grid item xs={12} sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              {isEditMode ? "Update" : "Submit"}
            </Button>

            {!isEditMode && (
              <Button
                onClick={handleClear}
                variant="outlined"
                color="secondary"
              >
                Clear
              </Button>
            )}
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Close
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const SelectDropdown = ({ label, value, onChange }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={(e) => onChange(e.target.value)} label={label}>
        <MenuItem value={0}>Awaiting</MenuItem>
        <MenuItem value={1}>In-Progress</MenuItem>
        <MenuItem value={2}>{label.toLowerCase().includes("payment") ? "Received" : "Completed"}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default AddWorkFlow;
