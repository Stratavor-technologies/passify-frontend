import React from "react";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";
import { Spin } from 'antd'; // assuming Spin is imported from antd library

const CommonButton = ({ onClick, label, className, icon, btnLoading }) => {
  return (
    <button className={`${className}`} onClick={onClick} disabled={btnLoading}>
      {btnLoading ? <Spin /> : getLabelsBySelectedLang(label)} {icon && <img src={icon} alt="icon" />}
    </button>
  );
};

export default CommonButton;
