import React from "react";
import CheckCircle from "../../assets/images/svg/checkCircle.svg";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";

const BaseRadio = ({ options, selectedValue, onRadioChange, name }) => {
  return (
    <div className={`${selectedValue ? "flex gap-2" : "flex gap-[.75rem]"}`}>
      {options.map((option) => (
        <div key={option.id}>
          <label
            className={`flex gap-2 px-[.75rem] py-[.375rem] rounded-[3.125rem] ${selectedValue === option.id
              ? "bg-[#F3EEFF] text-[#522CA4]"
              : "bg-[#EDEFF0] text-[#677781]"
              }`}
          >
            <input
              type="radio"
              className="hidden"
              name={name}
              value={option.id}
              onChange={onRadioChange}
              checked={selectedValue === option.id}
            />
            <div className="flex">{getLabelsBySelectedLang(option.label)}</div>
            {selectedValue === option.id && (
              <img src={CheckCircle} alt="CheckCircle" />
            )}
          </label>
        </div>
      ))}
    </div>
  );
};

export default BaseRadio;
