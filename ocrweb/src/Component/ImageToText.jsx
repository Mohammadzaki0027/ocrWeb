import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";

const ImageToText = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        extractText(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractText = (imageData) => {
    console.log(imageData,"imageData")
  
    Tesseract.recognize(imageData, "eng", {
      logger: (info) => console.log(info),
    })
      .then(({ data: { text } }) => {
        console.log("Extracted text:", text);
        setText(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error recognizing text:", error);
        setLoading(false);
      });
  };

  const getUserData = async () => {
    if (!text) return;
    try {
      let response = await axios.get(
        `http://localhost:8080/getapi/ocrweb/${text}`
      );
      console.log("User info:", response.data);
      setUserInfo([response.data]);
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Something went wrong while fetching user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, [text]);

  return (
    <div>
      <form>
        <label htmlFor="imageInput">Choose an image:</label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </form>
      {loading && <p>Processing...</p>}
      {image && !loading && (
        <div>
          <img
            src={image}
            alt="Uploaded"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        </div>
      )}
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
      {userInfo.length ? (
        <>
          <h1>UserInfo</h1>
          {userInfo.map((ele, index) => (
            <div key={index}>
              <h4>vehicleNumber: {ele.vehicleNumber}</h4>
              <h4>driverName: {ele.driverName}</h4>
              <h4>VehicleRegNumber: {ele.VehicleRegNumber}</h4>
              <h4>country: {ele.country}</h4>
              <h4>Renewal Date: {ele.RenewalDate}</h4>
            </div>
          ))}
        </>
      ) : (
        <h1>....Loading Vehicle Information</h1>
      )}
    </div>
  );
};

export default ImageToText;
