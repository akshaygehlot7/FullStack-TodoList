import React, { useEffect, useState } from 'react'
import axios from 'axios';

const TaskList = ({ onEdit, onDelete, onCreate }) => {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await axios.get('/api/v1/tasks');
            setTasks(response.data);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchTasks();
    }, []);

    if (loading) {
      return <div>Loading tasks...</div>;
    }

    if (error) {
      return <div>Error loading tasks: {error.message}</div>;
    }
  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      <button onClick={onCreate}>New Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-item">
              <div>
                <h3>{task.title}</h3>
                <p>Status: {task.status}</p>
                <p>Due Date: {task.dueDate}</p>
              </div>
              <div>
                <button onClick={() => onEdit(task)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default TaskList
