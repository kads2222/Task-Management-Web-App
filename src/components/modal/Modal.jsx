import { useState } from "react";
import styles from "./Modal.module.css";

function Modal({ type, onClose, onSave, projects = [] }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [project, setProject] = useState("Other");
  const [status, setStatus] = useState("Not Started");
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");

  const handleAddTask = () => {
    if (!task || !date) {
      setError("Task name and date are required");
      return;
    }

    const newTask = {
      id: Date.now(),
      task,
      date,
      priority,
      project,
      status,
    };

    onSave(newTask);
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
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {type === "task" && (
          <>
            <h2 className={styles.title}>Add Task</h2>

            <div className={styles.form}>
              <input
                className={styles.input}
                value={task}
                placeholder="Task description"
                onChange={(e) => {
                  setTask(e.target.value);
                  setError("");
                }}
              />

              <input
                className={styles.input}
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError("");
                }}
              />

              <select
                className={styles.select}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                className={styles.select}
                value={project}
                onChange={(e) => setProject(e.target.value)}
              >
                {projects.map((p, i) => (
                  <option key={i}>{p}</option>
                ))}
                <option>Other</option>
              </select>

              <select
                className={styles.select}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Not Started</option>
                <option>In Progress</option>
              </select>

              <div className={styles.badges}>
                <span
                  className={`${styles.badge} ${
                    priority === "High"
                      ? styles.priorityHigh
                      : priority === "Medium"
                      ? styles.priorityMedium
                      : styles.priorityLow
                  }`}
                >
                  {priority}
                </span>

                <span
                  className={`${styles.badge} ${
                    status === "In Progress"
                      ? styles.statusInProgress
                      : styles.statusNotStarted
                  }`}
                >
                  {status}
                </span>
              </div>

              {error && <span className={styles.error}>{error}</span>}
            </div>

            <div className={styles.actions}>
              <button className={styles.secondaryBtn} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.primaryBtn} onClick={handleAddTask}>
                Save Task
              </button>
            </div>
          </>
        )}

        {type === "project" && (
          <>
            <h2 className={styles.title}>Add Project</h2>

            <div className={styles.form}>
              <input
                className={styles.input}
                value={projectName}
                placeholder="Project name"
                onChange={(e) => {
                  setProjectName(e.target.value);
                  setError("");
                }}
              />
              {error && <span className={styles.error}>{error}</span>}
            </div>

            <div className={styles.actions}>
              <button className={styles.secondaryBtn} onClick={onClose}>
                Cancel
              </button>
              <button className={styles.primaryBtn} onClick={handleAddProject}>
                Save Project
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
