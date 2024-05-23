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
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { app } from "../firebase"

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}


export default function ContactTable() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase(app);
        const usersRef = ref(db, 'contacts'); // Reference to the "users" node in the database

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
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Query Type</TableCell>
                        <TableCell align="right">Message</TableCell>
                        <TableCell align="right">Actions</TableCell>
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
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.query}</TableCell>
                            <TableCell align="right">{user.message}</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => window.location.href = `tel:${user.phoneNumber}`}
                                >
                                    Call
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => window.location.href = `mailto:${user.email}`}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Email
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
