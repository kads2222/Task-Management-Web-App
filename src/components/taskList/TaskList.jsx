import styles from "./TaskList.module.css";

function TaskList({ tasks, onEdit, onDelete }) {
  const handleStatusClass = (status) => {
    switch (status) {
      case "Not Started":
        return styles.notstarted;
      case "In Progress":
        return styles.inprogress;
      case "Done":
        return styles.done;
      default:
        return styles.notstarted;
    }
  };

  return (
    <ul className={styles.tasks}>
      {tasks.map((task) => (
        <li key={task.id} className={styles.task}>
          <div className={styles.taskName}>{task.task}</div>
          <div className={styles.date}>{task.date}</div>

          <div
            className={`${styles.priority} ${
              styles[task.priority.toLowerCase()]
            }`}
          >
            {task.priority}
          </div>

          <div className={styles.text}>{task.project}</div>

          <div
            className={`${styles.progress} ${handleStatusClass(task.status)}`}
          >
            {task.status}
          </div>

          <button className={styles.editbtn} onClick={() => onEdit(task)}>
            Edit
          </button>

          <button
            className={styles.deletebtn}
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
