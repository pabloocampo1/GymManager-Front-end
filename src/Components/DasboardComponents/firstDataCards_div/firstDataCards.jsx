import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { formatMonth } from "../../../Utils/FormatMonth";
import ListNewUsers from "../../Charts/ListNewUsers";

const FirstDataCards = ({ dataList = {} }) => {

    if (!dataList) return <div></div>;

    const currentDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    const currentMonth = `${formatMonth(new Date().getMonth() + 1)} / ${new Date().getFullYear()}`;

    const cards = [
        {
            description: "Entradas de visitas -",
            span: " hoy",
            value: dataList.totalVisitEntriesToday,
            date: currentDate
        },
        {
            description: "Entradas de miembros -",
            span: " hoy",
            value: dataList.totalMemberEntriesToday,
            date: currentDate
        },
        {
            description: "Total de entradas -",
            span: " hoy",
            value: dataList.totalVisitEntriesToday + dataList.totalMemberEntriesToday,
            date: currentDate
        },
        {
            description: "Total de ingresos monetarios -",
            span: " hoy",
            value: dataList.totalPaymentsToday?.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            date: currentDate
        },
        {
            description: "Total de ingresos monetarios -",
            span: " mes",
            value: dataList.totalPaymentsThisMonth?.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            date: currentMonth
        },
        {
            description: "Total de suscripciones vendidas -",
            span: " mes",
            value: dataList.totalNewSubscriptionsThisMonth,
            date: currentMonth
        }
    ];

    return (
        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Grid container spacing={2} sx={{ flex: 1, width: { xs: '100%', md: '70%' } }}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ minHeight: 120, borderRadius: 3, boxShadow: 3 }}>
                            <CardContent>
                                <Typography variant="body2" color="text.primary">
                                    {card.description}
                                    <Typography component="span" fontWeight="bold"  color="text.primary"> {card.span} </Typography>
                                </Typography>
                                <Typography variant="h5" fontWeight="bold"  color="text.primary">
                                    {card.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.date}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ width: { xs: '100%', md: '30%' }, minHeight: 200 }}>
                <ListNewUsers />
            </Box>
        </Box>
    );
};

export default FirstDataCards;
