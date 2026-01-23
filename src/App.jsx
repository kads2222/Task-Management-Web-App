import { useState, useEffect } from "react";
import ListView from "./components/ListView/index";
import KanbanView from "./components/KanbanView/index"; // Ensure this is created
import Modal from "./components/Modal/index";
import "./App.css";

const TASKS_KEY = "tasks";
const PROJECTS_KEY = "projects";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem(PROJECTS_KEY);
    return storedProjects ? JSON.parse(storedProjects) : ["Other"];
  });

  // --- View State ---
  const [view, setView] = useState("list"); // 'list' or 'kanban'

  const [modalType, setModalType] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAddProject = (project) => {
    if (!projects.includes(project)) {
      setProjects((prev) => [...prev, project]);
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

  // Helper to toggle view
  const toggleView = () => {
    setView((prevView) => (prevView === "list" ? "kanban" : "list"));
  };

  const filteredTasks = tasks
    .filter((t) => t.task.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterProject === "All" || t.project === filterProject)
    .filter((t) => filterStatus === "All" || t.status === filterStatus)
    .filter((t) => filterPriority === "All" || t.priority === filterPriority)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "priority") return a.priority.localeCompare(b.priority);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div>
      <div className="container">
        <h1>Task Management System</h1>

        <div className="controls">
          <input
            className="searchbar"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="control">
            <select
              className="select"
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
            >
              <option value="All">All Projects</option>
              {projects.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              className="select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            <select
              className="select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select
              className="select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
          
          {/* Updated Toggle Button */}
          <button onClick={toggleView} className="view-mode-btn">
            {view === "list" ? "Kanban Mode" : "List Mode"}
          </button>
        </div>

        <div className="buttons">
          <button className="button" onClick={openCreateTask}>
            Add Task
          </button>
          <button
            className="button"
            onClick={() => setModalType("project")}
          >
            Add Project
          </button>
        </div>
      </div>

      {modalType && (
        <Modal
          type={modalType}
          projects={projects}
          task={editingTask}
          onSave={
            modalType === "project"
              ? handleAddProject
              : editingTask
              ? handleUpdateTask
              : handleAddTask
          }
          onClose={() => setModalType(null)}
        />
      )}

      {/* Conditional Rendering of Views */}
      {view === "list" ? (
        <ListView
          tasks={filteredTasks}
          onEdit={openEditTask}
          onDelete={handleDeleteTask}
        />
      ) : (
        <KanbanView
          tasks={filteredTasks}
          onEdit={openEditTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;