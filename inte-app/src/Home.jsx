import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  Fab,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import IncidentForm from "./components/IncidentForm";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);


  const calculatePriority = (impact, urgency) => {
    if (!impact || !urgency) return 3; // default
    const table = {
      "1": { "1": 1, "2": 2, "3": 3 },
      "2": { "1": 2, "2": 3, "3": 4 },
      "3": { "1": 3, "2": 4, "3": 5 },
    };
    return table[impact]?.[urgency] || 3;
  };

  const onDelete = async (sys_id) => {
    try {
      await axios.delete(`http://localhost:3001/api/incidents/${sys_id}`, {
        withCredentials: true,
      });
      setIncidents(incidents.filter((inc) => inc.sys_id !== sys_id));
    } catch (err) {
      console.error("Failed to delete incident:", err);
      alert("Error deleting incident");
    }
  };

  const onEdit = (incident) => {
    setEditingIncident(incident);
    setIsFormOpen(true);
  };

  const handleCreateNew = () => {
    setEditingIncident(null);
    setTimeout(() => setIsFormOpen(true), 0);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingIncident(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      
      const calculatedPriority = calculatePriority(formData.impact, formData.urgency);

      if (editingIncident) {
        const updateData = {
          short_description: formData.short_description,
          impact: formData.impact,
          urgency: formData.urgency,
          priority: calculatedPriority,
          state: formData.state,
        };

        const response = await axios.patch(
          `http://localhost:3001/api/incidents/${editingIncident.sys_id}`,
          updateData,
          { withCredentials: true }
        );

        const updatedIncident = response.data.result || response.data;
        setIncidents(incidents.map(inc =>
          inc.sys_id === editingIncident.sys_id ? { ...inc, ...updatedIncident } : inc
        ));
      } else {
        const createData = {
          short_description: formData.short_description,
          impact: formData.impact,
          urgency: formData.urgency,
          priority: calculatedPriority,
          state: formData.state,
        };

        const response = await axios.post(
          'http://localhost:3001/api/incidents',
          createData,
          { withCredentials: true }
        );

        const newIncident = response.data.result || response.data;
        setIncidents([...incidents, newIncident]);
      }

      setIsFormOpen(false);
      setEditingIncident(null);
      alert(editingIncident ? "Incident updated successfully" : "Incident created successfully");
    } catch (err) {
      console.error("Failed to save incident:", err);
      alert(editingIncident ? "Error updating incident" : "Error creating incident");
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        const incidentList = await axios.get(
          "http://localhost:3001/api/incidents",
          { withCredentials: true }
        );
        setIncidents(incidentList.data.result);
      }
    }

    fetchData();
  }, [isLogged]);

  return (
    <>
      {isLogged && incidents ? (
        <>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5">Incident Records:</Typography>
              <Fab 
                color="primary" 
                aria-label="add"
                onClick={handleCreateNew}
                sx={{ mb: 2 }}
              >
                <AddIcon />
              </Fab>
            </Box>

            <Grid container spacing={5} justifyContent={"space-around"}>
              {incidents.map((inc) => (
                <Grid item key={inc.sys_id}>
                  <Card sx={{ width: 300, height: 'auto', minHeight: 220 }}>
                    <CardContent>
                      <Typography variant="h6">
                        Incident #: {inc.number}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Description: {inc.short_description}
                      </Typography>

                      {/* 🆕 Added Impact and Urgency display */}
                      <Typography variant="body2">
                        Impact: {inc.impact?.display_value || inc.impact}
                      </Typography>
                      <Typography variant="body2">
                        Urgency: {inc.urgency?.display_value || inc.urgency}
                      </Typography>

                      <Typography variant="body2">
                        Priority: {inc.priority}
                      </Typography>
                      <Typography variant="body2">
                        State: {inc.state}
                      </Typography>

                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => onEdit(inc)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => onDelete(inc.sys_id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>

          <IncidentForm 
            open={isFormOpen}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            initialData={editingIncident}
          />
        </>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
