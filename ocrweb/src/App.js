import "./App.css";
import { Box } from "@mui/material";


import ImageToText from "./Component/ImageToText";
import Scanner from "./Component/Scanner";
function App() {
  return (
    <Box
      sx={{
        p: 20,
        border: "1px dashed grey",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
   <Scanner />
   {/* <GoogleVisionApi/> */}
   {/* <ImageToText/> */}
    </Box>
  );
}

export default App;
