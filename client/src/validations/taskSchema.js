import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
  description: Yup.string(),
  status: Yup.string().required("Task status is required"),
  priority: Yup.string().required("Task priority is required"),
});

export default taskSchema;
