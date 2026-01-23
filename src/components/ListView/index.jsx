import TaskCard from "../TaskCard";
import "./styles.css";

function ListView({ tasks, onEdit, onDelete }) {
  return (
    <ul className="tasks-list-container">
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
  );
}

export default ListView;