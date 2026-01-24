import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import "./styles.css";

function StatusGroup({ status, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="list-status-group">
      <h3 className="list-group-header">{status}</h3>
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

        {tasks.length === 0 && (
          <div className="drop-placeholder">
            Drop here to change to {status}
          </div>
        )}
      </ul>
    </div>
  );
}

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
