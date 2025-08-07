const TaskModel = require("../Models/TaskModel");

const CreateTask = async (req, res) => {
  const { projectTitle, description, assignedTo, startDate, endDate } =
    req.body;

  try {
    const taskExist = await TaskModel.findOne({ projectTitle, assignedTo });
    if (taskExist) {
      return res.status(409).json({
        // maybe use 409 Conflict rather than 511
        message: "Task already assigned to this user",
      });
    }

    const newTask = new TaskModel({
      projectTitle,
      description,
      assignedTo,
      startDate,
      endDate,
    });

    const result = await newTask.save();

    res.json({
      id: result._id,
      projectTitle: result.projectTitle,
      assignedTo: result.assignedTo,
      startDate: result.startDate,
      endDate: result.endDate,
      description: result.description,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetAllTask = async (req, res) => {
  try {
    const result = await TaskModel.find().sort({ createdAt: -1 });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const GetSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(406).json({ message: "Task id not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const DeleteSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) {
      return res.status(520).json({ message: "Task id not found" });
    }

    res.json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const UpdateSingleTask = async (req, res) => {
  const { id } = req.params;
  const {
    projectTitle,
    description,
    assignedTo,
    startDate,
    endDate,
    projectlink,
    status,
    isCompleted,
  } = req.body;
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(406).json({ message: "Task id not found" });
    } else {
      task.projectTitle = projectTitle || task.projectTitle;
      task.description = description || task.description;
      task.assignedTo = assignedTo || task.assignedTo;
      task.startDate = startDate || task.startDate;
      task.endDate = endDate || task.endDate;
      task.projectlink = projectlink || task.projectlink;
      task.status = status || task.status;
      task.isCompleted = isCompleted || task.isCompleted;
    }
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  CreateTask,
  GetAllTask,
  GetSingleTask,
  DeleteSingleTask,
  UpdateSingleTask,
};
