import React, { useState, useRef, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Webcam from "react-webcam";
import Tesseract, { createWorker } from "tesseract.js";
import ImageToText from "./ImageToText";

const Scanner = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [opencamera, setOpenCamera] = useState(false);
  const [userinfo, setUserInfo] = useState();



  const convertImageToText = async (image) => {
    const { createWorker } = Tesseract;
(async () => {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(image, {

  });
  console.log(text,"recttext");
})();
  };

  const handleScanFunction = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      convertImageToText(imageSrc);
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
          console.log(result.data,"results")
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
    // Uncomment and implement the fetch logic as needed
    // let data = await axios.get(`http://localhost:8080/getapi/ocrweb/${text}`)
    // setUserInfo(data.data)
    // console.log("Text", text)
  };

  useEffect(() => {
    fetchdata();
  }, [image]);

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
            Capture Image
          </Button>
        </>
      )}
      {image && <img src={image} alt="Captured" style={{ width: "80px", height: "80px", marginTop: "40px" }} />}
      <h1>{userinfo}</h1>
      <p>{text}</p>
<br/>
<ImageToText/>
    </Box>
  );
};

export default Scanner;
