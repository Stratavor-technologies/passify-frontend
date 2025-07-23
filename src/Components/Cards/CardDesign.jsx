import React from "react";
import { mobileHeaderData } from "../../utils/mobileHeader.js";
import { defaultImageConfig } from "../../utils/config.js";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { rgbStringToHex } from "../../utils/rgbaToHex";
import { qrCodeData } from "../../utils/qrCodeData.js";
import CircleDisplay from "./../Mobile_Screens/BaseCircle.jsx";

import defaultCardStrip from "../../assets/images/svg/defaultCardStrip.svg";
import MobileStripData from "./MobileStripData.jsx";

const CardDesign = ({ cardData }) => {
  const selectedImageData = qrCodeData.find(
    (data) => data.value === cardData?.qr_type
  );
  const cardTextColor = {
    color:
      cardData?.card_txt_color || cardData?.passData?.card_txt_color
        ? rgbStringToHex(
          cardData.card_txt_color || cardData?.passData?.card_txt_color
        )
        : "#EF74A6",
  };

  // const cardBackgroundColor = {
  //   background: cardData?.strip_bg_image || cardData?.passData?.strip_bg_image
  //     ? `url(${defaultImageConfig.Base_URL}${cardData?.passData?.strip_bg_image})`
  //     : cardData?.card_bg_color || cardData?.passData?.card_bg_color || '#00000',
  // };

  const cardBackgroundColor = {
    background: cardData?.card_bg_color
      ? cardData?.card_bg_color : "#EF74A6",
  };

  return (
    <>
      <div className="flex justify-between p-3">
        <div>16:36</div>
        <div className="mobile-header">
          {mobileHeaderData.map((item, index) => (
            <img
              className="w-[.9375rem]"
              key={index}
              src={item.img}
              alt={`Icon ${index}`}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between px-4">
        <div className="hover:cursor-pointer">Done</div>
        <div className="hover:cursor-pointer w-[15px]">
          <PiDotsThreeCircleFill />
        </div>
      </div>

      <div
        className="flex flex-col justify-between m-[1rem] rounded-[.625rem]"
        style={cardBackgroundColor}
      >
        <div className="flex flex-col">
          <div
            className={`${cardData?.logo_image || cardData?.passData?.logo_image
              ? "justify-between"
              : "justify-end"
              } flex justify-between items-center pl-2 pb-3 h-[5rem]`}
          >
            {(cardData?.logo_image || cardData?.passData?.logo_image) && (
              <div className="relative w-[3.3125rem] h-[3.3125rem]">
                <img
                  src={
                    cardData?.logo_image?.name
                      ? URL.createObjectURL(cardData?.logo_image)
                      : defaultImageConfig.Base_URL +
                      (cardData?.logo_image || cardData?.passData?.logo_image)
                  }
                  alt=""
                  className="absolute object-contain h-full w-full top-[8px] left-[0px]"
                />
              </div>
            )}

            <div
              className="flex flex-col items-center px-[10px] text-[.8125rem]"
              style={cardTextColor}
            >
              <div>Stamp</div>
              <div className="text-[1rem] font-[500]">
                1/{cardData?.no_of_stamps || cardData?.passData?.no_of_stamps}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <MobileStripData cardData={cardData} />
          </div>

          {/* <img
            src={
              defaultImageConfig.Base_URL +
              cardData?.pass_images?.[0]?.image_path
            }
            alt="strip image"
            className="object-contain h-full w-full"
          /> */}

          <div className="px-4 text-[.8125rem]" style={cardTextColor}>
            STAMPS REQUIRED UNTIL NEXT REWARD
          </div>
          <div className="px-4" style={cardTextColor}>
            {cardData?.no_of_stamps || cardData?.passData?.no_of_stamps}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-white px-2 py-4 mt-[2.625rem] mb-2">
            {selectedImageData?.image && (
              <img
                src={selectedImageData?.image}
                alt={selectedImageData?.alt}
                className="w-full object-contain mx-200"
              />
            )}
          </div>
        </div>
      </div >
    </>
  );
};

export default CardDesign;
