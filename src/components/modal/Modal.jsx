import { useState } from "react";

function Modal({ type, onClose, onSave, projects = [] }) {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [project, setProject] = useState("Other"); // default project
  const [status, setStatus] = useState("Not Started");
  const [projectName, setProjectName] = useState(""); // for new project modal

  const handleAddTask = () => {
    if (!task || !date || !priority) return;

    const newTask = {
      id: Date.now(),
      task,
      date,
      priority,
      project: project || "Other",
      status,
    };

    onSave(newTask);
    onClose();
    setTask("");
    setDate("");
    setPriority("Medium");
    setProject("Other");
    setStatus("Not Started");
  };

  const handleAddProject = () => {
    if (!projectName) return;
    onSave(projectName); // send new project back
    onClose();
    setProjectName("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        {type === "task" && (
          <>
            <h2>Add a Task</h2>
            <input
              type="text"
              placeholder="Task description"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <br />
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
            >
              {projects.map((proj, idx) => (
                <option key={idx} value={proj}>
                  {proj}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            <br />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
            </select>
            <br />
            <button onClick={handleAddTask}>Save Task</button>
          </>
        )}

        {type === "project" && (
          <>
            <h2>Add a Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <br />
            <button onClick={handleAddProject}>Save Project</button>
          </>
        )}

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default Modal;
