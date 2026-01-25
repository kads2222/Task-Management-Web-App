import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import "./styles.css";

function KanbanColumn({ status, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="kanban-column-wrapper">
      <div ref={setNodeRef} className="kanban-column">
        <h3>{status}</h3>
        <div className="column-content">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              view="kanban"
            />
          ))}
          {tasks.length === 0 && (
            <div className="kanban-empty-placeholder">No tasks</div>
          )}
        </div>
      </div>
    </div>
  );
}

function KanbanView({ tasks, onEdit, onDelete }) {
  const statuses = ["Not Started", "In Progress", "Done"];

  return (
    <div className="kanban-board">
      {statuses.map((status) => (
        <KanbanColumn
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

export default KanbanView;