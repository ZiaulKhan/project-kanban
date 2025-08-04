const mongoose = require("mongoose");
const { z } = require("zod");

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  project: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid project id",
  }),
});

module.exports = taskSchema;
