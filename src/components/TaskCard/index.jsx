import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./styles.css";

function TaskCard({ task, onEdit, onDelete, view }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  const statusClass = (status) =>
    status === "Done" ? "done" : status === "In Progress" ? "inprogress" : "notstarted";

  const ActionButtons = (
    <div className="task-actions">
      <button 
        className="editbtn" 
        onPointerDown={(e) => e.stopPropagation()} 
        onClick={() => onEdit(task)}
      >
        Edit
      </button>
      <button 
        className="deletebtn" 
        onPointerDown={(e) => e.stopPropagation()} 
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );

  return (
    <li 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="draggable-item"
    >
      {view === "kanban" ? (
        <div className="card-kanban">
          <div className="kanban-row">
            <span className="task-name">{task.task}</span>
            <span className="date-text">{task.date}</span>
          </div>
          
          <div className="kanban-row">
            <span className={`badge priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            <span className={`badge progress ${statusClass(task.status)}`}>
              {task.status}
            </span>
          </div>

          <div className="kanban-footer">
            <span className="project-text">{task.project}</span>
            {ActionButtons}
          </div>
        </div>
      ) : (
        <div className="card-list">
          <div className="list-col task-name">{task.task}</div>
          <div className="list-col">
            <span className={`badge priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
          </div>
          <div className="list-col">
            <span className={`badge progress ${statusClass(task.status)}`}>
              {task.status}
            </span>
          </div>
          <div className="list-col date-text">{task.date}</div>
          <div className="list-col project-text">{task.project}</div>
          <div className="list-col-actions">{ActionButtons}</div>
        </div>
      )}
    </li>
  );
}

export default TaskCard;