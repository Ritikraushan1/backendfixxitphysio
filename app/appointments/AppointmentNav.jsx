"use client"
import React, { useState } from 'react'
import AppointmentForm from './AppointmentForm'

export default function AppointmentNav() {
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    return (
        <div>
            <div className=" pt-3 flex items-end justify-end">
                <button className=' text-black bg-gray-400 py-2 px-3 rounded-md' onClick={openModal}>Add New Appointments</button>
                <AppointmentForm show={showPopup} onClose={handleClosePopup} />
            </div>
        </div>
    )
}
