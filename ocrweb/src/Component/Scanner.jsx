import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Webcam from "react-webcam";
import axios from "axios";
import Tesseract from "tesseract.js";
const Scanner = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [opencamera, setOpenCamera] = React.useState(false);
  const [userinfo, setUserInfo] = React.useState();
  const handleScanFunction = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      processImage(imageSrc);
    }
  };
  const processImage = async (imageSrc) => {
    if (imageSrc) {
      try {
        const result = await Tesseract.recognize(imageSrc, "eng", {
          logger: (m) => console.log(m),
          oem: 1,
        });

        if (result && result.data && result.data.text) {
          const numbers = result.data.text.match(/\d+/g);

          setText(numbers ? numbers.join(" ") : "No numbers found");
        } else {
          setText("No text found");
        }
      } catch (error) {
        setText("Error processing image");
      }
      setOpenCamera(false);
    }
  };
  const fetchdata = async () => {
    //let data=await axios.get(`http://localhost:8080/getapi/ocrweb/${text}`)
    setUserInfo(data.data)
  };
  React.useEffect(() => {
    fetchdata();
  }, [text]);

  return (
    <Box sx={{ border: "1px solid green", padding: 20 }}>
      {!opencamera ? (
        <Button
          onClick={() => setOpenCamera(!opencamera)}
          variant="contained"
          sx={{ width: "100%" }}
        >
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
      <img src={image} style={{ width: "80px", height: "80px" }} />
      <h1>{userinfo}</h1>
    </Box>
  );
};

export default Scanner;
