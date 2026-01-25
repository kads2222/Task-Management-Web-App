import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Modal({ onClose, onSave, task }) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Not Started");
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTaskName(task.task);
      setDate(task.date);
      setPriority(task.priority);
      setStatus(task.status);
    }
  }, [task]);

  const handleSaveTask = () => {
    if (!taskName || !date) {
      setError("Task name and date are required");
      return;
    }

    onSave({
      id: task ? task.id : crypto.randomUUID(),
      task: taskName,
      date,
      priority,
      status,
    });

    onClose();
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      className="responsive-modal"
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 700, fontSize: "1.5rem" }}>
        {task ? "Edit Task" : "Add New Task"}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            my: 1,
          }}
        >
          <TextField
            label="What needs to be done?"
            variant="outlined"
            fullWidth
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              setError("");
            }}
            error={!!error && !taskName}
            helperText={!!error && !taskName ? "Task name is required" : ""}
          />

          <TextField
            label="Due Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={!!error && !date}
          />

          <TextField
            select
            label="Priority Level"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
          >
            {["High", "Medium", "Low"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Current Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            {["Not Started", "In Progress", "Done"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button onClick={onClose} color="inherit" sx={{ px: 3 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveTask}
          variant="contained"
          disableElevation
          sx={{
            px: 4,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "rgb(0, 0, 255)", 
            "&:hover": {
              backgroundColor: "rgb(0, 0, 200)", 
            },
          }}
        >
          {task ? "Update Task" : "Save Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
