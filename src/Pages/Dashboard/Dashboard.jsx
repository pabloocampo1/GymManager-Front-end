import { Box, Typography, Paper } from "@mui/material";
import CustomAxis from "../../Components/Charts/BarChartOne";
import ChartMembership from "../../Components/Charts/ChartMembership";
import TickPlacementBars from "../../Components/Charts/ChartPrice/TrickChart";
import BarsDatasetToTal from "../../Components/Charts/ChartTotalUserByMonth/TotalUserByMonth";
import PieActiveArc from "../../Components/Charts/Pie/PieMembershipMoreUsed";
import PieChartAgeProm from "../../Components/Charts/Pie/PieChartAgeProm";
import FirstDataCards from "../../Components/DasboardComponents/firstDataCards_div/firstDataCards";
import PiePromGender from "../../Components/Charts/Pie/PiePromGender";
import React from 'react';

function Dashboard() {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                padding: "20px",
                backgroundColor: "#F9F9F9",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    paddingTop: "20px",
                    paddingBottom: "40px",
                }}
            >
                BIENVENIDO! <span style={{ fontWeight: 300, fontSize: "1.30rem" }}>Nombre De Usuario</span>
            </Typography>
            <FirstDataCards />
            
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px",
                    backgroundColor: "white",
                    boxShadow: "0.5px 0.5px 2px rgba(241, 241, 241, 0.5)",
                }}
            >
                <TickPlacementBars />
                <ChartMembership />
            </Box>
            
            <Box
                sx={{
                    width: "auto",
                    height: "350px",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "50px",
                    marginBottom: "50px",
                    gap: "70px",
                }}
            >
                <Paper
                    sx={{
                        width: "50%",
                        height: "100%",
                        backgroundColor: "white",
                        borderRadius: "15px",
                        textAlign: "center",
                        boxShadow: "0.5px 0.5px 0.5px 2px rgba(241, 241, 241, 0.5)",
                        display: "flex",
                        justifyContent: "space-around",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography fontWeight="bold">Membresías más usadas</Typography>
                    <PieActiveArc />
                </Paper>
                
                <Paper
                    sx={{
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: "15px",
                        backgroundColor: "#ffffff",
                        boxShadow: "0.5px 0.5px 2px rgba(241, 241, 241, 0.5)",
                    }}
                >
                    <Typography sx={{ paddingTop: "20px", paddingBottom: "20px", fontWeight: "bold" }}>
                        Cantidad de yo no sé qué 1
                    </Typography>
                    <CustomAxis />
                </Paper>
            </Box>
            
            <Paper
                sx={{
                    width: "100%",
                    minHeight: "340px",
                    backgroundColor: "white",
                    boxShadow: "0.5px 0.5px 2px rgba(241, 241, 241, 0.5)",
                    borderRadius: "15px",
                    paddingTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography textAlign="center" paddingBottom="20px" fontWeight="bold">
                    Tipo de usuarios que han ingresado
                </Typography>
                <BarsDatasetToTal />
            </Paper>
            
            <Box
                sx={{
                    width: "100%",
                    height: "50vh",
                    display: "flex",
                    alignItems:"center",
                    justifyContent: "space-between",
                    marginTop: "50px",
                }}
            >
                <PieChartAgeProm />
                <PiePromGender />
                <Box
                    sx={{
                        width:"20%",
                        height:"100%",
                        display:"flex",
                        alignItems:"center",
                        flexDirection:"column",
                        backgroundColor:"white",
                        borderRadius:"15px"
    
                    }}
                >
                    <Typography variant="p" sx={{textAlign:"center", pt:2}}>Ultimos usuarios registrados</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Dashboard;
