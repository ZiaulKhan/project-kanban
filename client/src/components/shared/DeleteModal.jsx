import React from "react";
import Modal from "./Modal";

const DeleteModal = ({ title, deleteModalOpen, handleClose, handleDelete }) => {
  return (
    <Modal isOpen={deleteModalOpen} onClose={handleClose} title={title}>
      <p>Are you sure?</p>
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={handleClose}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
        <button onClick={handleDelete} className="btn-primary flex-1">
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
