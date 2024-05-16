"use client"
import React, { useState } from 'react'
import AppointmentFormModal from './AppointmentFormModal'

export default function AppointmentNav() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            <div className=" pt-3 flex items-end justify-end">
                <button className=' text-black bg-gray-400 py-2 px-3 rounded-md' onClick={openModal}>Add New Appointments</button>
                <AppointmentFormModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    )
}
