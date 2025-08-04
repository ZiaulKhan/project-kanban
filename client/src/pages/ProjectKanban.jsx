// ProjectDetails.jsx
import { useParams } from "react-router-dom";
import KanbanBoard from "../components/project/KanbanBoard";
import { TaskProvider } from "../context/TaskContext";

const ProjectDetails = () => {
  const { projectId } = useParams();

  return (
    <TaskProvider projectId={projectId}>
      <KanbanBoard />
    </TaskProvider>
  );
};

export default ProjectDetails;
