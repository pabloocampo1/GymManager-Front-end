import { Box, FormControl, IconButton, InputLabel, Menu, MenuItem, MenuList, NativeSelect, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import React, { useEffect, useState } from 'react';
import { api } from '../../../Service/api';
import ListIcon from '@mui/icons-material/List';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import ModalConfirmDeleteAll from '../../../Components/Modals/ControlAccessModals/ModalConfirmDeleteAll';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import ShowMessageSuccess from '../../../Components/ShowMessageSuccess';




const ActivityRegister = () => {
    const [activityData, setActivityData] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [deleteAll, setDeleteAll] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const switchFetchData = async (option) => {
        setActivityData([])
        setFilterBy(option)
        switch (option) {
            case "AllByMemberToday":
                {
                    const fetchData = await api.get("/api/activity/getAllByMemberToday");
                    setActivityData(fetchData.data)
                    console.log(fetchData.data);


                    break;
                }
            case "AllByMemberByMonth":
                {
                    const fetchData = await api.get("/api/activity/getAllByMemberByMonth");
                    setActivityData(fetchData.data)

                    break;
                }

            case "AllByVisitByToday":
                {
                    const fetchData = await api.get("/api/activity/getAllByVisitsToday");

                    setActivityData(fetchData.data)
                    break;
                }

            case "AllByVisitByMonth":
                {
                    const fetchData = await api.get("/api/activity/getAllByVisitsByMonth");
                    setActivityData(fetchData.data)


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
            case "DeleteAllToday":
                {
                    const fetchData = await api.delete("/api/activity/deleteAllToday");
                    setActivityData(fetchData.data)
                    setDeleteSuccess(true)
                    setTimeout(() => {
                        setDeleteSuccess(false)
                    }, [2000])



                    break;
                }

            default:
                break;
        }

    }


    const exportToPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Registro de Actividad", 14, 20);

        const tableColumn = ["ID", "Nombre", "Cédula", "Teléfono", "Fecha de acceso"];
        const tableRows = [];

        activityData.forEach((item) => {
            const row = [
                item.idAccessLog,
                item.user?.fullName || "Desconocido",
                item.user?.identificationNumber || "N/A",
                item.user?.phone || "N/A",
                new Date(item.createDate).toLocaleString("es-CO"),
            ];
            tableRows.push(row);
        });

        autoTable(doc, {
            startY: 30,
            head: [tableColumn],
            body: tableRows,
        });

        doc.save("registro_actividad.pdf");
    };

    const exportToExcel = (data, fileName = 'RegistroDeActividad.xlsx') => {
        const flatData = data.map((item) => ({
            'ID Registro': item.idAccessLog || '',
            'Nombre completo': item.user?.fullName || '',
            'Cédula': item.user?.identificationNumber || '',
            'Teléfono': item.user?.phone || '',
            'Fecha': new Date(item.createDate).toLocaleDateString('es-CO'),
            'Hora': new Date(item.createDate).toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
        }));

        const worksheet = XLSX.utils.json_to_sheet(flatData);

        const columnWidths = [
            { wch: 12 },
            { wch: 25 },
            { wch: 15 },
            { wch: 15 },
            { wch: 12 },
            { wch: 10 },
        ];
        worksheet['!cols'] = columnWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Registro');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                switchFetchData("AllToday")

            } catch (Error) {
                console.error(Error);

            }
        }
        fetchData();
    }, []);


    return (
        <Box sx={{ height: "100%" }}>
            {deleteAll && (<ModalConfirmDeleteAll open={deleteAll} handleClose={() => setDeleteAll(false)} confirm={() => { switchFetchData("DeleteAllToday"), setDeleteAll(false) }} />)}

            {deleteSuccess && (
                <Box sx={{position:"fixed", bottom:"5%", right:"97%"}}>
                    <ShowMessageSuccess title="Operación exitosa" description="Se eliminaron todos los registros de hoy." type="success" />
                </Box>
            )}

            <Typography component="h3" sx={{ textAlign: "center", fontWeight: "700", pb: "20px" }}>
                Registro de actividad
            </Typography>

            <Box sx={{ display: "flex", mb: "10px" }}>
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

                        <MenuItem onClick={() => exportToPDF()}>Exportar como PDF (formato mejorado)</MenuItem>
                        <MenuItem onClick={() => exportToExcel(activityData)}>Exportar como Excel</MenuItem>
                        <MenuItem onClick={() => setDeleteAll(true)}>Eliminar todos los registros de hoy</MenuItem>

                    </Menu>
                </div>
            </Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%', height: '200px' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ textAlign: "center" }} align="right">Id</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">Nombre</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">Cédula</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">Fecha</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">Hora</TableCell>
                                <TableCell sx={{ textAlign: "center" }} align="right">Teléfono</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activityData.length >= 1 ? (
                                activityData.map((row) => {
                                    const date = new Date(row.createDate);
                                    const fecha = date.toLocaleDateString('es-CO');
                                    const hora = date.toLocaleTimeString('es-CO', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    });
                                    const idRandom = Math.random();

                                    return (
                                        <TableRow
                                            key={idRandom}
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
                            ) : (<Typography sx={{ textAlign: "center" }}>No hay registros</Typography>)}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ActivityRegister;