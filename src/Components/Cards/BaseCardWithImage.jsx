import React from "react";
import Mobile from "../reuseableComponents/Mobile";
import { mobileHeaderData } from "../../utils/mobileHeader";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { rgbStringToHex } from "../../utils/rgbaToHex";
import { defaultImageConfig } from "../../utils/config.js";
import { qrCodeData } from "../../utils/qrCodeData.js";
import { useNavigate } from "react-router-dom";
import MobileStripData from "./MobileStripData.jsx";

import defaultCardStrip from "../../assets/images/svg/defaultCardStrip.svg";


const BaseCardWithImage = ({ libraryData }) => {

  const navigate = useNavigate();
  const selectedImageData = qrCodeData.find(
    (data) => data.value === libraryData?.qr_type
  );

  const cardTextColor = {
    color: libraryData?.card_txt_color
      ? rgbStringToHex(libraryData?.card_txt_color)
      : "#EF74A6",
  };

  // const cardBackgroundColor = {
  //   background: libraryData?.card_bg_color
  //     ? rgbStringToHex(libraryData?.card_bg_color)
  //     : "#EF74A6",
  // };

  const cardBackgroundColor = {
    background: libraryData?.card_bg_color
      ? libraryData?.card_bg_color : "#EF74A6",
  };

  const navigateToTemplate = (id) => {
    navigate("/template/" + id);
  };

  return (
    <>
      <Mobile >
        <div className="hover:cursor-pointer" onClick={() => navigateToTemplate(libraryData.id)}>
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
                className={`${libraryData?.logo_image ? "justify-between" : "justify-end"
                  } flex justify-between items-center pl-2 pb-3 h-[5rem]`}
              >
                {libraryData?.logo_image && (
                  <div className="relative w-[3.3125rem] h-[3.3125rem]">
                    <img
                      src={
                        libraryData?.logo_image?.name
                          ? URL.createObjectURL(libraryData?.logo_image)
                          : defaultImageConfig.Base_URL + libraryData?.logo_image
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
                    1/{libraryData?.no_of_stamps}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <MobileStripData cardData={libraryData} />
              </div>


              <div className="px-4 text-[.8125rem]" style={cardTextColor}>
                STAMPS REQUIRED UNTIL NEXT REWARD
              </div>
              <div className="px-4" style={cardTextColor}>
                {libraryData?.no_of_stamps}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white px-2 py-3 mt-[3.5rem] mb-[1rem]">
                {selectedImageData?.image && (
                  <img
                    src={selectedImageData?.image}
                    alt={selectedImageData?.alt}
                    className="w-full object-contain mx-200"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] w-[20.625rem] absolute bottom-[-0.9375rem] left-[-1.875rem] rounded-b-[1.875rem] p-5 flex justify-between items-center">
            <h3 className="font-[400] text-[1.2rem] leading-[1.5625rem]">
              {/* {libraryData?.pass_name} */}
              Caffe
            </h3>
            <div className="rounded-[3.125rem] bg-[#e6f8e9] py-[.375rem] px-[.6875rem]">
              <span className="font-[400] text-[1.2rem] leading-[1.125rem] text-[#018f16]">
                starter
              </span>
            </div>
          </div>
        </div>

      </Mobile>
    </>
  );
};

export default BaseCardWithImage;
