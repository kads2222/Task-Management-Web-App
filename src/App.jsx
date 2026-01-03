import Modal from "./components/modal/MOdal";
import { useState } from "react";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleAddProject = (projectName) => {
    if (!projects.includes(projectName)) {
      setProjects([...projects, projectName]);
    }
  };

  return (
    <div>
      <header>
        <h1>Task Management System</h1>
      </header>

      {/* Buttons to open modals */}
      <button className="buttons" onClick={() => setModalOpen("task")}>
        Add a Task
      </button>
      <button className="buttons" onClick={() => setModalOpen("project")}>
        Add a Project
      </button>

      {/* Conditional Modal */}
      {modalOpen === "task" && (
        <Modal
          type="task"
          projects={projects}
          onClose={() => setModalOpen(false)}
          onSave={handleAddTask}
        />
      )}
      {modalOpen === "project" && (
        <Modal
          type="project"
          onClose={() => setModalOpen(false)}
          onSave={handleAddProject}
        />
      )}
    </div>
  );
}

export default App;
