import { Box, Typography, Paper, Button } from "@mui/material";
import CustomAxis from "../../../Components/Charts/BarChartOne";
import ChartMembership from "../../../Components/Charts/ChartMembership";
import TickPlacementBars from "../../../Components/Charts/ChartPrice/TrickChart";
import BarsDatasetToTal from "../../../Components/Charts/ChartTotalUserByMonth/TotalUserByMonth";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PieActiveArc from "../../../Components/Charts/Pie/PieMembershipMoreUsed";
import PieChartActiveAndInactiveMembers from "../../../Components/Charts/Pie/PieChartActiveAndInactiveMembers";
import FirstDataCards from "../../../Components/DasboardComponents/firstDataCards_div/firstDataCards";
import PiePromGender from "../../../Components/Charts/Pie/PiePromGender";
import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LoandingDownloadReport from "../../../Components/LoandingDownloadReport";
import ListNewUsers from "../../../Components/Charts/ListNewUsers";
import ChartTotalUser from "../../../Components/Charts/ChartTotalUser";
import { LegendToggle, ShowChart } from "@mui/icons-material";

function Dashboard() {
    const componentRef = useRef();
    const [titleReport, setTitleReport] = useState("BIENVENIDO!");
    const [userName, setUserName] = useState("Nombre De Usuario");
    const [activeButtonDownloadReport, setActiveButtonDownloadReport] = useState(true);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [loandingDownload, setLoandingDownload] = useState(false);


    useEffect(() => {
        if (isGeneratingPDF) {
            setLoandingDownload(true)
            generatePdf();
        }
    }, [isGeneratingPDF]);
    useEffect(() => {
        const savedName = localStorage.getItem("nombreUsuario");
        if (savedName) {
          setUserName(savedName);
        }
      }, []);
      

    const downloadPdf = () => {
        setTitleReport("Informe");
        setUserName("");
        setActiveButtonDownloadReport(false);
        setIsGeneratingPDF(true);
    };

    const generatePdf = async () => {
        const dateReport = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        const element = componentRef.current;

        setTimeout(async () => {
            const canvas = await html2canvas(element, { scale: 2, ignoreElements: (el) => el.classList && el.classList.contains("no-print") });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 10;

            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                pdf.addPage();
                position = 10;
                pdf.addImage(imgData, "PNG", 10, position - (imgHeight - heightLeft), imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`Reporte del dia: ${dateReport}.pdf`);

            setTitleReport("BIENVENIDO!");
            setUserName("Nombre De Usuario");
            setActiveButtonDownloadReport(true);
            setIsGeneratingPDF(false);
            setLoandingDownload(false);
        }, 300);
    };

    return (
        <Box ref={componentRef}
            sx={{
                width: "100%",
                minHeight: "100vh",
                padding: "20px",
                backgroundColor: "var(--backgroundWhiteMiddle)",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "15vh",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                <Typography
                    variant="h4"
                    sx={{
                        paddingTop: "20px",
                        paddingBottom: "40px",
                    }}
                >
                    {titleReport}  <span style={{ fontWeight: 300, fontSize: "1.30rem" }}> {userName}  <ShowChart />  <ShowChart /> </span>
                </Typography>
                <LoandingDownloadReport open={loandingDownload} text={"Descargando informe en pdf"} />
                {activeButtonDownloadReport && (<Button color="#FFDB00" variant="contained" sx={{ backgroundColor: "", border: "2px solid #FFDB00" }} onClick={downloadPdf}>PDF  <UploadFileIcon /></Button>)}
            </Box>
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
                    <Typography fontWeight="bold">Membresías activas más usadas</Typography>
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
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: "50px",
                }}
            >
                <PieChartActiveAndInactiveMembers />
                <PiePromGender />

            </Box>
            <Box
            sx={{
                width:"100%",
                display:"flex",
                justifyContent:"space-around",
                alignItems:"center"
            }}>
                <ChartTotalUser />
                <ListNewUsers />
            </Box>
        </Box>
    );
}

export default Dashboard;
