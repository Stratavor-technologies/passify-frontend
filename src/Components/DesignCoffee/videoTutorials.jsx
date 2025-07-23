import React from "react";
import playButtom from "../../assets/images/svg/playButtom.svg";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";

const videoTutorials = ({ title }) => {
  return (
    <div className="bg-[#E6FAFB] rounded-[.1875rem] flex items-center gap-[.75rem] px-[1rem] py-[.375rem]">
      <div className="">
        <img src={playButtom} alt="" />
      </div>
      <div className="">
        <h3 className="text-[1rem] text-[#364349] font-[500] leading-[1.125rem]">
          {getLabelsBySelectedLang("Video Tutorial")}
        </h3>
        <p className="text-[#364349] font-[.8125rem] leading-[1.125rem]">
          {getLabelsBySelectedLang(title)}
        </p>
      </div>
    </div>
  );
};

export default videoTutorials;
