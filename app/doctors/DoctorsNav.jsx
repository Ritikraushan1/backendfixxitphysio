"use client"
import React, { useState } from 'react'
import DoctorsForm from './DoctorsForm'
import styles from './Doctors.module.css';

export default function DoctorsNav() {
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
                <button className=' text-black bg-gray-400 py-2 px-3 rounded-md' onClick={handleOpenPopup}>Add New Doctors</button>
            </div>
            {showPopup && (
                <div className={styles.overlay} onClick={handleClosePopup}>
                    <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                        <DoctorsForm show={showPopup} close={handleClosePopup} />
                    </div>
                </div>
            )}
        </div>
    )
}
