import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FolderOpen, Calendar, CheckCircle, Clock, Target } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";

import LoadingSpinner from "../components/shared/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const { projects, loading: loadingProjects, fetchProjects } = useProjects();
  const { tasks, loading: loadingTasks, fetchTasks } = useTasks();

  const loading = loadingProjects || loadingTasks;

  const getStats = () => {
    const completedTasks = tasks.filter((t) => t.status === "DONE").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "IN_PROGRESS"
    ).length;
    return {
      totalProjects: projects.length,
      totalTasks: tasks.length,
      completedTasks,
      inProgressTasks,
    };
  };

  useEffect(() => {
    if (!user) return;
    fetchProjects();
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderStatCards = (stats) => {
    const statConfig = [
      {
        title: "Total Projects",
        value: stats.totalProjects,
        icon: FolderOpen,
        color: "bg-blue-500",
      },
      {
        title: "Total Tasks",
        value: stats.totalTasks,
        icon: Target,
        color: "bg-purple-500",
      },
      {
        title: "Completed",
        value: stats.completedTasks,
        icon: CheckCircle,
        color: "bg-green-500",
      },
      {
        title: "In Progress",
        value: stats.inProgressTasks,
        icon: Clock,
        color: "bg-orange-500",
      },
    ];

    return statConfig.map(({ title, value, icon: Icon, color }, i) => (
      <div key={i} className="card hover:shadow-md transition-shadow">
        <div className="flex items-center">
          <div className={`${color} p-3 rounded-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    ));
  };

  const renderRecentProjects = (projects) => {
    if (!projects.length) {
      return (
        <div className="text-center py-8">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No projects yet</p>
          <Link to="/projects" className="btn-primary mt-4">
            Create your first project
          </Link>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {projects.slice(0, 3).map((project) => (
          <div
            key={project._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-2 rounded-lg">
                <FolderOpen className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{project.title}</h3>
                <p className="text-sm text-gray-500">
                  {project.description || "No description"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                <Calendar className="h-4 w-4 inline mr-1 mb-1" />
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <Link
                to={`/projects/${project._id}/board`}
                className="btn-secondary"
              >
                View Board
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  const stats = getStats();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name ?? "User"}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your projects today.
          </p>
        </div>
        {/* <Link to="/projects" className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Link> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderStatCards(stats)}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Projects
          </h2>
          <Link
            to="/projects"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            View all
          </Link>
        </div>
        {renderRecentProjects(projects)}
      </div>
    </div>
  );
};

export default Dashboard;
