export const getPriorityColor = (priority) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-700";
    case "LOW":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
