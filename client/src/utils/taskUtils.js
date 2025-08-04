// utils/taskUtils.js
export const groupTasksByStatus = (tasks, columns) =>
  columns.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id);
    return acc;
  }, {});
