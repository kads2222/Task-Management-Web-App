import { useState } from "react";
import TaskList from "./components/taskList/TaskList";
import Modal from "./components/modal/Modal";
import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState(["Other"]);
  const [modalType, setModalType] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const handleAddTask = (task) => setTasks([...tasks, task]);

  const openCreateTask = () => {
    setEditingTask(null);
    setModalType("task");
  };

  const handleAddProject = (project) => {
    if (!projects.includes(project)) setProjects([...projects, project]);
  };

  const handleUpdateTask = (updatedTask) =>
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));

  const openEditTask = (task) => {
    setEditingTask(task);
    setModalType("task");
  };

  const handleDeleteTask = (id) =>
    setTasks(tasks.filter((task) => task.id !== id));

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
      <h1>Task Management System</h1>

      <div className={styles.controls}>
        <div>
          <input
            className={styles.searchbar}
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className={styles.select}
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
        >
          <option value="All">All Projects</option>
          {projects.map((p, i) => (
            <option key={i}>{p}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <select
          className={styles.select}
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          className={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>
      <div className={styles.btn}>
        <div className={styles.btnwrapper}>
          <button className={styles.button} onClick={openCreateTask}>
            Add Task
          </button>
        </div>
        <div className={styles.btnwrapper}>
          <button
            className={styles.button}
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

      <TaskList
        tasks={filteredTasks}
        onEdit={openEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default App;
