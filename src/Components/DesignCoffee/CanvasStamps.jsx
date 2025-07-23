import React, { useEffect, useState } from "react";
import { rgbStringToHex } from "../../utils/rgbaToHex";
import MobileIcon from "../Mobile_Screens/MobileIcon";
import "../../assets/scss/stamps.scss";
import arrowBack from "../../assets/images/b1.png";
import { defaultImageConfig } from "../../utils/config";

const CanvasStamps = ({ stampData, checkedIndex }) => {
  const [bgImage, setBgImage] = useState("");

  const newNumber = Math.min(parseInt(stampData?.no_of_stamps, 10), 30);
  const initialCircleSize = 89;
  const circleSize = initialCircleSize / newNumber + 15;
  const halfNumber = Math.ceil(newNumber / 2);
  const newArray = Array.from({ length: newNumber }, (_, index) => index + 1);

  const iconColorHex = {
    color: stampData.stamp_image_color
      ? rgbStringToHex(stampData.stamp_image_color)
      : "#ffffff",
  };
  const unStampColor = {
    color: stampData.unstamp_image_color
      ? rgbStringToHex(stampData.unstamp_image_color)
      : "#ffffff",
  };

  const stampBorder = {
    color: stampData.stamps_border_color
      ? rgbStringToHex(stampData.stamps_border_color)
      : "#ffffff",
  };

  const rewardStampData = stampData.reward_at_stamp_no
    ? stampData?.reward_at_stamp_no
    : [];

  const updatedRewardStepNo = rewardStampData.map((item, index) => +item);
  // Function to convert URL to Base64
  // async function urlToBase64(url) {
  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Access-Control-Allow-Origin": true,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch URL");
  //     }
  //     const blob = await response.blob();
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     return new Promise((resolve, reject) => {
  //       reader.onloadend = () => {
  //         const base64String = reader.result.split(",")[1];
  //         resolve(base64String);
  //       };
  //       reader.onerror = reject;
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   const getUrl = () => {
  //     let modifed;
  //     urlToBase64("http://192.168.1.40:8000/" + stampData.strip_bg_image)
  //       .then((base64String) => {
  //         console.log(base64String);
  //         setBgImage(base64String);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   };
  //   return getUrl();
  // }, [stampData.strip_bg_image]);

  return (
    <div>
      <div
        className={`flex flex-wrap w-[300px] gap-2 h-[130px] items-center justify-center p-[16px]`}
        style={{
          backgroundImage:
            stampData?.strip_bg_image &&
              typeof stampData.strip_bg_image === "object" &&
              stampData?.hasOwnProperty("strip_bg_image")
              ? `url(${URL.createObjectURL(stampData.strip_bg_image)})`
              : stampData?.strip_bg_color
                ? stampData.strip_bg_color
                : "none",
        }}
      >
        {newArray.map((item, index) => (
          <div
            key={index}
            className={`circle`}
            style={{
              width: circleSize,
              height: circleSize,
              background: updatedRewardStepNo.includes(item)
                ? rgbStringToHex(stampData.reward_bg_color)
                : rgbStringToHex(stampData.stamps_color),
              border: updatedRewardStepNo.includes(item)
                ? `2px solid ${rgbStringToHex(stampData.reward_border_color)}`
                : `2px solid ${rgbStringToHex(stampData.stamps_border_color)}`,
            }}
          >
            <MobileIcon
              key={index}
              iconName={
                index <= checkedIndex
                  ? stampData.picked_stamps_icon
                  : stampData.un_stamps_icon
              }
              iconColor={index <= checkedIndex ? iconColorHex : unStampColor}
              iconSize={circleSize}
              circleBorder={stampBorder}
              pickedStampsImage={
                index <= checkedIndex
                  ? stampData?.picked_stamps_image
                  : stampData?.un_stamps_image
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasStamps;
