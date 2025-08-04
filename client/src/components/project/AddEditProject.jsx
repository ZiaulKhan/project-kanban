import React from "react";
import Modal from "../shared/Modal";
import InputField from "../shared/Form/InputField";
import TextAreaField from "../shared/Form/TextAreaField";

const AddEditProject = ({
  showModal,
  setShowModal,
  form,
  onSubmit,
  editingProject,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title={editingProject ? "Edit Project" : "Create New Project"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Project Title"
          name="title"
          type="text"
          form={form}
          inputProps={{ placeholder: "Enter project title" }}
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
          required
        />

        <TextAreaField
          label="Description (Optional)"
          name="description"
          type="text"
          form={form}
          textareaProps={{ placeholder: "Enter project description" }}
          labelClassName="block text-sm font-medium text-gray-700 mb-1"
        />

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary flex-1">
            {editingProject ? "Update" : "Create"} Project
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditProject;
