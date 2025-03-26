import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = [6.089560, -75.635194]; // Coordenadas de Bogotá, Colombia

const MapLocation = () => {
  return (
    <MapContainer center={center} zoom={17} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={center}>
        <Popup>Estamos aquí!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLocation;
