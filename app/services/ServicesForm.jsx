"use client"
import React, { useState } from 'react'
import { FaPhone } from "react-icons/fa";
import { IoMdPerson, IoIosMail } from "react-icons/io";
import { app } from "../firebase"
import { getDatabase, ref, push } from "firebase/database";
import styles from "./Services.module.css"

const db = getDatabase(app);

export default function ServicesForm({ show, close }) {

    if (!show) {
        return null;
    }

    const [formData, setFormData] = useState({
        service: '',
        doctor: '',
        department: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // const isPincodeValid = (pincode) => {
    //     return serviceablePinCodes.includes(pincode);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await push(ref(db, 'services'), formData);
            alert("Services Added.")
            console.log("Form Data:", formData);
            setFormData({
                service: '',
                doctor: '',
                department: '',
            });

        } catch (error) {
            console.error("Error adding appointment to database: ", error);
            alert("An error occurred while processing your appointment. Please try again later.");
        }
    };

    return (
        <div className=" pt-16 md:pt-12 sm:pt-8">
            <div className="container max-w-4xl items-center">
                <div className={styles.popupContent}>
                    <div className="">
                        <form className="" onSubmit={handleSubmit}>
                            <div className=" bg-slate-100 rounded-lg">
                                <div className=" bg-blue-500 pt-10 px-10 rounded-sm flex flex-row justify-between items-center pb-10">
                                    <div className="">
                                        <h2 className=' text-3xl font-semibold text-white'>Add New Services</h2>
                                        <p className=' text-xl font-medium text-slate-200'>Add New Services</p>
                                    </div>
                                </div>
                                <div className="form-area items-center pt-5 flex justify-center">
                                    <div className=" flex flex-col gap-y-5">
                                        <div className=" flex flex-row gap-x-16 items-center">
                                            <select id='department' name='department' value={formData.department} onChange={handleInputChange} className=' text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500 outline-none' required>
                                                <option value="">Select Departments</option>
                                                <option value="Orthopedic">Orthopedic</option>
                                                <option value="Cardio Physio">Cardio Physio</option>
                                                <option value="Sports Physio">Sports Physio</option>
                                                <option value="Neuro Physio">Neuro Physio</option>
                                                <option value="Rehab Consultant">Rehab Consultant</option>
                                                <option value="Pediatric">Pediatric</option>
                                                <option value="Modern Therapy">Modern Therapy</option>
                                                <option value="Cupping Therapy">Cupping Therapy</option>
                                                <option value="Dry Needling Physiotherapy">Dry Needling Physiotherapy</option>
                                                <option value="IASTM Physiotherapy">IASTM Physiotherapy</option>
                                                <option value="Kinesiotaping Physiotherapy">Kinesiotaping Physiotherapy</option>
                                            </select>
                                            <select id='doctor' name='doctor' value={formData.doctor} onChange={handleInputChange} className=' text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500 outline-none' required>
                                                <option value="">Select Physiotherapists</option>
                                                <option value="Mr. Mritunjay Kumar">Mr. Mritunjay Kumar</option>
                                                <option value="Mr. Shaiban Ahmed Khan">Mr. Shaiban Ahmed Khan</option>
                                                <option value="Ms. Sonal">Ms. Sonal</option>
                                            </select>
                                        </div>
                                        <div className=" flex flex-row gap-x-16 items-center">
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-7 py-3 text-gray-500' >
                                                <input type="text" id='service' name='service' value={formData.service} onChange={handleInputChange} placeholder='Service Name' className=' border-none border-0 text-gray-500 outline-none' required />
                                                <IoMdPerson size={25} className=' ml-8' />
                                            </div>
                                        </div>

                                        <div className=" items-center justify-center text-white">
                                            <div className="">
                                                <button type="submit" className=' bg-slate-700 px-4 py-3 rounded-md mb-10'>Make Appointment</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div >
        </div >
    )
}
