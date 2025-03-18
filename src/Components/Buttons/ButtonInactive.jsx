import { Button } from "@mui/material";

function ButtonInactive({text}){
    return(
        <Button variant="contained" size="small" sx={{borderRadius:4,width:90,height:22,fontSize:12,backgroundColor:"red",
        pointerEvents: "none",  "&:hover": { backgroundColor: "#D3D837" },boxShadow:"none"}}>
          {text}
        </Button>
    )
}





export default ButtonInactive;
