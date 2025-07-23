import React from "react";
import { getLabelsBySelectedLang } from "../../../utils/LabelsTranslation";

const CardHeading = ({ heading, color }) => {
  return (
    <div>
      <h1
        className={`font-[500] text-[1.5625rem] leading-[2.1875rem] `}
        style={{
          color:
            color === "Starter"
              ? "#7249CB"
              : color === "Plus"
              ? "#00CAD1"
              : color === "Pro"
              ? "#FFA900"
              : "",
        }}
      >
        {heading}
      </h1>
    </div>
  );
};

export default CardHeading;
