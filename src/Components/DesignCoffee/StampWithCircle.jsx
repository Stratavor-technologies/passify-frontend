import React from "react";
import { rgbStringToHex } from "../../utils/rgbaToHex";
import MobileIcon from "../Mobile_Screens/MobileIcon";
import "../../assets/scss/stamps.scss";

const StampWithCircle = ({ stampData, stmapsCapture }) => {
  const newNumber = Math.min(parseInt(stampData?.no_of_stamps, 10), 30);
  const initialCircleSize = 70;
  const circleSize = initialCircleSize / newNumber;
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
    ? JSON.parse(stampData?.reward_at_stamp_no)
    : [];

  const updatedRewardStepNo = rewardStampData.map((item, index) => +item);

  return (
    <div>
      <div
        className={`flex flex-wrap w-[300px] gap-2 h-[130px] items-center justify-center p-[16px]`}
        style={{
          backgroundColor: stampData.strip_bg_color
            ? rgbStringToHex(stampData.strip_bg_color)
            : "",
        }}
      >
        {newArray.map((item, index) => (
          <div
            key={index}
            className={`circle`}
            style={{
              width: circleSize + 15,
              height: circleSize + 15,
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
                index < halfNumber
                  ? stampData.picked_stamps_icon
                  : stampData.un_stamps_icon
              }
              iconColor={index < halfNumber ? iconColorHex : unStampColor}
              iconSize={circleSize}
              circleBorder={stampBorder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StampWithCircle;
