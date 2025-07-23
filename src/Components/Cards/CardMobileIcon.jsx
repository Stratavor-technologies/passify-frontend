import React from "react";
import { defaultImageConfig } from "../../utils/config";
import Categoryicon from "../Icons/Categoryicon";

const CardMobileIcon = ({
  iconName,
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
      {pickedStampsImage && !pickedUnStampedImage && (
        <div className="w-full h-full">
          <img
            src={defaultImageConfig.Base_URL + pickedStampsImage}
            alt=""
            className="object-contain h-full w-full rounded-full"
          />
        </div>
      )}

      {pickedUnStampedImage && !pickedStampsImage && (
        <div className="w-full h-full">
          <img
            src={defaultImageConfig.Base_URL + pickedUnStampedImage}
            alt=""
            className="object-contain h-full w-full rounded-full  "
          />
        </div>
      )}

      {!pickedStampsImage && !pickedUnStampedImage && (
        <Categoryicon icon={iconName} color={iconColor.color} width={30} height={30} />
        // <i
        //   name={iconName}
        //   className={`bi-${iconName} p-[${iconPadding}] object-contain scale-[0.5]`}
        //   style={{
        //     color: iconColor.color,
        //     fontSize: `${iconSize + 15}px`,
        //   }}
        // ></i>
      )}
    </div>
  );
};

export default CardMobileIcon;
