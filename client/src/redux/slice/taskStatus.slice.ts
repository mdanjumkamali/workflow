import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum TaskStatus {
  ToDo = "To-Do",
  InProgress = "In Progress",
  UnderReview = "Under Review",
  Finished = "Finished",
}

interface TaskStatusState {
  status: TaskStatus;
}

const initialState: TaskStatusState = {
  status: TaskStatus.ToDo,
};

const taskStatusSlice = createSlice({
  name: "taskStatus",
  initialState,
  reducers: {
    updateTaskStatus(state, action: PayloadAction<TaskStatus>) {
      state.status = action.payload;
    },
  },
});

export const { updateTaskStatus } = taskStatusSlice.actions;
export default taskStatusSlice.reducer;
