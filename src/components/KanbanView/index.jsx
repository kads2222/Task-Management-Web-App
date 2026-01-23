import TaskCard from "../TaskCard";
import "./styles.css";

function KanbanView({ tasks, onEdit, onDelete }) {
  const columns = ["Not Started", "In Progress", "Done"];

  return (
    <div className="kanban-board">
      {columns.map((status) => (
        <div key={status} className="kanban-column">
          <h3>{status}</h3>
          <div className="column-content">
            {tasks
              .filter((t) => t.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  view="kanban"
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanView;