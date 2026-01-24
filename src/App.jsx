import { useState, useEffect } from "react";
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

//localstorage key for tasks and projects
const TASKS_KEY = "tasks";
const PROJECTS_KEY = "projects";

function App() {
  //tasks and projects and returns from the localstorage whenever the projectrenders
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem(PROJECTS_KEY);
    return storedProjects ? JSON.parse(storedProjects) : ["Other"];
  });

  //states used in controling UI changes in current view , form modal vibility and the task edit mode
  const [view, setView] = useState("list");
  const [modalType, setModalType] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  //configeration value for status , priority and sort used in filtering and sorting tasks
  const status = ["Not Started", "In Progress", "Done"];
  const priority = ["High", "Medium", "Low"];
  const sort = ["date", "priority", "status"];

  //search filtering and sorrting states
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  //save tasks and projects in the localstorage whenever they are updated
  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  //handles adding new tasks
  const handleAddTask = (task) => setTasks((prev) => [...prev, task]);

  //handles adding new project
  const handleAddProject = (project) =>
    !projects.includes(project) && setProjects((prev) => [...prev, project]);

  //handles updating an existing task
  const handleUpdateTask = (updatedTask) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );

  //handles deleting an existing task
  const handleDeleteTask = (id) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  //handles the modal open is for create task or update task
  const openCreateTask = () => {
    setEditingTask(null);
    setModalType("task");
  };

  const openEditTask = (task) => {
    setEditingTask(task);
    setModalType("task");
  };

  //changes the view of the tasks to list and kanban based on the button clicks
  const toggleView = () =>
    setView((prev) => (prev === "list" ? "kanban" : "list"));

  //filter tasks based on the project , status , priority and sort based on the date , prority and status
  const filteredTasks = tasks
    .filter((t) => t.task.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterProject === "All" || t.project === filterProject)
    .filter((t) => filterPriority === "All" || t.priority === filterPriority)
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "priority") return a.priority.localeCompare(b.priority);
      return 0;
    });

  //drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  //drag and drop handler updates status of tasks when tasks are moves to a different status
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <div className="app-layout">
      <div className="container">
        <h1>Task Management System</h1>

        {/* Search, filters, and view controls */}
        <div className="controls">
          <input
            className="searchbar"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="control">
            <Select
              value={filterProject}
              onChange={setFilterProject}
              options={projects}
              defaultLabel="All Projects"
            />
            <Select
              value={filterPriority}
              onChange={setFilterPriority}
              options={priority}
              defaultLabel="All Priority"
            />
            <Select value={sortBy} onChange={setSortBy} options={sort} />
          </div>

          <button onClick={toggleView} className="view-mode-btn">
            {view === "list" ? "Kanban Mode" : "List Mode"}
          </button>
        </div>

        {/* Primary actions */}
        <div className="buttons">
          <button className="button" onClick={openCreateTask}>
            Add Task
          </button>
          <button className="button" onClick={() => setModalType("project")}>
            Add Project
          </button>
        </div>
      </div>

       {/* Task rendering with drag-and-drop support */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        {view === "list" ? (

          //list view rendering
          <ListView
            tasks={filteredTasks}
            onEdit={openEditTask}
            onDelete={handleDeleteTask}
          />
        ) : (

          //kanban view rendering
          <KanbanView
            tasks={filteredTasks}
            onEdit={openEditTask}
            onDelete={handleDeleteTask}
          />
        )}
      </DndContext>

      {/* Shared modal for creating and editing tasks/projects */}
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
    </div>
  );
}

export default App;
