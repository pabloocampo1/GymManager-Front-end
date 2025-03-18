import { Button } from "@mui/material";

function ButtonActive({text}){
    return(
        <Button variant="contained" size="small" sx={{borderRadius:4,width:87,height:22,fontSize:12,backgroundColor:"green",
        pointerEvents: "none",  "&:hover": { backgroundColor: "#D3D837" },boxShadow:"none"}}>
          {text}
        </Button>
    )
}





export default ButtonActive;
