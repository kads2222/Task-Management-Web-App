import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import "./styles.css";

/* 
  taskCard Component
  - represents a single task in either Kanban or List view
  - supports drag-and-drop using @dnd-kit
  - shows task name, date, priority, status, and action buttons

  props:
    - task: task object { id, task, date, priority, status }
    - onEdit: callback when editing task
    - onDelete: callback when deleting task
    - view: "kanban" or "list" layout
*/
function TaskCard({ task, onEdit, onDelete, view }) {
  // setup draggable functionality
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      // attach task data for drop handling
      data: { task },
    });

  // inline style for drag movement and feedback
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  // convert task status to CSS class
  const statusClass = (status) =>
    status === "Done"
      ? "done"
      : status === "In Progress"
      ? "inprogress"
      : "notstarted";

  // action buttons shared between Kanban and List views
  const ActionButtons = (
    <div className="task-actions">
      <button
        className="editbtn"
        // prevent drag start when clicking
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
      // connect to drag system
      ref={setNodeRef}
      // apply drag styles
      style={style}
      // accessibility & drag attributes
      {...attributes}
      // mouse/touch listeners
      {...listeners}
      className="dragga ble-item"
    >
      {/* kanban view */}
      {view === "kanban" ? (
        <div className="card-kanban">
          <div className="kanban-row">
            <span className="task-name">{task.task}</span>
            <span className="date-text">{task.date}</span>
          </div>

          <div className="kanban-row">
            <div className="badge-group">
              <span className={`badge priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`badge progress ${statusClass(task.status)}`}>
                {task.status}
              </span>
            </div>
          </div>

          <div className="kanban-footer">{ActionButtons}</div>
        </div>
      ) : (
        /* list View */
        <div className="card-list">
          <div className="list-main-info">
            <div className="list-col task-name">{task.task}</div>
            <div className="list-col date-text">{task.date}</div>
          </div>

          <div className="list-badges">
            <span className={`badge priority ${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            <span className={`badge progress ${statusClass(task.status)}`}>
              {task.status}
            </span>
          </div>

          <div className="list-col-actions">{ActionButtons}</div>
        </div>
      )}
    </li>
  );
}

export default TaskCard;
