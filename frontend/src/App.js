import { useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.get("/api/v1/tasks");
      
      setTasks(resp.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async(task) => {
    const url = task.id ? `/api/v1/tasks/${task.id}` : "/api/v1/tasks";
    const method = task.id ? "PUT" : "POST";
    try {
      await axios({
        method,
        url,
        headers: { "Content-Type": "application/json" },
        data: task,
      });
      fetchTasks();
      setEditingTask(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCreate = () => {
    setEditingTask({
      title: "",
      description: "",
      status: "pending",
      dueDate: "",
    });
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="App">
      <div className="AppContainer">
        {" "}
        {editingTask ? (
          <TaskForm
            task={editingTask}
            onSave={handleSave}
            onCancel={handleCancel}
            className="TaskForm"
          />
        ) : (
          <TaskList
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
            className="TaskList"
          />
        )}
        {loading && <div>Loading tasks...</div>}
        {error && <div>Error loading tasks: {error.message}</div>}
      </div>
    </div>
  );
}

export default App;
