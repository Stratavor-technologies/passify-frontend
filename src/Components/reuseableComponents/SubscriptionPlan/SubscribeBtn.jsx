import React from "react";
import { getLabelsBySelectedLang } from "../../../utils/LabelsTranslation";

const SubscribeBtn = ({ planID, handleSubmit, btnBgColor }) => {
  return (
    <div>
      <button
        onClick={() => handleSubmit(planID)}
        className={`max-w-[20.5625rem] w-full h-[2.375rem] rounded-[.1875rem] bg-[${btnBgColor}] text-white text-[.9375rem] font-[600] leading-[1.375rem]`}
      >
        {getLabelsBySelectedLang("Subscribe")}
      </button>
    </div>
  );
};

export default SubscribeBtn;
