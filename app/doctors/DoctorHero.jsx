"use client"
import React, { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, off, query, equalTo } from 'firebase/database';
import { app } from "../firebase"

export default function DoctorHero() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAppointmentsToday, setTotalAppointmentsToday] = useState(0);

    useEffect(() => {
        const db = getDatabase(app); // Get a reference to the Firebase Realtime Database
        const appointmentsRef = ref(db, 'appointments'); // Reference to the "appointments" node in the database

        const todayDate = new Date().toISOString().split('T')[0];

        // Create a query to filter appointments for today's date
        const appointmentsForTodayQuery = query(
            appointmentsRef,
            equalTo(todayDate, 'date')
        );

        // Listen for changes in the data based on the query
        const onDataChange = (snapshot) => {
            if (snapshot.exists()) {
                const appointmentsData = snapshot.val();
                const numAppointments = Object.keys(appointmentsData).length; // Count the number of appointments
                setTotalAppointmentsToday(numAppointments);
            } else {
                setTotalAppointmentsToday(0);
            }
        };


        // Listen for changes in the data at the "appointments" node
        onValue(appointmentsRef, (snapshot) => {
            if (snapshot.exists()) {
                const appointmentsData = snapshot.val();
                const numUsers = Object.keys(appointmentsData).length; // Count the number of users
                setTotalUsers(numUsers);
            } else {
                setTotalUsers(0);
            }
        });
        onValue(appointmentsForTodayQuery, onDataChange);



        // Clean up listener
        return () => {
            // Detach the listener when the component unmounts
            // This prevents memory leaks and unexpected behavior
            off(appointmentsRef);
            off(appointmentsForTodayQuery, 'value', onDataChange);
        };
    }, []);


    return (
        <div>
            <div className=" bg-slate-200 rounded-sm">
                <div className=" grid grid-cols-4 gap-20 px-5 py-10 ">
                    <div className=" flex flex-col gap-2">
                        <p className=' text-md font-bold text-gray-500'>Total Appointments:</p>
                        <p className=' text-3xl font-semibold text-gray-700 ml-2'>{totalUsers}</p>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <p className=' text-md font-bold text-gray-500'>Today's Appointments:</p>
                        <p className=' text-3xl font-semibold text-gray-700 ml-2'>{totalAppointmentsToday}</p>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <p className=' text-md font-bold text-gray-500'>Total Doctors:</p>
                        <p className=' text-3xl font-semibold text-gray-700 ml-2'>200</p>
                    </div>
                    <div className=" flex flex-col gap-2">
                        <p className=' text-md font-bold text-gray-500'>Total Services:</p>
                        <p className=' text-3xl font-semibold text-gray-700 ml-2'>200</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
