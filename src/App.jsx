import { useState } from "react";
import TaskList from "./components/taskList/TaskList";
import Modal from "./components/modal/MOdal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState(["Other"]);
  const [modalType, setModalType] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddProject = (projectName) => {
    if (!projects.includes(projectName)) {
      setProjects([...projects, projectName]);
    }
  };

  const openCreateTask = () => {
    setEditingTask(null);
    setModalType("task");
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setModalType("task");
  };

  return (
    <div>
      <h1>Task Management System</h1>

      <button className="buttons" onClick={openCreateTask}>
        Add Task
      </button>
      <button className="buttons" onClick={() => setModalType("project")}>
        Add Project
      </button>

      {modalType && (
        <Modal
          type={modalType}
          projects={projects}
          task={editingTask}
          onSave={editingTask ? handleUpdateTask : handleAddTask}
          onClose={() => setModalType(null)}
        />
      )}

      <TaskList
        tasks={tasks}
        onEdit={openEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
