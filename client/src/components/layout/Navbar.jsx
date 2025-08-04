import { LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import kanbanIcon from "../../kanbanIcon.png";

const Navbar = ({ isAuthPage }) => {
  const { user, logout } = useAuth();

  return (
    <nav
      className={`${
        isAuthPage
          ? " bg-transparent"
          : "bg-white border-b border-gray-200 shadow-sm "
      } sticky top-0 px-6 py-4`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={kanbanIcon} alt="" className=" w-6 h-6 text-gray-900" />
          <h1 className="text-xl font-bold text-gray-900">Project Kanban</h1>
        </div>
        {!isAuthPage && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-md text-gray-50 font-semibold rounded-full bg-gray-500 hover:bg-gray-700 h-7 w-7 grid place-content-center cursor-pointer transition-all duration-500">
                {user?.name.slice(0, 1)}
              </span>
            </div>
            <button
              onClick={logout}
              className="px-2 py-1 border border-gray-400 flex items-center space-x-2 text-gray-500 hover:text-red-600 hover:border-red-600 transition-colors duration-500 rounded-md"
            >
              <LogOut className="h-4 w-4 mt-[0.01rem]" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
