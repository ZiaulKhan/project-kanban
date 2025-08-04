import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { DragDropContext } from "@hello-pangea/dnd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ArrowLeft, Plus } from "lucide-react";

import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import taskSchema from "../../validations/taskSchema";

import LoadingSpinner from "../shared/LoadingSpinner";
import AddEditTask from "../task/AddEditTask";
import DeleteModal from "../shared/DeleteModal";
import KanbanColumn from "./KanbanColumn";

const columns = [
  { id: "TODO", title: "To Do", color: "bg-gray-100 border-gray-300" },
  {
    id: "IN_PROGRESS",
    title: "In Progress",
    color: "bg-blue-50 border-blue-300",
  },
  { id: "DONE", title: "Done", color: "bg-green-50 border-green-300" },
];

const KanbanBoard = () => {
  const form = useForm({
    resolver: yupResolver(taskSchema),
  });

  const { projectId } = useParams();
  const { projects } = useProjects();
  const { tasks, updateTask, createTask, deleteTask } = useTasks();
  const project = projects.find((p) => p._id === projectId);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const groupedTasks = columns.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id);
    return acc;
  }, {});

  const handleDragEnd = async (result) => {
    const { draggableId, destination } = result;
    if (!destination) return;

    try {
      await updateTask(draggableId, { status: destination.droppableId });
      toast.success("Task moved");
    } catch {
      toast.error("Failed moving task");
    }
  };

  const openModal = (task = null, status = "TODO") => {
    setEditingTask(task);
    form.reset({
      title: task?.title || "",
      description: task?.description || "",
      status: task?.status || status,
      priority: task?.priority || "MEDIUM",
    });
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingTask) {
        await updateTask(editingTask._id, data);
        toast.success("Task updated");
      } else {
        await createTask({ ...data, project: projectId });
        toast.success("Task created");
      }
      setShowModal(false);
      setEditingTask(null);
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      setDeleteTaskId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!project || loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Column Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-4">
          <Link
            to="/projects"
            className="mt-1 p-1 text-white rounded-full bg-gray-300 hover:bg-gray-400 transition-all duration-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {project.title}
            </h1>
            <p className="text-gray-600">
              {project.description || "No description"}
            </p>
          </div>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(({ id, title, color }) => (
            <KanbanColumn
              key={id}
              id={id}
              title={title}
              color={color}
              tasks={groupedTasks[id]}
              openModal={openModal}
              setDeleteTaskId={setDeleteTaskId}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Task Modal */}
      <AddEditTask
        form={form}
        onSubmit={onSubmit}
        showModal={showModal}
        setShowModal={setShowModal}
        editingTask={editingTask}
      />
      <DeleteModal
        title="Delete Task"
        deleteModalOpen={deleteTaskId}
        handleClose={() => setDeleteTaskId(null)}
        handleDelete={() => handleDelete(deleteTaskId)}
      />
    </div>
  );
};

export default KanbanBoard;
