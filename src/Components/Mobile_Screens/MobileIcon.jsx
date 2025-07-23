import React from "react";
import { defaultImageConfig } from "../../utils/config";
import Categoryicon from "../Icons/Categoryicon";

const MobileIcon = ({
  iconName,
  ifSVG,
  iconSize,
  iconColor,
  unStampImageColor,
  iconPadding,
  pickedStampsImage,
  pickedUnStampedImage,
}) => {
  return (
    <div
      className={`rounded-full flex justify-center items-center`}
    >
      {!pickedStampsImage && !pickedUnStampedImage && (
        <>
          {ifSVG && (
            <Categoryicon icon={iconName} color={iconColor.color} width={30} height={30} />
          )}
          {!ifSVG && (
            <i
              name={iconName}
              className={`bi-${iconName} p-[${iconPadding}] object-contain scale-[0.5]`}
              style={{
                color: iconColor.color,
                fontSize: `${iconSize + 15}px`,
              }}
            ></i>
          )}
        </>
      )}
      {pickedStampsImage && !pickedUnStampedImage && (
        <div className="w-full h-full">
          <img
            src={
              pickedStampsImage.name
                ? URL.createObjectURL(pickedStampsImage)
                : defaultImageConfig.Base_URL + pickedStampsImage
            }
            alt=""
            className="object-contain h-full w-full rounded-full"
          />
        </div>
      )}


    </div>
  );
};

export default MobileIcon;
