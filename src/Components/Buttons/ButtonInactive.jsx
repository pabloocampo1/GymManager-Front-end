import { Button } from "@mui/material";

function ButtonInactive({text}){
    return(
        <Button variant="contained" size="small" sx={{borderRadius:4,width:105,height:"auto",fontSize:12,backgroundColor:"#FF0F0F",
        pointerEvents: "none",  "&:hover": { backgroundColor: "#D3D837" },boxShadow:"none"}}>
          {text}
        </Button>
    )
}





export default ButtonInactive;
