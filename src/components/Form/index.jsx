import { useState, useEffect } from "react";
import "./styles.css";

function Modal({ type, onClose, onSave, projects = [], task }) {
  const [taskName, setTaskName] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [project, setProject] = useState("Other");
  const [status, setStatus] = useState("Not Started");
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTaskName(task.task);
      setDate(task.date);
      setPriority(task.priority);
      setProject(task.project);
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
      project,
      status,
    });

    onClose();
  };

  const handleAddProject = () => {
    if (!projectName) {
      setError("Project name is required");
      return;
    }

    onSave(projectName);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="modal">
        {type === "task" && (
          <>
            <h2 className="title">{task ? "Edit Task" : "Add Task"}</h2>

            <div className="form">
              <input
                className="input"
                value={taskName}
                onChange={(e) => {
                  setTaskName(e.target.value);
                  setError("");
                }}
                placeholder="Task description"
              />

              <input
                className="input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <select
                className="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                className="select"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              >
                {projects.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <select
                className="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              {error && <span className="error">{error}</span>}
            </div>

            <div className="actions">
              <button className="secondaryBtn" onClick={onClose}>
                Cancel
              </button>
              <button className="primaryBtn" onClick={handleSaveTask}>
                {task ? "Update Task" : "Save Task"}
              </button>
            </div>
          </>
        )}

        {type === "project" && (
          <div className="form">
            <h2 className="title">Add Project</h2>

            <input
              className="input"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setError("");
              }}
              placeholder="Project name"
            />

            {error && <span className="error">{error}</span>}

            <div className="actions">
              <button className="secondaryBtn" onClick={onClose}>
                Cancel
              </button>
              <button className="primaryBtn" onClick={handleAddProject}>
                Save Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
