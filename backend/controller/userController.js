// exports.getUsers = (req, res)=>{
//     res.status(200).json({message: "route is workin fine"})
// }

let tasks = [];
let currentId = 1;

const getAllTasks = (req, res) => {
    res.json(tasks);
};

const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    res.json(task);
};

const createTask = (req, res) => {
    const task = {
        id: currentId++,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate
    };
    tasks.push(task);
    res.status(201).json(task);
};

const updateTask = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');

    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;
    task.dueDate = req.body.dueDate;
    res.json(task);
};

const deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found.');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};