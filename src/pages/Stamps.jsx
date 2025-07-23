import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { get, post } from "../axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import CanvasStamps from "../Components/DesignCoffee/CanvasStamps";
import { defaultImageConfig } from "../utils/config";

const Stamps = () => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [stampData, setStampData] = useState({});
  const passId = localStorage.getItem("userId");
  const captureProcess = useRef(null);
  const navigate = useNavigate();

  const getStamp = async (passId) => {
    try {
      const stampResponse = await get(`/pass/readById/${passId}`);
      setStampData(stampResponse.data);
      toast.success("Stamp data fetched successfully");
    } catch (error) {
      console.error("Error fetching stamp data:", error);
      toast.error("Error fetching stamp data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getStamp(passId);
    };
    fetchData();
  }, [passId]);

  useEffect(() => {
    if (Object.keys(stampData).length > 0) {
      getCapturedData();
    }
  }, [stampData]);

  const getCapturedData = async () => {
    await captureImages();
  };

  const captureImages = async () => {
    if (Object.keys(stampData).length > 0) {
      const delay = 5000;
      let capturedCount = 1;
      captureProcess.current = setInterval(() => {
        if (capturedCount <= stampData.no_of_stamps) {
          const captureElement = document.getElementById(
            `stamp-container-${capturedCount}`
          );
          if (captureElement) {
            html2canvas(captureElement, {
              scale: 2,
              allowTaint: true,
              useCORS: true,
              foreignObjectRendering: false,
              logging: true,
            })
              .then((canvas) => {
                const base64Image = canvas.toDataURL();
                setCapturedImages((prevImages) => [...prevImages, base64Image]);
                capturedCount++;
              })
              .catch((error) => {
                console.error("Error capturing image:", error);
              });
          }
        } else {
          clearInterval(captureProcess.current);
        }
      }, delay);
    }
  };

  const sendImagesToAPI = async () => {
    try {
      const postData = capturedImages.map((image, index) => ({
        stamp_earned: index.toString(),
        image: image,
      }));
      await post(`/manage/images/${passId}`, postData);
      // navigate("/dashboard");
    } catch (error) {
      console.error("Error sending data to API:", error);
      toast.error("Error sending data to API");
    }
  };

  return (
    <div className="dashboard_screen w-[100%] overflow-hidden scroll-hidden relative ">
      <div className="capture-div bg-cover flex">
        {Array.from({ length: stampData.no_of_stamps }).map((_, index) => (
          <div key={index}>
            {stampData.id && typeof stampData.no_of_stamps === "number" && (
              <div
                id={`stamp-container-${index + 1}`}
                className="mt-5 flex flex-wrap w-[300px] gap-2 h-[130px] items-center justify-center"
              >
                <CanvasStamps stampData={stampData} checkedIndex={index} />
              </div>
            )}
          </div>
        ))}
      </div>
      {capturedImages.map((image, index) => (
        <div key={index} className="mt-[3.125rem]">
          <img
            src={image}
            alt={`captured content ${index}`}
            className="mt-5"
            style={{ width: "300px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Stamps;
