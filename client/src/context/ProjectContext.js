import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const createProject = async (data) => {
    try {
      const res = await apiClient.post("/projects", data);
      setProjects((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProject = async (id, data) => {
    try {
      await apiClient.put("/projects/" + id, data);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProject = async (id) => {
    try {
      await apiClient.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
