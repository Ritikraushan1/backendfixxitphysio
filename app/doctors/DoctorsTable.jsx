"use client"
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, off, remove } from 'firebase/database';
import { app } from "../firebase"



export default function DoctorsTable() {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase(app);
        const doctorsRef = ref(db, 'doctors'); // Reference to the "users" node in the database

        // Listen for changes in the data at the "users" node
        const onDataChange = (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const doctorsList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setDoctors(doctorsList);
            } else {
                setDoctors([]);
            }
        };


        // Attach listener
        onValue(doctorsRef, onDataChange);

        // Clean up listener
        return () => {
            off(doctorsRef, 'value', onDataChange);
        };
    }, []);

    const handleDelete = (id) => {
        const db = getDatabase(app);
        const doctorRef = ref(db, `doctors/${id}`);
        remove(doctorRef)
            .then(() => {
                console.log(`Doctor with id ${id} deleted successfully.`);
            })
            .catch((error) => {
                console.error("Error deleting service: ", error);
            });
    };


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Department</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                        <TableCell align="right">Email</TableCell>

                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {doctors.map((doctors, index) => (
                        <TableRow
                            key={doctors.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell component="th" scope="row">{doctors.name}</TableCell>
                            <TableCell align="right">{doctors.department}</TableCell>
                            <TableCell align="right">{doctors.phoneNumber}</TableCell>
                            <TableCell align="right">{doctors.email}</TableCell>

                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(doctors.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
