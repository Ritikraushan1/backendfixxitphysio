"use client"
import React, { useState } from 'react'
import { FaPhone } from "react-icons/fa";
import { IoMdPerson, IoIosMail } from "react-icons/io";
import { app } from "../firebase"
import { getDatabase, ref, push } from "firebase/database";
import styles from "./Appointmentform.module.css"

const db = getDatabase(app);

export default function AppointmentForm({ show, close }) {

    if (!show) {
        return null;
    }

    const [formData, setFormData] = useState({
        service: '',
        doctor: '',
        name: '',
        email: '',
        phoneNumber: '',
        serviceType: '',
        pincode: '',
        date: '',
        time: '',
        address: '',
    });
    const [isPincodeValid, setIsPincodeValid] = useState(true);
    const serviceablePinCodes = ['201310', '210306', '201307', '201309', '201301', '201302', '201303', '201304', '201305', '201308'];
    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 8; hour <= 20; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour > 12 ? (hour - 12).toString() : hour.toString();
                const amPm = hour >= 12 ? 'PM' : 'AM';
                const formattedMinute = minute.toString().padStart(2, '0');
                options.push(`${formattedHour}:${formattedMinute} ${amPm}`);
            }
        }
        return options;
    };
    const generateDateOptions = () => {
        const options = [];
        const today = new Date();
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1); // Start from next day
        const endDate = new Date(today);
        endDate.setMonth(today.getMonth() + 2); // End after 2 months

        while (nextDay <= endDate) {
            const formattedDate = nextDay.toISOString().split('T')[0]; // Get YYYY-MM-DD format
            options.push(formattedDate);
            nextDay.setDate(nextDay.getDate() + 1); // Increment to next day
        }
        return options;
    };

    function getNextDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // const isPincodeValid = (pincode) => {
    //     return serviceablePinCodes.includes(pincode);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.serviceType === 'home' && !serviceablePinCodes.includes(formData.pincode)) {
            setIsPincodeValid(false);
            return;
        }

        try {
            await push(ref(db, 'appointments'), formData);
            alert("Appointment is successful.")
            console.log("Form Data:", formData);
            setFormData({
                service: '',
                doctor: '',
                name: '',
                email: '',
                phoneNumber: '',
                serviceType: '',
                pincode: '',
                date: '',
                time: '',
                address: '',
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
                                        <h2 className=' text-3xl font-semibold text-white'>Make an Appointment</h2>
                                        <p className=' text-xl font-medium text-slate-200'>Schedule Your Physiotherapy Session Today!</p>
                                    </div>
                                    <div className="">


                                        <a
                                            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
                                            href="tel:+918298954193"
                                        >
                                            <span className="text-sm font-medium"> Call Now </span>

                                            <svg
                                                className="size-5 rtl:rotate-180"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                />
                                            </svg>
                                        </a>

                                    </div>
                                </div>
                                <div className="form-area items-center pt-5 flex justify-center">
                                    <div className=" flex flex-col gap-y-5">
                                        <div className=" flex flex-row gap-x-16 items-center">
                                            <select id='service' name='service' value={formData.service} onChange={handleInputChange} className=' text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500 outline-none' required>
                                                <option value="">Select Services</option>
                                                <option value="Rehabilitation">Rehabilitation</option>
                                                <option value="Stroke Treatmen">Stroke Treatment</option>
                                                <option value="Posture Correction">Posture Correction</option>
                                                <option value="Workout Training">Workout Training</option>
                                                <option value="Frozen Shoulder">Frozen Shoulder</option>
                                                <option value="Tennis Elbow">Tennis Elbow</option>
                                                <option value="Golfer Elbow">Golfer Elbow</option>
                                                <option value="ACL Rehab">ACL Rehab</option>
                                                <option value="Ankylosing Spondylitis">Ankylosing Spondylitis</option>
                                                <option value="Cupping/ Hijama / Therapy">Cupping/ Hijama / Therapy</option>
                                                <option value="Arthritis OA/RA">Arthritis OA/RA</option>
                                                <option value="Dry Needling">Dry Needling</option>
                                                <option value="MFR-IASTM">MFR-IASTM</option>
                                                <option value="Back Pain">Back Pain</option>
                                                <option value="Neck Pain">Neck Pain</option>
                                                <option value="Knee Pain">Knee Pain</option>
                                                <option value="Heel Pain">Heel Pain</option>
                                                <option value="Accupressure">Accupressure</option>
                                                <option value="Bell's / Facial Palsy">Bell's / Facial Palsy</option>
                                                <option value="Sciatica Treatment">Sciatica Treatment</option>
                                                <option value="Paralysis Treatment">Paralysis Treatment</option>
                                                <option value="Any Other">Any Other</option>
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
                                                <input type="text" id='name' name='name' value={formData.name} onChange={handleInputChange} placeholder='Your Name' className=' border-none border-0 text-gray-500 outline-none' required />
                                                <IoMdPerson size={25} className=' ml-8' />
                                            </div>
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500' >
                                                <input type="text" id='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Your Email' className=' border-none border-0 text-gray-500 outline-none' required />
                                                <IoIosMail size={25} className=' ml-4' />
                                            </div>
                                        </div>
                                        <div className=" flex flex-row gap-x-16 items-center">
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-7 py-3 text-gray-500' >
                                                <input type="number" name='phoneNumber' id='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} placeholder='Your Phone Number' className=' border-none border-0 text-gray-500 outline-none' required />
                                                <FaPhone size={25} className=' ml-8' />
                                            </div>
                                            <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500' >
                                                <select className=' border-none outline-none' id="serviceType" name='serviceType' value={formData.serviceType} onChange={handleInputChange} required>
                                                    <option value="">Types of Service</option>
                                                    <option value="virtual">Virtual Appointment</option>
                                                    <option value="home">Home Visit</option>
                                                    <option value="clinical">Clinical Visit</option>
                                                </select>
                                            </div>
                                        </div>
                                        {formData.serviceType === 'home' && (
                                            <div className="flex flex-row gap-x-16 items-center">

                                                <>
                                                    <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-7 py-3 text-gray-500' >
                                                        <input type="number" pattern="[0-9]{6}" maxLength={6} id='pincode' name='pincode' value={formData.pincode} onChange={handleInputChange} placeholder='Pin Code' className=' border-none border-0 text-gray-500 bg-white outline-none' />
                                                    </div>
                                                    {!isPincodeValid && <p style={{ color: 'red' }}>Pin code is not serviceable.</p>}

                                                </>
                                                {isPincodeValid && (
                                                    <>
                                                        <div className=' bg-white flex flex-row items-center justify-between text-xl border-solid border-gray-700 border-2 rounded-3xl px-7 py-3 text-gray-500' >
                                                            <textarea id='address' name='address' value={formData.address} onChange={handleInputChange} placeholder='Full Address' className=' border-none border-0 text-gray-500 outline-none' />
                                                        </div>
                                                        {/* <textarea id="address" name='address' value={address}  /> */}
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <div className=" flex flex-row gap-x-16 items-center">
                                            <select id='time' name='time' value={formData.time} onChange={handleInputChange} className=' text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500 outline-none'>
                                                {generateTimeOptions().map(time => (
                                                    <option key={time} value={time}>{time}</option>
                                                ))}
                                            </select>
                                            <select id='date' name='date' value={formData.date} onChange={handleInputChange} className=' text-xl border-solid border-gray-700 border-2 rounded-3xl px-8 py-3 text-gray-500 outline-none'>
                                                {generateDateOptions().map(date => (
                                                    <option key={date} value={date}>{date}</option>
                                                ))}
                                            </select>
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
