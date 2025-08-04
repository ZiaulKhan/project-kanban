import * as Yup from "yup";

const projectSchema = Yup.object().shape({
  title: Yup.string().required("Project title is required"),
  description: Yup.string(),
});

export default projectSchema;
