// components/AppointmentFormModal.js
"use client";
import { useState } from "react";
import AppointmentForm from "./AppointmentForm";

const AppointmentFormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Logic to handle form submission, e.g., save the appointment data
    console.log("Form data:", formData);

    // Close the modal after submission
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content text-black">
            <span className="close-button" onClick={onClose}>
              X
            </span>
            <h2>Add Appointment</h2>
            <AppointmentForm
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentFormModal;
