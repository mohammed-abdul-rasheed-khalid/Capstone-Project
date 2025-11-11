import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack
} from "@mui/material";
import { useEffect, useState } from "react";

export default function IncidentForm({ open, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    short_description: "",
    state: "",
    impact: "",
    urgency: "",
    priority: "",
  });

  // Load initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        short_description: initialData.short_description || "",
        state: initialData.state || "",
        impact: initialData.impact || "",
        urgency: initialData.urgency || "",
        priority: initialData.priority || "",
      });
    } else {
      setFormData({
        short_description: "",
        state: "",
        impact: "",
        urgency: "",
        priority: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="incident-form-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="incident-form-title">
        {initialData ? "Edit Incident" : "Create Incident"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Short Description"
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Impact */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="impact-label">Impact</InputLabel>
            <Select
              labelId="impact-label"
              name="impact"
              value={formData.impact}
              label="Impact"
              onChange={handleChange}
            >
              <MenuItem value="1">1 - High</MenuItem>
              <MenuItem value="2">2 - Medium</MenuItem>
              <MenuItem value="3">3 - Low</MenuItem>
            </Select>
          </FormControl>

          {/* Urgency */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="urgency-label">Urgency</InputLabel>
            <Select
              labelId="urgency-label"
              name="urgency"
              value={formData.urgency}
              label="Urgency"
              onChange={handleChange}
            >
              <MenuItem value="1">1 - Critical</MenuItem>
              <MenuItem value="2">2 - High</MenuItem>
              <MenuItem value="3">3 - Medium</MenuItem>
              <MenuItem value="4">4 - Low</MenuItem>
            </Select>
          </FormControl>

          {/* Priority - read-only */}
          <TextField
            label="Priority"
            name="priority"
            value={formData.priority || ""}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          {/* State */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              name="state"
              value={formData.state}
              label="State"
              onChange={handleChange}
            >
              <MenuItem value="1">New</MenuItem>
              <MenuItem value="2">In Progress</MenuItem>
              <MenuItem value="3">On Hold</MenuItem>
              <MenuItem value="6">Resolved</MenuItem>
              <MenuItem value="7">Closed</MenuItem>
              <MenuItem value="8">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {initialData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
