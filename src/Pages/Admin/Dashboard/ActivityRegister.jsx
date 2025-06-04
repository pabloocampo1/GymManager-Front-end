import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { api } from '../../../Service/api';
import { WidthFull } from '@mui/icons-material';

const ActivityRegister = () => {

    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/api/accessLog/getAll");
                setActivityData(response.data)
            } catch (Error) {
                console.error(Error);

            }


        }

        fetchData();
    }, []);


    return (
        <Box sx={{ height: "100%" }}>
            <Typography component="h3" sx={{ textAlign: "center", fontWeight: "700" }}>Registro de actividad</Typography>

            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%', height: '200px' }} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign:"center"}} align="right">Id</TableCell>
                                <TableCell sx={{textAlign:"center"}} align="right">nombre</TableCell>
                                <TableCell sx={{textAlign:"center"}} align="right">Identificacion</TableCell>
                                <TableCell sx={{textAlign:"center"}} align="right">fecha</TableCell>
                                <TableCell sx={{textAlign:"center"}} align="right">hora</TableCell>
                                <TableCell sx={{textAlign:"center"}} align="right">telefono</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activityData.map((row) => {
                                const date = new Date(row.createDate);
                                const fecha = date.toLocaleDateString('es-CO'); 
                                const hora = date.toLocaleTimeString('es-CO', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                });

                                return (
                                    <TableRow
                                        key={row.idAccessLog}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{textAlign:"center"}} align="right">{row.idAccessLog}</TableCell>
                                        <TableCell sx={{textAlign:"center"}} align="right">{row.user?.fullName || 'N/A'}</TableCell>
                                        <TableCell sx={{textAlign:"center"}} align="right">{row.user?.identificationNumber || 'N/A'}</TableCell>
                                        <TableCell sx={{textAlign:"center"}} align="right">{fecha}</TableCell>
                                        <TableCell sx={{textAlign:"center"}} align="right">{hora}</TableCell>
                                        <TableCell sx={{textAlign:"center"}} align="right">{row.user?.phone || 'N/A'}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ActivityRegister;