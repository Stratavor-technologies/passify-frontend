import React from "react";
import { Radio } from "antd";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const BaseRadioButtonGroup = ({
  options,
  defaultValue,
  buttonStyle,
  onChange,
  name,
}) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      buttonStyle={buttonStyle}
      onChange={onChange}
      name={name}
      className="w-[100%]"
    >
      {options.map((option) => (
        <RadioButton key={option.value} value={option.value}>
          <div className="flex flex-col justify-center items-center w-[100%] p-[.625rem] mx-auto">
            <img src={option.image} alt={option.alt} />
            <p className="p-0 leading-[0.65] mt-2">{getLabelsBySelectedLang(option.label)}</p>
          </div>
        </RadioButton>
      ))}
    </RadioGroup>
  );
};

export default BaseRadioButtonGroup;
