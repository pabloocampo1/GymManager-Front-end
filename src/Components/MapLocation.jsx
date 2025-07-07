import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "leaflet/dist/leaflet.css";

const center = [6.089560, -75.63519]; 

const MapLocation = () => {
    const theme = useTheme();

   
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); 
    const isDesktop = useMediaQuery(theme.breakpoints.up('md')); 

    
    let mapHeight = "200px";
    let mapWidth = "300px";

    if (isMobile) {
        mapWidth = "100%";
        mapHeight = "200px";
    } else if (isTablet) {
        mapWidth = "100%";
        mapHeight = "200px";
    } else if (isDesktop) {
        mapWidth = "100%";
        mapHeight = "200px";
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <MapContainer center={center} zoom={17} style={{ height: mapHeight, width: mapWidth }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={center}>
                    <Popup>Estamos aquí!</Popup>
                </Marker>
            </MapContainer>
        </Box>
    );
};

export default MapLocation;
