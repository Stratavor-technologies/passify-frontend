import React from "react";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { defaultImageConfig } from "../../utils/config.js";
import { mobileHeaderData } from "../../utils/mobileHeader.js";
import { qrCodeData } from "../../utils/qrCodeData.js";
import { rgbStringToHex } from "../../utils/rgbaToHex";
import CircleDisplay from "./BaseCircle.jsx";
import { IoCloseSharp } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";

const FieldMobileComp = ({ mobileViewData, FieldViewData, currentDevice="apple", businessName}) => {
  const selectedImageData = qrCodeData.find(
    (data) => data.value === mobileViewData?.qr_type
  );

  const cardTextColor = {
    color: mobileViewData?.card_txt_color
      ? rgbStringToHex(mobileViewData.card_txt_color)
      : "",
  };

  const cardBackgroundColor = {
    background: mobileViewData?.card_bg_color
      ? mobileViewData?.card_bg_color : "#EF74A6",
  };

  // console.log("FieldViewData: ", FieldViewData);

  return (
    <>
      <div className="flex justify-between p-3">
        <div>16:36</div>{" "}
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

      {currentDevice === "apple" && (
      <div className="flex justify-between px-4">
        <div className="hover:cursor-pointer">Done</div>
        <div className="hover:cursor-pointer w-[15px]">
          <PiDotsThreeCircleFill />
        </div>
      </div>
      )}

      {currentDevice === "android" && (
        <div className="flex justify-between px-4">
          <div className="hover:cursor-pointer"><IoCloseSharp size={'18px'}/></div>
          <div className="hover:cursor-pointer w-[15px]">
          <HiDotsVertical />
          </div>
        </div>
        )}
      <div
        className="flex flex-col justify-between py-[0.5rem] m-[1rem] rounded-[.625rem]"
        style={cardBackgroundColor}
      >
        <div className="flex flex-col">
          <div
            className="flex justify-between items-center px-2 pb-3 h-[3.4375rem]">
            {mobileViewData && mobileViewData.logo_image ? (
                <div className="relative w-[3.3125rem] h-[3.3125rem]">
                  <img
                    src={
                      mobileViewData?.logo_image?.name
                        ? URL.createObjectURL(mobileViewData?.logo_image)
                        : defaultImageConfig.Base_URL + mobileViewData?.logo_image
                    }
                    alt=""
                    className="absolute object-contain h-full w-full"
                  />
                </div>
              ) : (
                <div className="relative w-[3.3125rem] h-[3.3125rem]">
                  <img
                    src={base_logo}
                    alt="base logo"
                    className="absolute object-contain h-full w-full"
                  />
                </div>
              )}

            <div
              className="flex flex-col items-center px-[10px] text-[.8125rem]"
              style={cardTextColor}
            >
              {currentDevice === "apple" && (
                  <>
                  <div>Stamp</div>
                  <div className="text-[1rem] font-[500]">
                    1/{mobileViewData?.no_of_stamps || ""}
                  </div>
                  </>
                )}
                {currentDevice === "android" && (
                  <div>{businessName}</div>
                )}
            </div>
          </div>
          {currentDevice === "apple" && (
                  <>
          <div className="mb-3">
            <CircleDisplay
              number={mobileViewData?.no_of_stamps}
              iconStamped={mobileViewData?.picked_stamps_icon}
              iconUnStamped={mobileViewData?.un_stamps_icon}
              pickedStampsImage={mobileViewData?.picked_stamps_image}
              pickedUnStampedImage={mobileViewData?.un_stamps_image}
              stripBackground={mobileViewData?.strip_bg_color}
              stripBackgroundImage={mobileViewData?.strip_bg_image}
              stampsColor={mobileViewData?.stamps_color}
              stampBorder={mobileViewData?.stamps_border_color}
              unStampBgColor={mobileViewData?.un_stamp_bg_color}
              stampIconColor={mobileViewData?.stamp_image_color}
              unStampImageColor={mobileViewData?.unstamp_image_color}
              rewardBackground={mobileViewData?.reward_bg_color}
              rewardBorderColor={mobileViewData?.reward_border_color}
              rewardStampNo={mobileViewData?.reward_at_stamp_no}
              data={mobileViewData}
            />
          </div>
           </>
           )}
          {/* <img src={loopyCircleImage} alt="loopyCircleImage" /> */}
          {currentDevice === "apple" && ( <>
          <div className="px-4 text-[.8125rem]" style={cardTextColor}>
            {FieldViewData.secondary_fields}
          </div>
          <div className="px-4" style={cardTextColor}>
            {mobileViewData?.no_of_stamps}
          </div>
          </> )}

          {currentDevice === "android" && (
                  <>
                  <div class="andriod-box">
                    <div className="px-4 text-[1.25rem]" style={cardTextColor}>
                      {businessName}
                    </div>
                    {/* <div className="px-4" style={cardTextColor}>
                      {mobileViewData?.no_of_stamps}
                    </div> */}
                    <div className="px-4 py-4">
                      <div style={cardTextColor} class="uppercase font-normal text-sm">{FieldViewData.header_fields}</div>
                      <div className="text-[1rem] font-[500]" style={cardTextColor}>
                        1/{mobileViewData?.no_of_stamps || ""}
                      </div>
                    </div>
                  
                  </div>
                  </>
            )}

        </div>

        {currentDevice === "apple" && (
          <div className="flex justify-center">
            <div className="bg-white px-2 py-4 mt-[2.625rem] mb-[1rem]">
              {selectedImageData?.image ? (
                <img
                  src={selectedImageData?.image}
                  alt={selectedImageData?.alt}
                  className="w-full object-contain mx-200"
                />
              ) : (
                <img src={qr_A} alt="default qrcode" />
              )}
            </div>
          </div>
        )}

        {/* <div className="flex justify-center">
          {selectedImageData?.image && (
            <img
              src={selectedImageData?.image}
              alt={selectedImageData?.alt}
              className="w-full h-[100px] object-contain"
            />
          )}
        </div> */}


        {currentDevice === "android" && (
        <>
          <div className="flex justify-center">
            <div className="bg-white px-2 py-4 mb-[1rem]">
              {selectedImageData?.image ? (
                <img
                  src={selectedImageData?.image}
                  alt={selectedImageData?.alt}
                  className="w-full object-contain mx-200"
                />
              ) : (
                <img src={qr_A} alt="default qrcode" />
              )}
            </div>
          </div>
          <div class="image-android">
            {/* <img src={andriodImg} alt="default qrcode" /> */}

              {/* <div className="stripBgImageAndroid" style={{"backgroundImage": `url(${URL.createObjectURL(mobileViewData.strip_bg_image)})`}}> */}
                <div className="mb-3" id="node_element">
                  <CircleDisplay
                    number={mobileViewData?.no_of_stamps}
                    iconStamped={mobileViewData?.picked_stamps_icon}
                    iconUnStamped={mobileViewData?.un_stamps_icon}
                    pickedStampsImage={mobileViewData?.picked_stamps_image}
                    pickedUnStampedImage={mobileViewData?.un_stamps_image}
                    stripBackground={mobileViewData?.strip_bg_color}
                    stripBackgroundImage={mobileViewData?.strip_bg_image}
                    stampsColor={mobileViewData?.stamps_color}
                    stampBorder={mobileViewData?.stamps_border_color}
                    unStampBgColor={mobileViewData?.un_stamp_bg_color}
                    stampIconColor={mobileViewData?.stamp_image_color}
                    unStampImageColor={mobileViewData?.unstamp_image_color}
                    rewardBackground={mobileViewData?.reward_bg_color}
                    rewardBorderColor={mobileViewData?.reward_border_color}
                    rewardStampNo={mobileViewData?.reward_at_stamp_no}
                    data={mobileViewData}
                  />
                </div>
              {/* </div> */}
          </div>
        </>
        )}
      </div>
    </>
  );
};

export default FieldMobileComp;
