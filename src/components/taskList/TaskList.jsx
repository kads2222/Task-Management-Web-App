import styles from "./TaskList.module.css";

function TaskList({ tasks, onEdit, onDelete }) {
  const statusClass = (status) =>
    status === "Done"
      ? styles.done
      : status === "In Progress"
      ? styles.inprogress
      : styles.notstarted;

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

          <div className={`${styles.progress} ${statusClass(task.status)}`}>
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
