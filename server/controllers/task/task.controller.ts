import { Request, Response } from "express";
import { Task } from "../../models/task/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const task = new Task({
      title,
      description,
      status,
      priority,
      deadline,
      user: req.user?.id,
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the request" });
    }
    const tasks = await Task.find({ user: req.user.id });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, deadline } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.deadline = deadline;
    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.user.toString() !== req.user?.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
