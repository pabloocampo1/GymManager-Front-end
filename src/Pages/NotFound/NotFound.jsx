import { Link } from "react-router-dom";
import style from "./NotFound.module.css";
import imageNoFound from "../../assets/images/noFoundIcon.svg"
import { Button, Typography } from "@mui/material";

function NotFound() {
  return (
    <div className={style.not_found_container}>
      <img className={style.imageNotFound} src={imageNoFound} alt="" />
      <Typography>Pagina no encontrada</Typography>
      <Link to="/">
      <Button 
        sx={{backgroundColor:"#FFDB00",border:1, borderStyle: "none", color:"black", marginTop:3}} 
        variant="contained"
        >Volver al inicio</Button>
      </Link>
    </div>
  );
}

export default NotFound;
