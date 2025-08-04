import { createContext, useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

const TaskContext = createContext();

export const TaskProvider = ({ children, projectId = null }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const endpoint = projectId ? `/tasks/project/${projectId}` : `/tasks`; // fetch all tasks if no projectId

      const res = await apiClient.get(endpoint);
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch Tasks Error:", err);
    }
  };

  const createTask = async (data) => {
    try {
      const res = await apiClient.post("/tasks", {
        ...data,
        ...(projectId && { projectId }), // auto-attach projectId if in scoped mode
      });
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Create Task Error:", err);
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await apiClient.put(`/tasks/${id}`, data);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error("Update Task Error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await apiClient.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete Task Error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
