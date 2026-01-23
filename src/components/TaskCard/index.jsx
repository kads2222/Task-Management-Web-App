import "./styles.css";

function TaskCard({ task, onEdit, onDelete, view }) {
  const statusClass = (status) =>
    status === "Done"
      ? "done"
      : status === "In Progress"
      ? "inprogress"
      : "notstarted";

  return (
    <li className={`task-card ${view === "kanban" ? "kanban-mode" : "list-mode"}`}>
      <div className="task-header">
        <div className="taskName">{task.task}</div>
        <div className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </div>
      </div>

      <div className="task-body">
        <div className="date">{task.date}</div>
        <div className="text">{task.project}</div>
      </div>

      <div className="task-footer">
        <div className={`progress ${statusClass(task.status)}`}>
          {task.status}
        </div>
        <div className="actions">
          <button className="editbtn" onClick={() => onEdit(task)}>Edit</button>
          <button className="deletebtn" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    </li>
  );
}

export default TaskCard;