"use client";

import { Task } from "@/interfaces/task.interface";
import { useAppDispatch, useAppSelector } from "@/redux/redux.hooks";
import { setSelectedTask } from "@/redux/slice/task.slice";
import { TaskStatus, updateTaskStatus } from "@/redux/slice/taskStatus.slice";
import { openSheet } from "@/redux/slice/toggle.slice";
import {
  deleteTaskThunk,
  fetchTasksThunk,
  updateTaskThunk,
} from "@/redux/thunk/task.thunk";
import { AlignLeft, Plus } from "lucide-react";
import React, { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import moment from "moment";
import { Skeleton } from "../ui/skeleton";

interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

interface BoardState {
  [key: string]: Column;
}

// Helper function to format date
const formatDate = (isoDate: Date): string => {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0];
};

const createdDate = (timestamp: Date) => {
  const relativeTime = moment(timestamp).fromNow();
  return relativeTime;
};

// Board component
const Board: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((s) => s.task);

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, []);

  const handleClick = (status: TaskStatus) => {
    dispatch(openSheet());
    dispatch(updateTaskStatus(status));
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTaskThunk(taskId));
  };

  const handleTaskClick = (task: Task) => {
    dispatch(setSelectedTask(task));
    dispatch(openSheet());
  };

  const columns: BoardState = {
    [TaskStatus.ToDo]: {
      id: TaskStatus.ToDo,
      title: "To Do",
      tasks: tasks.filter((task) => task.status === TaskStatus.ToDo),
    },
    [TaskStatus.InProgress]: {
      id: TaskStatus.InProgress,
      title: "In Progress",
      tasks: tasks.filter((task) => task.status === TaskStatus.InProgress),
    },
    [TaskStatus.UnderReview]: {
      id: TaskStatus.UnderReview,
      title: "Under Review",
      tasks: tasks.filter((task) => task.status === TaskStatus.UnderReview),
    },
    [TaskStatus.Finished]: {
      id: TaskStatus.Finished,
      title: "Finished",
      tasks: tasks.filter((task) => task.status === TaskStatus.Finished),
    },
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      console.log("Dropped outside of any droppable area");
      return;
    }

    const sourceColumn = columns[source.droppableId as TaskStatus];
    const destColumn = columns[destination.droppableId as TaskStatus];

    if (!sourceColumn || !destColumn) {
      console.error("Source or destination column is undefined");
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Handle drag within the same column
      const updatedTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      dispatch(
        updateTaskThunk({
          ...movedTask,
          status: sourceColumn.id,
        })
      );
    } else {
      // Handle drag between columns
      const sourceTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      const destTasks = Array.from(destColumn.tasks);
      destTasks.splice(destination.index, 0, movedTask);

      dispatch(
        updateTaskThunk({
          ...movedTask,
          status: destColumn.id,
        })
      );
    }
  };

  if (loading)
    return (
      <div className="flex ">
        {loading &&
          Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <Skeleton className="h-[125px] w-[250px] rounded-xl m-4" />
              </div>
            ))}
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        {Object.values(columns).map((column) => (
          <div key={column.id} className="w-full md:w-1/4 rounded-lg p-4">
            <div className="flex items-center justify-between text-[#555555] my-2">
              <p className="text-md">{column.title}</p>
              <AlignLeft />
            </div>
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-h-[500px]"
                >
                  {column.tasks.map((task, index) => {
                    const draggableId = task._id!;

                    return (
                      <Draggable
                        key={draggableId}
                        draggableId={draggableId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-4"
                          >
                            <TaskCard
                              title={task.title}
                              description={task.description!}
                              badge={task.priority}
                              date={formatDate(task.deadline)}
                              time={createdDate(task.updatedAt!)}
                              status={task.status}
                              onDelete={() => handleDeleteTask(task._id!)}
                              onEdit={() => handleTaskClick(task)}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}

                  <button
                    className="w-full mt-3 flex items-center justify-between bg-black-gradient text-white p-2 rounded-md"
                    onClick={() => handleClick(column.id)}
                  >
                    Add New
                    <Plus />
                  </button>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
