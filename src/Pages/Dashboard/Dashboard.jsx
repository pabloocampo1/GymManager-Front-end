import { Box, Typography } from "@mui/material";
import CustomAxis from "../../Components/Charts/BarChartOne";
import ChartMembership from "../../Components/Charts/ChartMembership";
import TickPlacementBars from "../../Components/Charts/ChartPrice/TrickChart";
import BarsDatasetToTal from "../../Components/Charts/ChartTotalUserByMonth/TotalUserByMonth";
import PieActiveArc from "../../Components/Charts/FistChart";
import FirstDataCards from "../../Components/DasboardComponents/firstDataCards_div/firstDataCards";
import style from "./Dashboard.module.css";
import React from 'react';


function Dashboard() {
    return (
        <Box className={style.dashboard_container}>
            <Typography variant="h2" className={style.title}>WELCOME BACK - <span>Juan Pablo hermoso</span></Typography>
            <FirstDataCards />

            <Box className={style.charDuplaOne} >
                <TickPlacementBars />
                <ChartMembership />
            </Box>
            <Box className={style.charDuplaTwo}>
                <Box className={style.ChartMembership_container}>
                    <Typography variant="p">Cantidad de yo no se que</Typography>
                    <CustomAxis />
                </Box>
                <Box className={style.topMembreship_container}>
                    <Typography variant="p">Cantidad de yo no se que</Typography>
                    <PieActiveArc />

                </Box>
            </Box>
            <Box className={style.totalPeopleByMonth_coontainer}>
                <Typography variant="p">Cantidad de yo no se que</Typography>
                <BarsDatasetToTal />
            </Box>

        </Box>
    );
}

export default Dashboard;