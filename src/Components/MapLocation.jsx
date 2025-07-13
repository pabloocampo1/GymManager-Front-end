import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ProfileService from "../Service/profileService";

// ✅ Fix íconos rotos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapLocation = () => {
  const theme = useTheme();
  const [ubicacionTexto, setUbicacionTexto] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapHeight = "200px";
  const mapWidth = "100%";

  // ✅ Función para obtener coordenadas desde texto
  const getCoordinatesFromAddress = async (direccion) => {
    try {
      const apiKey = "71ac5c4d97364b9fb2326358ec6c34b3";
      
      // Agregar país para mejor precisión
      const query = `${direccion}, Colombia`;
      
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          query
        )}&key=${apiKey}&limit=1&countrycode=co`
      );
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return [lat, lng];
      } else {
        throw new Error("Ubicación no encontrada");
      }
    } catch (err) {
      console.error("Error en geocodificación:", err);
      throw err;
    }
  };

  // ✅ Función para obtener datos desde el backend
  const fetchUbicacion = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const profile = await ProfileService.getProfileData();
      const ubicacion = profile.ubication || "Medellín, Antioquia";
      
      console.log("Ubicación obtenida del perfil:", ubicacion);
      setUbicacionTexto(ubicacion);

      const coordenadas = await getCoordinatesFromAddress(ubicacion);
      console.log("Coordenadas obtenidas:", coordenadas);
      setCoords(coordenadas);
      
    } catch (err) {
      console.error("Error al obtener ubicación del perfil:", err);
      setError(err.message);
      
      // Fallback a coordenadas de Medellín
      const fallbackCoords = [6.2442, -75.5812]; // Medellín
      setCoords(fallbackCoords);
      setUbicacionTexto("Medellín, Antioquia (ubicación predeterminada)");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Ejecutar al montar el componente
  useEffect(() => {
    fetchUbicacion();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography>Cargando mapa...</Typography>
      </Box>
    );
  }

  if (error && !coords) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}>
        <Typography color="error">Error al cargar el mapa: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      {coords ? (
        <MapContainer 
          center={coords} 
          zoom={17} 
          style={{ height: mapHeight, width: mapWidth }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coords}>
            <Popup>{ubicacionTexto}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <Typography>No se pudo cargar el mapa</Typography>
      )}
    </Box>
  );
};

export default MapLocation;