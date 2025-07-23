import React, { useMemo, useState } from "react";
import Info from "../../assets/images/svg/Info.svg";
import logoTooltip from "../../assets/images/svg/logoTooltip.svg";
import arrowTooltip from "../../assets/images/svg/arrowTooltip.svg";
import { Tooltip } from "antd";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";
const headingWIthInfo = ({ title, number, icon, numberIcon, description }) => {
  const [arrow, setArrow] = useState("Show");
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <>
      <div className="flex gap-[.25rem]">
        {numberIcon && (
          <div className="w-[1.5rem] h-[1.5rem] text-[#ffffff] text-[.8125rem]  leading-[1.5rem] mr-[.25rem] bg-[#ABB4B9] rounded-full text-center">
            {number}
          </div>
        )}
        <h1 className="font-[600] text-[#364349]">
          {getLabelsBySelectedLang(title)}
        </h1>
        <Tooltip
          placement="rightTop"
          title={
            <div className="p-1">
              <img
                src={logoTooltip}
                alt="Tooltip Image"
                style={{ maxWidth: "100%" }}
              />
              <p className="text-[1rem] font-[500] mt-[.5rem]">
                {getLabelsBySelectedLang(title)}
              </p>
              <p className="text-[13px] font-[400] mb-[1rem]">{description}</p>
              <button className="bg-[#F3EEFF] text-[#7249CB] flex justify-center items-center w-[7.125rem] h-[1.9375rem] gap-[.25rem] rounded-[.1875rem] font-[600]">
                Learn More
                <img src={arrowTooltip} alt="arrowTooltip" />
              </button>
            </div>
          }
          arrow={mergedArrow}
        >
          {icon && <img src={Info} />}
        </Tooltip>
      </div>
    </>
  );
};

export default headingWIthInfo;
