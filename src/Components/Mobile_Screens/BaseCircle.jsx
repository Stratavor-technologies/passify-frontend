import React, { useState, useEffect } from "react";
import "../../assets/scss/MobileCircle.scss";
import MobileIcon from "./MobileIcon";
import { defaultImageConfig } from "../../utils/config.js";
import { rgbStringToHex } from "../../utils/rgbaToHex";
// import icecream_img from "../../assets/images/icecream.jpg"

const CircleDisplay = ({
  number,
  iconStamped,
  iconUnStamped,
  pickedStampsImage,
  pickedUnStampedImage,
  stampBackground,
  stripBackgroundImage,
  stampsColor,
  stampBorder,
  unStampBgColor,
  stampIconColor,
  unStampImageColor,
  stripBackground,
  rewardBackground,
  rewardBorderColor,
  rewardStampNo,
  data,
  id,
}) => {


  const newNumber = Math.min(parseInt(number, 10), 30);

  let initialCircleSize = 84;
  let circleSize = initialCircleSize / newNumber + 24;
  if (newNumber == 6) {
    circleSize = initialCircleSize / newNumber + 27;
  } else if (newNumber == 7) {
    circleSize = initialCircleSize / newNumber + 29;
  } else if (newNumber == 8) {
    circleSize = initialCircleSize / newNumber + 41;
  } else if (newNumber == 9) {
    circleSize = initialCircleSize / newNumber + 31;
  } else if (newNumber == 10) {
    circleSize = initialCircleSize / newNumber + 32;
  } else if (newNumber == 11 || newNumber == 12) {
    initialCircleSize = 75;
    circleSize = initialCircleSize / newNumber + 27;
  } else if (newNumber >= 13 && newNumber < 19) {
    initialCircleSize = 75;
    circleSize = initialCircleSize / newNumber + 28;
  } else {
    circleSize = initialCircleSize / newNumber + 21;
  }

  const halfNumber = Math.ceil(newNumber / 2);
  const newArray = Array.from({ length: newNumber }, (_, index) => index + 1);

  const iconColorHex = {
    color: stampsColor ? rgbStringToHex(stampIconColor) : "#fffff",
  };
  const unStampColor = {
    color: stampsColor ? rgbStringToHex(unStampImageColor) : "#fffff",
  };

  const updatedRewardStepNo = rewardStampNo
    ? rewardStampNo?.map((selectedValue) => parseInt(selectedValue))
    : "";

  return (
    <>
      <div className="customSelectWrapper">
        <div
          className="customSelect"
          style={{
            backgroundImage: `url(${(data?.strip_bg_image?.name && !id) ||
              (data?.strip_bg_image?.name && id)
              ? URL.createObjectURL(data?.strip_bg_image)
              : defaultImageConfig.Base_URL + data?.strip_bg_image
              })`,
            backgroundColor: data?.strip_bg_color,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "contain",
          }}
        >
          <div className={`selectedOption flex vpx${newNumber}`}>
            {newArray.map((item, index) => {
              return (
                <>
                  {(index >= halfNumber) ?
                    <div
                      key={index}
                      className={`circle`}
                      style={{
                        width: circleSize,
                        height: circleSize,
                        background: updatedRewardStepNo.includes(item)
                          ? rewardBackground
                          : stampsColor.slice(0, -1) + ',0.5)',
                        border: updatedRewardStepNo.includes(item)
                          ? `2px solid ${rgbStringToHex(rewardBorderColor)}`
                          : `2px solid ${rgbStringToHex(stampBorder)}`,
                      }}
                    >
                      <MobileIcon
                        ifSVG="/src/assets/images/svg/"
                        iconName={iconUnStamped}
                        iconColor={unStampColor}
                        iconSize={circleSize}
                        circleBorder={stampBorder}
                        pickedStampsImage={pickedUnStampedImage}
                      />
                    </div >
                    :
                    <div
                      key={index}
                      className={`circle`}
                      style={{
                        width: circleSize,
                        height: circleSize,
                        background: updatedRewardStepNo.includes(item)
                          ? rewardBackground
                          : stampsColor,
                        border: updatedRewardStepNo.includes(item)
                          ? `2px solid ${rgbStringToHex(rewardBorderColor)}`
                          : `2px solid ${rgbStringToHex(stampBorder)}`,
                      }}
                    >
                      <MobileIcon
                        ifSVG="/src/assets/images/svg/"
                        iconName={iconStamped}
                        iconColor={iconColorHex}
                        iconSize={circleSize}
                        circleBorder={stampBorder}
                        pickedStampsImage={pickedStampsImage}
                      />

                      {/* <img className="md-image-text-avatar" src={index < halfNumber ? '/src/assets/images/svg/' + iconStamped + '.svg' : '/src/assets/images/svg/' + iconUnStamped + '.svg'} alt="Cover" width={circleSize} /> */}
                    </div>
                  }
                </>
              );
            })}
          </div>
        </div>
      </div >
    </>
  );
};

export default CircleDisplay;
