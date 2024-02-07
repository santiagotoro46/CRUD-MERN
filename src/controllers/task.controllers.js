import Task from '../models/task.model.js';

// creamos funciones para los endpoints

export const getTasks = async (req,res) => {// Llama todas las tareas (GET)

    const tasks = await Task.find({
        user: req.user.id
    }).populate('user');
    res.json(tasks);
};

export const getTask = async (req,res) => { // Llamamos a una tarea en especifico (GET id)

    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ message: 'Task Not Found' });
    res.status(200).json(task);
};

export const createTask = async (req,res) => { // utilizamos la desestructuracion de datos crear tareas (POST)

    const { title, description, date } = req.body;

    const newTask = new Task ({ 
        title,
        description,
        date,
        user: req.user.id
    });
    const savedTask = await newTask.save(); // guardamos la tarea
    res.status(200).json(savedTask);
};

export const updateTask = async (req,res) => { // actualizar tareas (PUT)

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!task) return res.status(404).json({ message: 'Update Task'});
    return res.status(201).json(task);
};

export const deleteTask = async (req,res) => {// eliminar tareas aunque no se usa mucho (DELETE)

    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json ({ message: 'Deleted Task' })
    return res.status(204).json(task);
};

// Finaliza la creacion de endpoints

