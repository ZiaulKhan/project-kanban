import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, FolderOpen, Calendar, Trash2, Edit3 } from "lucide-react";

import LoadingSpinner from "../components/shared/LoadingSpinner";

import { useProjects } from "../context/ProjectContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import projectSchema from "../validations/projectSchema";
import DeleteModal from "../components/shared/DeleteModal";
import AddEditProject from "../components/project/AddEditProject";

const Projects = () => {
  const form = useForm({
    resolver: yupResolver(projectSchema),
  });

  const { projects, loading, createProject, updateProject, deleteProject } =
    useProjects();

  const [showModal, setShowModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const onSubmit = async (data) => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, data);
        toast.success("Project updated successfully");
      } else {
        await createProject(data);
        toast.success("Project created successfully");
      }
      setShowModal(false);
      setEditingProject(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to save project");
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully");
      setDeleteProjectId(null);
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const openModal = (project = null) => {
    setEditingProject(project);

    form.reset({
      title: project?.title || "",
      description: project?.description || "",
    });
    setShowModal(true);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-gray-600">
            Manage your projects and organize your tasks
          </p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </button>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="card hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center justify-between mb-4 ">
                <FolderOpen className="h-6 w-6 text-primary-600" />
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openModal(project)}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteProjectId(project._id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {project.description || "No description provided"}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(project.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                <Link
                  to={`/projects/${project._id}/board`}
                  className="btn-primary text-sm"
                >
                  Open Board
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No projects yet
          </h3>
          <p className="text-gray-500 mb-6">
            Get started by creating your first project
          </p>
          <button onClick={() => openModal()} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </button>
        </div>
      )}

      <AddEditProject
        form={form}
        onSubmit={onSubmit}
        showModal={showModal}
        setShowModal={setShowModal}
        editingProject={editingProject}
      />
      <DeleteModal
        title="Delete Project"
        deleteModalOpen={deleteProjectId}
        handleClose={() => setDeleteProjectId(null)}
        handleDelete={() => handleDelete(deleteProjectId)}
      />
    </div>
  );
};

export default Projects;
