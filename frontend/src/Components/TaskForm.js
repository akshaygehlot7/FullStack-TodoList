import React, { useEffect, useState } from 'react'

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setDueDate(task.dueDate);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            ...task,
            title,
            description,
            status,
            dueDate,
        };
        onSave(newTask);
    };
  return (
    <form onSubmit={handleSubmit}>
            <h1>{task ? 'Edit Task' : 'New Task'}</h1>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <label>
                Due Date:
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
  )
}

export default TaskForm
