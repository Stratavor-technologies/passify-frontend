import React, { useState, useMemo } from "react";
import { Collapse } from "antd";
import "../../../assets/scss/Accordian.scss";
import info from "../../../assets/images/svg/Info.svg";
import logoTooltip from "../../../assets/images/svg/logoTooltip.svg";
import arrowTooltip from "../../../assets/images/svg/arrowTooltip.svg";
import { getLabelsBySelectedLang } from "../../../utils/LabelsTranslation";
import { Tooltip } from "antd";

const { Panel } = Collapse;

const BaseAccordion = ({ header, description, children }) => {
  const onChange = (key) => {};
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
      <div>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIcon={({ isActive }) =>
            isActive ? (
              <i className="bi bi-dash increased-size" />
            ) : (
              <i className="bi bi-plus increased-size" />
            )
          }
        >
          <Panel
            header={
              <div className="flex items-center gap-2 text-[#364349] text-[.9375rem] font-[600]">
                {getLabelsBySelectedLang(header)}
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
                        {getLabelsBySelectedLang(header)}
                      </p>
                      <p className="text-[13px] font-[400] mb-[1rem]">
                        {description}
                      </p>
                      <button className="bg-[#F3EEFF] text-[#7249CB] flex justify-center items-center w-[7.125rem] h-[1.9375rem] gap-[.25rem] rounded-[.1875rem] font-[600]">
                        Learn More
                        <img src={arrowTooltip} alt="arrowTooltip" />
                      </button>
                    </div>
                  }
                  arrow={mergedArrow}
                >
                  {<img src={info} alt="info" />}
                </Tooltip>
              </div>
            }
            key="1"
          >
            {children}
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

export default BaseAccordion;
