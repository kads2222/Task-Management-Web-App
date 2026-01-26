import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import "./styles.css";

/* 
  StatusGroup Component
  - represents a group of tasks with the same status in the list view
  - props:
      - status: the status of the group (e.g., Not Started, In Progress, Done)
      - tasks: array of tasks with this status
      - onEdit: function to edit a task
      - onDelete: function to delete a task
*/

function StatusGroup({ status, tasks, onEdit, onDelete }) {

  // Setting up droppable area for the status group
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="list-status-group">
      <h3 className="list-group-header">{status}</h3>
      <div ref={setNodeRef} className="droppable-area">
        <ul className="tasks-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              view="list"
            />
          ))}
        </ul>

        {tasks.length === 0 && (
          <div className="drop-placeholder">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}


/* 
  ListView Component
  - main list layout for tasks
  - groups tasks by their status
  - props:
      - tasks: array of all tasks
      - onEdit: callback to edit a task
      - onDelete: callback to delete a task
*/

function ListView({ tasks, onEdit, onDelete }) {
  const statuses = ["Not Started", "In Progress", "Done"];

  return (
    <div className="list-view-container">
      {statuses.map((status) => (
        <StatusGroup
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ListView;