import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { AccountCircle } from '@mui/icons-material';
import MembresiaService from "../../Service/MembresiaService"
import { api } from '../../Service/api';
import SimpleBackdrop from "../../Components/SimpleBackdrop";

const PaymentComponent = ({ userInfo = [], isUpdateMembership, closeUpdateSubscription }) => {
    const [userData, setUserData] = useState([]);
    const { state } = useContext(AuthContext);
    const [isLoanding, setIslOanding] = useState(false);
    const [memberships, setMemberships] = useState([]);
    const [dataPurchase, setDataPurchase] = useState({
        userId: '',
        membershipId: '',  
        purchaseMethod: '',
        receptionistName: '',

    })
    const [membershipSelect, setMembershipSelect] = useState({});
    const [errorRequest, setErrorRequest] = useState(false);

    const handleFormPurchase = async (e) => {
        e.preventDefault();
        setIslOanding(true)

        const finalData = {
            userId: userInfo.id,
            membershipId: membershipSelect.id,
            purchaseMethod: dataPurchase.purchaseMethod,
            receptionistName: state.username
        };

        try {

            const responsePurchase = await api.post("/api/sales/save", finalData);
            if (
                responsePurchase.status === 400 ||
                responsePurchase.status === 401 ||
                responsePurchase.status === 500
            ) {
                setErrorRequest(true);
                setIslOanding(false);
                return;
            }
            setDataPurchase({
                userId: "",
                membershipId: "",
                purchaseMethod: "",
                receptionistName: ""
            });

            setMembershipSelect({});
            setErrorRequest(false)
            isUpdateMembership();
            closeUpdateSubscription();

        } catch (error) {
            console.error(error);
            setErrorRequest(true);
            setIslOanding(false);
            return;
        }

        setIslOanding(false)

    }
    const handleChange = (event) => {
        setDataPurchase({
            ...dataPurchase,
            [event.target.name]: event.target.value
        });

    };

    useEffect(() => {
        if (userInfo != null) {
            setUserData(userInfo)
        }

        const fetchDataMembership = async () => {
            const response = await MembresiaService.getAllMembresia();
            setMemberships(response)
        }
        fetchDataMembership()

    }, [errorRequest]);

    return (
        <Box sx={{
            width: "650px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "background.default",
            borderRadius: "10px",
            p: 2,

        }}>
            <SimpleBackdrop open={isLoanding} />
            <Typography sx={{ fontWeight: "700" }}>Registro de pagos de subscripciones</Typography>
            <Box component={"form"} onSubmit={handleFormPurchase} sx={{ width: "100%" }}>
                <Box sx={{
                    mt: "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="Nombre del usuario"
                        value={userData.fullName}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"
                        sx={{
                            width: "45%"
                        }}
                    />
                    <TextField
                        id="input-with-icon-textfield-2"
                        label="Identificacion del usuario"
                        value={userData.dni}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"
                        sx={{
                            width: "45%"
                        }}
                    />
                </Box>
                <Box sx={{
                    mt: "40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <TextField
                        id="input-with-icon-textfield-3"
                        label="Recepcionista encargado"
                        name="receptionistName"
                        value={state.username}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            },
                        }}
                        variant="standard"
                        sx={{
                            width: "45%"
                        }}

                    />
                    <FormControl sx={{ width: "45%" }}>
                        <InputLabel id="demo-simple-select-label">Tipo de Membresia</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={dataPurchase.membershipId}
                            label="membershipId"
                            name='membershipId'
                            onChange={handleChange}
                        >
                            {memberships.map(item => (
                                <MenuItem key={item.id} value={item.id} onClick={() => setMembershipSelect(item)}>{item.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <FormControl fullWidth sx={{ mt: "40px", mb: "20px" }}>
                    <InputLabel id="demo-simple-select-label-2">Metodo de pago</InputLabel>
                    <Select
                        labelId="demo-simple-select-label-2"
                        id="demo-simple-select-2"
                        value={dataPurchase.purchaseMethod}
                        label="purchaseMethod"
                        name='purchaseMethod'
                        onChange={handleChange}
                    >
                        <MenuItem value="efectivo">Efectivo</MenuItem>
                        <MenuItem value="tarjeta_credito">Tarjeta de Crédito</MenuItem>
                        <MenuItem value="tarjeta_debito">Tarjeta de Débito</MenuItem>
                        <MenuItem value="transferencia">Transferencia Bancaria</MenuItem>
                    </Select>
                </FormControl>

                <hr />

                <Typography sx={{ fontWeight: "700", mt: "30px" }}>Total a pagar:  </Typography>
                <Typography>{membershipSelect.price || "Selecciona una membresia"}</Typography>
                <Typography sx={{ fontWeight: "700", }}>Duracion de la membresia a pagar:</Typography>
                <Typography> {membershipSelect.duration ? `${membershipSelect.duration} dias habiles` : "Selecciona una membresia"}</Typography>
                {errorRequest && (<Typography sx={{ color: "red" }}>Error en la transaccion.</Typography>)}
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "20px"
                }}>
                    <Button sx={{ width: "150px", borderColor: "red", color: "red" }} variant='outlined' onClick={() => closeUpdateSubscription()}  >Cancelar</Button>
                    <Button sx={{ width: "150px" }} variant='contained' type='submit'  >Registrar</Button>
                </Box>

            </Box>
        </Box>
    );
};

export default PaymentComponent;