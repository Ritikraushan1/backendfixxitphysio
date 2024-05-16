"use client"
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { app } from "../firebase"

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function AppointmentTable() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase(app);
        const usersRef = ref(db, 'appointments'); // Reference to the "users" node in the database

        // Listen for changes in the data at the "users" node
        const onDataChange = (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const userList = Object.values(userData); // Convert object to array
                setUsers(userList);
            } else {
                setUsers([]);
            }
        };

        // Attach listener
        onValue(usersRef, onDataChange);

        // Clean up listener
        return () => {
            // Detach the listener when the component unmounts
            // This prevents memory leaks and unexpected behavior
            off(usersRef, 'value', onDataChange);
        };
    }, []);


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                        <TableCell align="right">Service</TableCell>
                        <TableCell align="right">Physio</TableCell>
                        <TableCell align="right">Appointment Date</TableCell>
                        <TableCell align="right">Appointment Time</TableCell>
                        <TableCell align="right">Appointment Type</TableCell>
                        <TableCell align="right">Appointment Mail</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.name}
                            </TableCell>
                            <TableCell align="right">{user.phoneNumber}</TableCell>
                            <TableCell align="right">{user.service}</TableCell>
                            <TableCell align="right">{user.doctor}</TableCell>
                            <TableCell align="right">{user.date}</TableCell>
                            <TableCell align="right">{user.time}</TableCell>
                            <TableCell align="right">{user.serviceType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
