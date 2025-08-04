import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import Projects from "./pages/Projects";
import ProjectKanban from "./pages/ProjectKanban";
import Login from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";

const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <RegisterPage />}
      />
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="projects/:projectId/board" element={<ProjectKanban />} />
      </Route>
    </Routes>
  );
};

export default App;
