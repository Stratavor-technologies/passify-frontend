import React, { useState, useEffect } from "react";
import "../../assets/scss/MobileCircle.scss";
import CardMobileIcon from "./CardMobileIcon";
import { defaultImageConfig } from "../../utils/config.js";
import { rgbStringToHex } from "../../utils/rgbaToHex.js";
// import icecream_img from "../../assets/images/icecream.jpg"

const MobileStripData = ({ cardData, id }) => {
  const newNumber = Math.min(parseInt(cardData?.no_of_stamps, 10), 30);

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
    color: cardData?.stamp_image_color
      ? rgbStringToHex(cardData?.stamp_image_color)
      : "#fffff",
  };
  const unStampColor = {
    color: cardData?.unstamp_image_color
      ? rgbStringToHex(cardData?.unstamp_image_color)
      : "#fffff",
  };

  const updatedRewardStepNo =
    Array.isArray(cardData?.reward_at_stamp_no) &&
      cardData?.reward_at_stamp_no.length > 0
      ? cardData?.reward_at_stamp_no?.map((selectedValue) =>
        parseInt(selectedValue)
      )
      : [];


  return (
    <>
      <div className="customSelectWrapper">
        <div
          className="customSelect"
          style={{
            backgroundImage: `url(${(defaultImageConfig.Base_URL + cardData?.all_stamps_bg_image)})`,
            backgroundColor: cardData?.strip_bg_color,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            objectFit: "contain",
          }}
        >
          <div className={`selectedOption flex vpx${newNumber}`}>
            {newArray.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`circle`}
                  style={{
                    width: circleSize,
                    height: circleSize,
                    background: updatedRewardStepNo.includes(item)
                      ? cardData?.reward_bg_color
                      : cardData?.stamps_color,
                    border: updatedRewardStepNo.includes(item)
                      ? `2px solid ${rgbStringToHex(
                        cardData?.reward_border_color
                      )}`
                      : `1px solid ${rgbStringToHex(
                        cardData?.stamps_border_color
                      )}`,
                  }}
                >
                  <CardMobileIcon
                    iconName={
                      index < halfNumber
                        ? cardData?.picked_stamps_icon
                        : cardData?.un_stamps_icon
                    }
                    iconColor={index < halfNumber ? iconColorHex : unStampColor}
                    iconSize={circleSize}
                    circleBorder={cardData?.stamps_border_color}
                    pickedStampsImage={
                      index < halfNumber
                        ? cardData?.picked_stamps_image
                        : cardData?.un_stamps_image
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileStripData;
