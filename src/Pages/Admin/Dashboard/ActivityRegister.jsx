import { Box, FormControl, IconButton, InputLabel, Menu, MenuItem, MenuList, NativeSelect, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { api } from '../../../Service/api';
import ListIcon from '@mui/icons-material/List';




const ActivityRegister = () => {
    const [activityData, setActivityData] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const switchFetchData = async (option) => {

        setFilterBy(option)
        switch (option) {
            case "AllByMemberToday":
                {
                    const fetchData = await api.get("/api/activity/getAllByMemberToday");
                    setActivityData(fetchData.data)
                    console.log(fetchData);

                    break;
                }
            case "AllByMemberByMonth":
                {
                    const fetchData = await api.get("/api/activity/getAllByMemberByMonth");
                    setActivityData(fetchData.data)
                    console.log(fetchData);
                    break;
                }

            case "AllByVisitByToday":
                {
                    const fetchData = await api.get("/api/activity/getAllByVisitsToday");
                    console.log(fetchData);
                    
                    setActivityData(fetchData.data)
                    break;
                }

            case "AllByVisitByMonth":
                {
                    const fetchData = await api.get("/api/activity/getAllByVisitsByMonth");
                    setActivityData(fetchData.data)
                    console.log(fetchData);
                    
                    break;
                }
            case "AllToday":
                {
                    const fetchData = await api.get("/api/activity/getAllToday");
                    setActivityData(fetchData.data)
                    break;
                }
            case "AllMonth":
                {
                    const fetchData = await api.get("/api/activity/getAllMonth");
                    setActivityData(fetchData.data)
                    break;
                }

            default:
                break;
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                switchFetchData("AllByMemberToday")

            } catch (Error) {
                console.error(Error);

            }
        }
        fetchData();
    }, []);


    return (
        <Box sx={{ height: "100%" }}>
            <Typography component="h3" sx={{ textAlign: "center", fontWeight: "700", pb: "20px" }}>Registro de actividad</Typography>
            <Box sx={{ display: "flex", mb: "10px" }}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Por miembros
                    </InputLabel>
                    <NativeSelect
                        value={filterBy}
                        inputProps={{
                            name: 'members',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setFilterBy(selectedValue);
                            switchFetchData(selectedValue);
                        }}
                        sx={{ width: "150px" }}
                    >
                        <option value=""></option>
                        <option value="AllByMemberToday">Hoy</option>
                        <option value="AllByMemberByMonth">Este mes</option>
                    </NativeSelect>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Por visitas
                    </InputLabel>
                    <NativeSelect
                        value={filterBy}
                        inputProps={{
                            name: 'visits',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setFilterBy(selectedValue);
                            switchFetchData(selectedValue);
                        }}
                        sx={{ width: "150px" }}
                    >
                        <option value=""></option>
                        <option value="AllByVisitByToday">Hoy</option>
                        <option value="AllByVisitByMonth">Este mes</option>
                    </NativeSelect>
                </FormControl>
              <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Todos
                    </InputLabel>
                    <NativeSelect
                        value={filterBy}
                        inputProps={{
                            name: 'All',
                            id: 'uncontrolled-native',
                        }}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setFilterBy(selectedValue);
                            switchFetchData(selectedValue);
                        }}
                        sx={{ width: "150px" }}
                    >
                        <option value=""></option>
                        <option value="AllToday">Hoy</option>
                        <option value="AllMonth">Este mes</option>
                    </NativeSelect>
                </FormControl> 
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <ListIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Limpiar - hoy</MenuItem>
                        <MenuItem onClick={handleClose}>Limpiar - mes</MenuItem>
                        <MenuItem onClick={handleClose}>Descargar a PDF</MenuItem>
                        <MenuItem onClick={handleClose}>Descargar a EXCEL</MenuItem>
                    </Menu>
                </div>
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%', height: '200px' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: "center" }} align="right">Id</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">nombre</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">Identificacion</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">fecha</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">hora</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">telefono</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activityData ? (
                                activityData.map((row) => {
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
                                            <TableCell sx={{ textAlign: "center" }} align="right">{row.idAccessLog}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }} align="right">{row.user?.fullName || 'N/A'}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }} align="right">{row.user?.identificationNumber || 'N/A'}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }} align="right">{fecha}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }} align="right">{hora}</TableCell>
                                            <TableCell sx={{ textAlign: "center" }} align="right">{row.user?.phone || 'N/A'}</TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (<Typography sx={{textAlign:"center"}}>No hay registros</Typography>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ActivityRegister;