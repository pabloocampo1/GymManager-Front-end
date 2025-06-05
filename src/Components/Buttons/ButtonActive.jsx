import { Button } from "@mui/material";

function ButtonActive({text}){
    return(
        <Button variant="contained" size="small" sx={{borderRadius:4,width:105,height:22,fontSize:12,backgroundColor:"#07FF3E", color:"black",
        pointerEvents: "none",  "&:hover": { backgroundColor: "#D3D837" },boxShadow:"none"}}>
          {text}
        </Button>
    )
}





export default ButtonActive;
