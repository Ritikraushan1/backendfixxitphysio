"use client"
import React, { useState } from 'react'
import ServicesForm from './ServicesForm'
import styles from './Services.module.css';

export default function ServicesNav() {
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
                <button className=' text-black bg-gray-400 py-2 px-3 rounded-md' onClick={handleOpenPopup}>Add New Services</button>
            </div>
            {showPopup && (
                <div className={styles.overlay} onClick={handleClosePopup}>
                    <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
                        <ServicesForm show={showPopup} close={handleClosePopup} />
                    </div>
                </div>
            )}
        </div>
    )
}
