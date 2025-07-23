import React from "react";
import { Input } from "antd";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";

const BaseInput = (props) => {
  const {
    placeholder,
    labelValue,
    name,
    type,
    handleChange,
    inputValue,
    validationErrors,
    className,
    infoText,
    Length,
    handleSearch,

  } = props;

  const renderSearchButton =
    name === "location_by_address" ? (
      <button
        onClick={handleSearch}
        type="button"
        className="py-[.5rem] px-[1.5rem] rounded-[.1875rem] bg-[#3f286f] text-white mt-2"
      >
        {getLabelsBySelectedLang("Search")}
      </button>
    ) : null;

  return (
    <>
      <div className="my-6">
        <div>
          <label className="text-[0.9rem]">{labelValue}</label>
          <label className="text-[0.9rem]">
            {getLabelsBySelectedLang("labelValue")}
          </label>
        </div>
        {type === "textarea" ? (
          <textarea
            name={name}
            value={inputValue}
            onChange={(e) => handleChange(e)}
            placeholder={placeholder}
            maxLength={Length}
            className={
              className ||
              "h-[3.125rem] bg-gray-100 border border-transparent text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
            }
          />
        ) : (
          <Input
            name={name}
            value={inputValue}
            onChange={(e) => handleChange(e)}
            type={type}
            placeholder={placeholder}
            maxLength={Length}
            className={
              className ||
              "h-[3.125rem] bg-gray-100 border border-transparent text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
            }
          />
        )}
        {infoText && (
          <div className="text-[#677781] text-[.8125rem]">{infoText}</div>
        )}
        <span className="text-red-500 text-[.75rem]">{validationErrors}</span>
        {renderSearchButton}
      </div>
    </>
  );
};

export default BaseInput;
