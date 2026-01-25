import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import ListView from "./components/ListView/index";
import KanbanView from "./components/KanbanView/index";
import Modal from "./components/Form/index";
import Select from "./components/Select/index";
import "./App.css";

const TASKS_KEY = "tasks";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [view, setView] = useState("list");
  const [modalType, setModalType] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const priorityOptions = ["High", "Medium", "Low"];
  const sortOptions = ["date", "priority", "status"];

  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const [tempPriority, setTempPriority] = useState("All");
  const [tempSort, setTempSort] = useState("date");

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (isSidebarOpen) {
      setTempPriority(filterPriority);
      setTempSort(sortBy);
    }
  }, [isSidebarOpen, filterPriority, sortBy]);

  const handleApplyFilters = () => {
    setFilterPriority(tempPriority);
    setSortBy(tempSort);
    setIsSidebarOpen(false);
  };

  const handleAddTask = (task) => setTasks((prev) => [...prev, task]);

  const handleUpdateTask = (updatedTask) =>
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));

  const handleDeleteTask = (id) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  const openCreateTask = () => {
    setEditingTask(null);
    setModalType("task");
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setModalType("task");
  };

  const toggleView = () => setView((prev) => (prev === "list" ? "kanban" : "list"));

  const filteredTasks = tasks
    .filter((t) => t.task.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterPriority === "All" || t.priority === filterPriority)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "priority") return a.priority.localeCompare(b.priority);
      return 0;
    });

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === active.id ? { ...t, status: over.id } : t))
    );
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
          </button>
          <h1 className="title">Task Management System</h1>
        </header>

        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h2>Filters</h2>
            <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
              <CloseIcon style={{ color: "white" }} />
            </button>
          </div>

          <div className="sidebar-content">
            <Select
              value={tempPriority}
              onChange={setTempPriority}
              options={priorityOptions}
              defaultLabel="All Priority"
              isSidebar
            />
            <Select 
              value={tempSort} 
              onChange={setTempSort} 
              options={sortOptions} 
              isSidebar 
            />
            <button className="apply-btn" onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </aside>

        <div className="controls">
          <input
            className="searchbar"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="control">
            <Select
              value={filterPriority}
              onChange={setFilterPriority}
              options={priorityOptions}
              defaultLabel="All Priority"
            />
            <Select value={sortBy} onChange={setSortBy} options={sortOptions} />
          </div>
          <button onClick={toggleView} className="view-mode-btn">
            {view === "list" ? (
              <ViewKanbanIcon fontSize="large" />
            ) : (
              <FormatListBulletedIcon fontSize="large" />
            )}
          </button>
        </div>

        <div className="buttons">
          <button className="button" onClick={openCreateTask}>Add Task</button>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        {view === "list" ? (
          <ListView tasks={filteredTasks} onEdit={openEditTask} onDelete={handleDeleteTask} />
        ) : (
          <KanbanView tasks={filteredTasks} onEdit={openEditTask} onDelete={handleDeleteTask} />
        )}
      </DndContext>

      {modalType && (
        <Modal
          task={editingTask}
          onSave={editingTask ? handleUpdateTask : handleAddTask}
          onClose={() => setModalType(null)}
        />
      )}
    </>
  );
}

export default App;