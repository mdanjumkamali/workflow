import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasksService,
  createTaskService,
  updateTaskService,
  deleteTaskService,
} from "@/services/task.service";
import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskStart,
  createTaskSuccess,
  createTaskFailure,
  updateTaskStart,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskStart,
  deleteTaskSuccess,
  deleteTaskFailure,
} from "@/redux/slice/task.slice";
import { Task } from "@/interfaces/task.interface";

// Fetch all tasks
export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchTasksStart());
      const response = await fetchTasksService();
      thunkAPI.dispatch(fetchTasksSuccess(response.tasks));
    } catch (error: any) {
      thunkAPI.dispatch(fetchTasksFailure(error.message));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a new task
export const createTaskThunk = createAsyncThunk(
  "tasks/createTask",
  async (task: Task, thunkAPI) => {
    try {
      thunkAPI.dispatch(createTaskStart());
      const response = await createTaskService(task);
      thunkAPI.dispatch(createTaskSuccess(response.task));
    } catch (error: any) {
      thunkAPI.dispatch(createTaskFailure(error.message));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update an existing task
export const updateTaskThunk = createAsyncThunk(
  "tasks/updateTask",
  async (task: Task, thunkAPI) => {
    try {
      console.log(task);
      thunkAPI.dispatch(updateTaskStart());
      const response = await updateTaskService(task);
      thunkAPI.dispatch(updateTaskSuccess(response.task));
    } catch (error: any) {
      thunkAPI.dispatch(updateTaskFailure(error.message));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a task
export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, thunkAPI) => {
    try {
      thunkAPI.dispatch(deleteTaskStart());
      await deleteTaskService(taskId);
      thunkAPI.dispatch(deleteTaskSuccess(taskId));
    } catch (error: any) {
      thunkAPI.dispatch(deleteTaskFailure(error.message));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
