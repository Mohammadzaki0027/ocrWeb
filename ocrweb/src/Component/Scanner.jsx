import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
const Scanner = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [opencamera, setOpenCamera] = React.useState(false);
  const handleScanFunction = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      processImage(imageSrc)
    }
  };
  const processImage = async (imageSrc) => {
    console.log(image, "Image");
    if (image) {
      const result = await Tesseract.recognize(image, "eng");
      console.log("result", result);
      setText(result.data.text);
      setOpenCamera(!opencamera)
    }
  };

  return (
    <Box sx={{ border: "1px solid green", padding: 20 }}>
      {!opencamera ? (
        <Button onClick={() => setOpenCamera(!opencamera)}   variant="contained"
        sx={{ width: "100%" }}>
          {opencamera ? "Close Camera" : "Open Camera"}
        </Button>
      ) : (
        <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          height={240}
        />
        
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={handleScanFunction}
      >
        Capturing Image
      </Button>
        </>
      )}
      <h1>{text}</h1>
    </Box>
  );
};

export default Scanner;
