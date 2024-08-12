
import React, { useState } from "react";

import axios from "axios";

const ENDPOINT = 'https://vision.googleapis.com/v1/images:annotate';
const google_Api_Key='AIzaSyBeXWJBYJOz6Xws3bF1N-VB_FsA4GDS_b4'



const GoogleVisionApi = () => {


  const [userInfo, setUserInfo] = React.useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        const response = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${google_Api_Key}`,
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: 'TEXT_DETECTION',
                  },
                ],
              },
            ],
          }
        );
        console.log("googleText",response.data.response[0])
        setText(response.data.responses[0].fullTextAnnotation.text);
      } catch (error) {
        console.error('Error recognizing text:', error);
      }
    };
    reader.readAsDataURL(selectedImage);
  };


  React.useEffect(() => {
    //getUserData();
  }, [text]);
  return (
    <div>
    <input type="file" accept="image/*" onChange={handleImageUpload} />
    <button onClick={handleSubmit}>Extract Text</button>

    
   
      {text && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{text}</p>
        </div>
      )}
      {userInfo.length ? (
        <>
          <h1>UserInfo</h1>
          {userInfo.map((ele) => (
            <>
              <h4>vehicleNumber:{ele.vehicleNumber}</h4>
              <h4>driverName:{ele.driverName}</h4>
              <h4>VehicleRegNumber:{ele.VehicleRegNumber}</h4>
              <h4>country:{ele.country}</h4>
              <h4>Renewal Date:{ele.RenewalDate}</h4>
            </>
          ))}
        </>
      ) : (
        <h1>....Loading Vehicle Information</h1>
      )}
    </div>
  );
};

export default GoogleVisionApi;
