import "./App.css";
import { Box } from "@mui/material";
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
    </Box>
  );
}

export default App;
