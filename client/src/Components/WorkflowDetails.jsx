import { useEffect, useState } from "react";
import { ProjectService } from "../services/ProjectService";
import { Box, Typography, Chip, Button, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WorkflowDetails = ({ workflowDetails, projectDetails, setWorkflowViewClick }) => {
  const [workflow, setWorkflow] = useState(null);

  const countryList = [
    { name: "Afghanistan", link: "/assets/flags/af.png" },
    { name: "Australia", link: "/assets/flags/Australia.png" },
    { name: "Bangladesh", link: "/assets/flags/Bangladesh.png" },
    { name: "Canada", link: "/assets/flags/canada.png" },
    { name: "China", link: "/assets/flags/China.png" },
    { name: "Dubai", link: "/assets/flags/UAEDubai.png" },
    { name: "Ghana", link: "/assets/flags/Gaana.png" },
    { name: "India", link: "/assets/flags/India.png" },
    { name: "Israel", link: "/assets/flags/Israel.png" },
    { name: "Japan", link: "/assets/flags/Japan.png" },
    { name: "Kuwait", link: "/assets/flags/Kuwait.png" },
    { name: "Malaysia", link: "/assets/flags/Malaysia.png" },
    { name: "Myanmar", link: "/assets/flags/myanmar.png" },
    { name: "Philippines", link: "/assets/flags/Philippines.png" },
    { name: "Qatar", link: "/assets/flags/Qatar.png" },
    { name: "Saudi Arabia", link: "/assets/flags/SaudiArabia.png" },
    { name: "Singapore", link: "/assets/flags/Singapore.png" },
    { name: "Sri Lanka", link: "/assets/flags/srilanka.png" },
    { name: "Taiwan", link: "/assets/flags/taiwan.png" },
    { name: "United Kingdom", link: "/assets/flags/UK.png" },
    { name: "United States of America", link: "/assets/flags/USA.png" },
    { name: "Vietnam", link: "/assets/flags/Vietnam.png" },
  ];

  const sCountryLink = countryList.find(item => item.name === projectDetails?.SCountry)?.link || "";
  const dCountryLink = countryList.find(item => item.name === projectDetails?.DCountry)?.link || "";

  const fetchWorkFlowDetails = async () => {
    const response = await ProjectService.getWorkFlowBasedOnId(workflowDetails.Id);
    if (response) {
      setWorkflow(response);
    }
  };

  const getSortedActivities = (activities) => {
    const keys = Object.keys(activities).sort((a, b) => activities[a].index - activities[b].index);
    return keys.map(key => activities[key]);
  };

  const getStatusLabel = (status) => {
    if (status === 0) return { label: "Awaiting", color: "default" };
    if (status === 1) return { label: "In Progress", color: "warning" };
    if (status === 2) return { label: "Completed", color: "success" };
    return { label: "Unknown", color: "default" };
  };

  useEffect(() => {
    fetchWorkFlowDetails();
  }, []);

  const calculateProgress = () => {
    if (!workflow) return 0;
    const totalActivities = Object.keys(workflow.SourceActivities || {}).length + Object.keys(workflow.DestinationActivities || {}).length;
    const completedActivities = [...Object.values(workflow.SourceActivities || {}), ...Object.values(workflow.DestinationActivities || {})]
      .filter(act => act.status === 2).length;
    return (completedActivities / totalActivities) * 100;
  }

  return (
    <>
      {workflow && (
        <Box width="90vw" p={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Tooltip title="Back to Investments">
              <IconButton
                onClick={() => {
                  setWorkflowViewClick(false);
                }}
                sx={{
                  position: "absolute",
                  left: 0,
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h5" fontWeight="bold" mb={2}>
              {workflow.Name}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box textAlign="center">
              <Typography variant="h6">Source</Typography>
              {sCountryLink && (
                <img
                  src={sCountryLink}
                  alt="source-flag"
                  style={{ width: "120px", height: "80px" }}
                />
              )}
              <Typography>{projectDetails?.SCountry}</Typography>
            </Box>

            <Box flex={1} mx={4} position="relative">
              <Box
                height={4}
                bgcolor="#ccc"
                borderRadius={5}
                position="relative"
              >
                <Box
                  height={4}
                  bgcolor="#4caf50"
                  width={`${calculateProgress()}%`}
                  borderRadius={5}
                  position="absolute"
                  top={0}
                  left={0}
                ></Box>
                <img
                  src="src/assets/img/horse.jpg" // Sample truck image URL
                  alt="Truck"
                  style={{
                    position: "absolute",
                    left: `calc(${calculateProgress()}% - 15px)`,
                    top: "-25px",
                    width: "50px",
                    height: "50px",
                    background: "#fff",
                    borderRadius: '20%',
                    padding: 2,
                  }}
                />
              </Box>
              <Box textAlign="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  href={workflow.TrackingUrl}
                  target="_blank"
                >
                  Track Shipment
                </Button>
              </Box>
            </Box>

            <Box textAlign="center">
              <Typography variant="h6">Destination</Typography>
              {dCountryLink && (
                <img
                  src={dCountryLink}
                  alt="destination-flag"
                  style={{ width: "120px", height: "80px" }}
                />
              )}
              <Typography>{projectDetails?.DCountry}</Typography>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between">
            {/* Source Activities */}
            <Box flex={1} pr={4} position="relative">
              <Typography variant="h6" mb={2}>
                Source Activities
              </Typography>
              {workflow.SourceActivities &&
                getSortedActivities(workflow.SourceActivities).map(
                  (activity, index) => (
                    <Box key={index} position="relative" pl={4} mb={4}>
                      <Box position="absolute" left={0} top={0}>
                        <Box
                          width={12}
                          height={12}
                          bgcolor={activity.status == 2 
                              ? "#4caf50" 
                              : activity.status == "1" ? "#FFA500" :"#808080"}
                          borderRadius="50%"
                        />
                        {index !==
                          getSortedActivities(workflow.SourceActivities)
                            .length -
                            1 && (
                          <Box
                            width={2}
                            height="40px"
                            bgcolor={activity.status == 2 
                              ? "#4caf50" 
                              : activity.status == "1" ? "#FFA500" :"#808080"}
                            ml={0.5}
                            mt={1}
                          />
                        )}
                      </Box>
                      <Box borderRadius={2} p={2} border="1px solid #ddd">
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography fontWeight="bold">
                            {activity.label}
                          </Typography>
                          <Chip
                            label={getStatusLabel(activity.status).label}
                            color={getStatusLabel(activity.status).color}
                            size="small"
                          />
                        </Box>
                        {activity.timestamp && (
                          <Typography variant="body2">
                            {activity.timestamp}
                          </Typography>
                        )}
                        {activity.comments && (
                          <Typography variant="body2">
                            {activity.comments}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )
                )}
            </Box>

            {/* Destination Activities */}
            <Box flex={1} pl={4} position="relative">
              <Typography variant="h6" mb={2}>
                Destination Activities
              </Typography>
              {workflow.DestinationActivities &&
                getSortedActivities(workflow.DestinationActivities).map(
                  (activity, index) => (
                    <Box key={index} position="relative" pl={4} mb={4}>
                      <Box position="absolute" left={0} top={0}>
                        <Box
                          width={12}
                          height={12}
                          bgcolor={activity.status == 2 
                              ? "#4caf50" 
                              : activity.status == "1" ? "#FFA500" :"#808080"}
                          borderRadius="50%"
                        />
                        {index !==
                          getSortedActivities(workflow.DestinationActivities)
                            .length -
                            1 && (
                          <Box
                            width={2}
                            height="40px"
                            bgcolor={activity.status == 2 
                              ? "#4caf50" 
                              : activity.status == "1" ? "#FFA500" :"#808080"}
                            ml={0.5}
                            mt={1}
                          />
                        )}
                      </Box>
                      <Box borderRadius={2} p={2} border="1px solid #ddd">
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography fontWeight="bold">
                            {activity.label}
                          </Typography>
                          <Chip
                            label={getStatusLabel(activity.status).label}
                            color={getStatusLabel(activity.status).color}
                            size="small"
                          />
                        </Box>
                        {activity.timestamp && (
                          <Typography variant="body2">
                            {activity.timestamp}
                          </Typography>
                        )}
                        {activity.comments && (
                          <Typography variant="body2">
                            {activity.comments}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  )
                )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default WorkflowDetails;
