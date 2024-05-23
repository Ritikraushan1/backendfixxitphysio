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



export default function ServicesTable() {
    const [services, setServices] = useState([]);
    useEffect(() => {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase(app);
        const servicesRef = ref(db, 'services'); // Reference to the "users" node in the database

        // Listen for changes in the data at the "users" node
        const onDataChange = (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const servicesList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setServices(servicesList);
            } else {
                setServices([]);
            }
        };


        // Attach listener
        onValue(servicesRef, onDataChange);

        // Clean up listener
        return () => {
            off(servicesRef, 'value', onDataChange);
        };
    }, []);

    const handleDelete = (id) => {
        const db = getDatabase(app);
        const serviceRef = ref(db, `services/${id}`);
        remove(serviceRef)
            .then(() => {
                console.log(`Service with id ${id} deleted successfully.`);
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
                        <TableCell align="right">Doctor</TableCell>

                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.map((services, index) => (
                        <TableRow
                            key={services.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell component="th" scope="row">{services.service}</TableCell>
                            <TableCell align="right">{services.department}</TableCell>
                            <TableCell align="right">{services.doctor}</TableCell>

                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDelete(services.id)}
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
