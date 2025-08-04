const mongoose = require("mongoose");
const { z } = require("zod");

const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string(),
  user: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid user id",
  }),
});

module.exports = projectSchema;
