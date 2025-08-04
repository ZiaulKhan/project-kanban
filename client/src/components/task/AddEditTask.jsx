import React from "react";
import Modal from "../shared/Modal";
import InputField from "../shared/Form/InputField";
import TextAreaField from "../shared/Form/TextAreaField";
import SelectField from "../shared/Form/SelectField";

const AddEditTask = ({
  showModal,
  setShowModal,
  form,
  onSubmit,
  editingTask,
}) => {
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title={editingTask ? "Edit Task" : "Create New Task"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Task Title"
          name="title"
          type="text"
          form={form}
          labelClassName="block text-sm font-medium !text-gray-700"
          inputProps={{ placeholder: "Enter task title" }}
          required
        />

        <TextAreaField
          label="Description (Optional)"
          name="description"
          type="text"
          form={form}
          labelClassName="block text-sm font-medium !text-gray-700 "
          textareaProps={{ placeholder: "Enter task description" }}
        />
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            name="status"
            label="Status"
            selectProps={{ placeholder: "Select status" }}
            required
            form={form}
            options={[
              { value: "TODO", label: "To Do" },
              { value: "IN_PROGRESS", label: "In Progress" },
              { value: "DONE", label: "Done" },
            ]}
            labelClassName="block text-sm font-medium !text-gray-700"
          />

          <SelectField
            name="priority"
            label="Priority"
            selectProps={{ placeholder: "Select Priority" }}
            required
            form={form}
            options={[
              { value: "LOW", label: "Low" },
              { value: "MEDIUM", label: "Medium" },
              { value: "HIGH", label: "High" },
            ]}
            labelClassName="block text-sm font-medium !text-gray-700"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary flex-1">
            {editingTask ? "Update" : "Create"} Task
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditTask;
