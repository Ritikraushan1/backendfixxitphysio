"use client"
import React, { useState } from 'react'
import { FaPhone } from "react-icons/fa";
import { IoMdPerson, IoIosMail } from "react-icons/io";
import { app } from "../firebase"
import { getDatabase, ref, push } from "firebase/database";
import styles from "./Doctors.module.css"

const db = getDatabase(app);

export default function DoctorsForm({ show, close }) {

    if (!show) {
        return null;
    }

    const [formData, setFormData] = useState({
        department: '',
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'phoneNumber') {
            setIsValidPhoneNumber(isValidIndianMobile(value)); // Validate phone number
        }
    };
    const isValidIndianMobile = (number) => {
        const pattern = /^[6-9]\d{9}$/;
        return pattern.test(number);
    };
    // const isPincodeValid = (pincode) => {
    //     return serviceablePinCodes.includes(pincode);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidPhoneNumber) {
            alert("Please enter a valid phone number");
            return;
        }
        try {
            await push(ref(db, 'doctors'), formData);
            alert("New Doctor Added")
            console.log("Form Data:", formData);
            setFormData({
                department: '',
                name: '',
                email: '',
                phoneNumber: '',
                address: '',
            });

        } catch (error) {
            console.error("Error adding doctor to database: ", error);
            alert("An error occurred while processing to add new doctor. Please try again later.");
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
                                        <h2 className=' text-3xl font-semibold text-white'>Add New Doctor</h2>
                                        <p className=' text-xl font-medium text-slate-200'>Add New Physiotherapists according to the Department</p>
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
                                        </div>
                                        <div className=" flex flex-row gap-x-16 items-center">
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-7 py-3 text-gray-500' >
                                                <input type="text" id='name' name='name' value={formData.name} onChange={handleInputChange} placeholder='Doctor Name' className=' border-none border-0 text-gray-500 outline-none' required />
                                                <IoMdPerson size={25} className=' ml-8' />
                                            </div>
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500' >
                                                <input type="text" id='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Doctor Email' className=' border-none border-0 text-gray-500 outline-none' required />
                                                <IoIosMail size={25} className=' ml-4' />
                                            </div>
                                        </div>
                                        <div className=" flex flex-row gap-x-16 items-center">
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-7 py-3 text-gray-500' >
                                                <input type="number" name='phoneNumber' id='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} placeholder='Doctors Phone Number' className=' border-none border-0 text-gray-500 outline-none' required />
                                                <FaPhone size={25} className=' ml-8' />
                                            </div>
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-7 py-3 text-gray-500' >
                                                <textarea name='address' id='address' value={formData.address} onChange={handleInputChange} placeholder='Doctor Address' className=' border-none border-0 text-gray-500 outline-none' required />
                                            </div>

                                        </div>


                                        <div className=" items-center justify-center text-white">
                                            <div className="">
                                                <button type="submit" className=' bg-slate-700 px-4 py-3 rounded-md mb-10'>Add New Doctor</button>
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
