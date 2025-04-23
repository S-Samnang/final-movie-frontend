import React from "react";

const ConfirmAlert = ({ onConfirm, onCancel }) => {
  const handleOutsideClick = (e) => {
    // Check if the clicked element is outside the modal content
    if (e.target.id === "deleteModal") {
      onCancel();
    }
  };
  return (
    <div
      id="deleteModal"
      onClick={handleOutsideClick}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
    >
      <div className="relative p-4 w-full  max-w-md bg-white rounded-lg shadow dark:bg-gray-800">
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={onCancel}
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600"
          >
            No, cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
