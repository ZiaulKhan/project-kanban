import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Plus, Edit3, Trash2, Flag, Calendar } from "lucide-react";
import { getPriorityColor } from "../../utils/styles";

const KanbanColumn = ({
  id,
  title,
  color,
  tasks,
  openModal,
  setDeleteTaskId,
}) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className={`min-h-[24rem] p-4 rounded-lg border-2 border-dashed transition-colors ${color}`}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <h2 className="font-semibold text-gray-700">{title}</h2>
              <span className="text-xs text-gray-500 bg-gray-200 h-6 w-6 rounded-full flex items-center justify-center">
                {tasks.length}
              </span>
            </div>
            <button onClick={() => openModal(null, id)}>
              <Plus className="w-4 h-4 text-gray-500  hover:text-gray-800 rounded-full" />
            </button>
          </div>

          {/* Tasks */}
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided) => (
                <div
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3 cursor-move group"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {task.title}
                    </h3>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openModal(task)}
                        className="p-1 text-gray-400 hover:text-primary-600"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTaskId(task._id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  {task.description && (
                    <p className="text-gray-600 text-xs mb-3">
                      {task.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      <Flag className="h-3 w-3 inline mr-1" />
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(task.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default KanbanColumn;
