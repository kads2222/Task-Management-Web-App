import { useDroppable } from "@dnd-kit/core";
import TaskCard from "../TaskCard";
import "./styles.css";

/* 
  KanbanColumn Component
  - represents a single column in the Kanban board (e.g., Not Started, In Progress, Done)
  - props:
      - status: column status (string)
      - tasks: array of tasks for this column
      - onEdit: callback to edit a task
      - onDelete: callback to delete a task
*/

function KanbanColumn({ status, tasks, onEdit, onDelete }) {
  // register this column as a drop target using the status as its ID
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

/* 
  KanbanView Component
  - main Kanban board layout
  - groups tasks by status into columns
  - props:
      - tasks: array of all tasks
      - onEdit: callback to edit a task
      - onDelete: callback to delete a task
*/

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
