// controllers/taskController.js
import TaskModel from "../model/task.model.js";

// Add a new task
export const addTask = async (req, res) => {
  try {
    const { task, startDate, endDate } = req.body;
    const newTask = new TaskModel({ task, startDate, endDate });
    const savedTask = await newTask.save();
    res.status(201).json({ success: true, message: "Task added", data: savedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding task", error: error.message });
  }
};

// Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving tasks", error: error.message });
  }
};

export const getTasksById = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await TaskModel.findById(id); // Pass `id` to findById
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error retrieving task",
        error: error.message,
      });
    }
  };

// Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, startDate, endDate } = req.body;
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { task, startDate, endDate },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, message: "Task updated", data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating task", error: error.message });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task", error: error.message });
  }
};

export const paginationWithSearch = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchQuery = req.query.search || '';

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Define search criteria
    const searchCriteria = {
      $or: [
        { task: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search for task
      ]
    };

    // Attempt to parse the search query as a date
    const parsedDate = new Date(searchQuery);
    if (!isNaN(parsedDate.getTime())) {
      searchCriteria.$or.push(
        { startDate: parsedDate }, // Exact match for startDate
        { endDate: parsedDate } // Exact match for endDate
      );
    }

    // Fetch the paginated data with search criteria
    const taskdata = await TaskModel.find(searchCriteria)
      .skip(skip)
      .limit(limit);

    // Get the total number of documents that match the search criteria
    const totalTask = await TaskModel.countDocuments(searchCriteria);

    // Send the response with pagination and search info
    res.json({
      totalTask,
      totalPages: Math.ceil(totalTask / limit),
      currentPage: page,
      taskdata
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTaskStatus = (req, res) => {
  const { id } = req.params; // Get the contact ID from the URL
  const { status } = req.body; // Get the new status from the request body

  // Find contact by ID and update the status
  TaskModel.findByIdAndUpdate(id, { status: status }, { new: true })
    .then((updatedTask) => {
      if (!updatedTask) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json({ success: true, message: 'Status updated successfully', updatedTask });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to update status', error: err });
    });
};