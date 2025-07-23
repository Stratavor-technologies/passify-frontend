import React, { useRef } from "react";
import { mobileHeaderData } from "../../utils/mobileHeader.js";
import BaseSwitchBox from "../reuseableComponents/BaseSwitchBox.jsx";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation.js";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import BackArrowIcon from "../Icons/BackArrorIcon.jsx";
import ArchiveIcon from "../Icons/ArchiveIcon.jsx"
import DeleteAndroidIcon from "../Icons/DeleteAndroidIcon.jsx"
import { useSelector } from "react-redux";
import { defaultImageConfig } from "../../utils/config.js";

const DetailMobileComp = ({ detailMobileData, currentDevice="apple" }) => {

  const FormData = useSelector((state) => state.design.formValues);
  detailMobileData = FormData;

  const handleSwitchChange = (checked) => { };
  const labelClasses = currentDevice === "android" ? "bg-[#fff] text-[12px] p-2 border-[#f0eff5]" : "bg-[#fff] text-[12px] border-b-2 p-2 border-[#f0eff5]";
  const isFontBold = currentDevice === "android" ? "font-normal" : "font-bold";
  return (
    <div >
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

      {currentDevice === "android" && (
        <div className="flex justify-between px-4">
          <div className="hover:cursor-pointer">
            <BackArrowIcon />
          </div>
          {/* <div className="hover:cursor-pointer w-[30px]">
            Done
          </div> */}
        </div>
      )}

      <div className="bg-[#f0eff5] my-5 overflow-y-auto scroll-hidden h-[450px]">
        <div className="flex gap-[.625rem] p-2 bg-[#ffffff]">
          <div className="h-[55px] bg-[#E4D5C9] w-[30%]">
              <img
                src={defaultImageConfig.Base_URL + detailMobileData.logo_image}
              />
          </div>
          <p className="text-[14px] font-[300] w-[70%] cardDescription break-all" >
          {currentDevice === "apple" && (
            detailMobileData.card_description
          )}
          </p>
        </div>
        {currentDevice === "apple" && (
          <div className="bg-[#fff] my-[1rem]">
            <div className="flex justify-between gap-[1rem] py-[.5rem] px-[1rem]">
              {getLabelsBySelectedLang("Automatic Updates")}
              <BaseSwitchBox defaultChecked onChange={handleSwitchChange} />
            </div>
              <div className="flex justify-between gap-[1rem] py-[.5rem] px-[1rem]">
                {getLabelsBySelectedLang("Suggest on Lock Screen")}
                <BaseSwitchBox defaultChecked onChange={handleSwitchChange} />
              </div>
          </div>
        )}
        <div className="flex flex-col gap-4">

          {currentDevice === "android" && (
            <div className="bg-[#fff] p-2">{detailMobileData.businessName}</div>
          )}
          
          {currentDevice === "apple" && ( <>
          <div className="border-t-[1px] border-b-[1px] bg-[#fff] mt-[.625rem] p-2">
            <button className="btn text-[11px] font-[500] text-[#1986fd]">
              {getLabelsBySelectedLang("Share Pass")}
            </button>
          </div>

          <div className="border-t-[1px] border-b-[1px] bg-[#fff] mt-[.625rem] p-2">
            <button className="btn text-[11px] font-[500] text-[#f93b3c]">
              {getLabelsBySelectedLang("Remove Pass")}
            </button>
          </div>
          </> )}
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("How your customers earn 1 stamp")}
          </div>
          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.how_can_earn}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Business Name")}
          </div>
          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.businessName}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("How to Collect Stamps")}
          </div>
          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.howToCollectStamps
              ? detailMobileData.howToCollectStamps
              : "Spend $5 to get 1 stamp"}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Reward Details")}
          </div>
          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.rewardDetail
              ? detailMobileData.rewardDetail
              : "You will get a free coffee after collecting 8 stamps"}
          </div>
        </div>

        <div className={labelClasses} >
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Reward Name")}
          </div>
          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.reward_name}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Reward Description")}
          </div>
          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.reward_description}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Reward Success")}
          </div>

          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.reward_success_message}
          </div>
        </div>

        <div className={labelClasses} name='Stamp Success'>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Stamp Success")}
          </div>

          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.stamp_success_message}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Expiry Date")}
          </div>

          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.expiry_date}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Terms & Conditions")}
          </div>

          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.termsAndConditions}
          </div>
        </div>

        <div className={labelClasses}>
          <div className={isFontBold}>
            {getLabelsBySelectedLang("Powered By")}
          </div>

          <div className="font-normal text-[#abb4b9]">
            {detailMobileData.poweredBy
              ? detailMobileData.poweredBy
              : "Mentorsol"}
          </div>
        </div>
      
      {currentDevice === "android" && (<>
        <div className={`${labelClasses} flex items-center`}>
          <ArchiveIcon />
          <span className="font-normal text-[#abb4b9]">Archive</span>
        </div>

        <div className={`${labelClasses} flex items-center`}>
          <DeleteAndroidIcon width={"26px"}/>
          <span className="font-normal text-[#abb4b9]">Delete</span>
        </div>
      </> )}
      </div>
    </div>
  );
};

export default DetailMobileComp;
