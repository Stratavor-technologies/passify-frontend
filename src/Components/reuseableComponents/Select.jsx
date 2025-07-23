import React from "react";
import { Select, Space } from "antd";
import { Option } from "antd/es/mentions";

const SelectField = ({
  selectedValue,
  options,
  onChange,
  label,
  validationErrors,
  name,
  signupSelect,
  placeholder,
  disabled

}) => {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        {label && (
          <label className="text-[#364349] text-[.9375rem] leading-[1.5rem] mb-0">
            {label}
          </label>
        )}
        <Select
          className={`${signupSelect}`}
          value={selectedValue}
          onChange={(value) => {
            onChange(name, value);
          }}

          style={{ width: "100%", marginBottom: "0rem", height: "50px" }}
          placeholder={placeholder}
          disabled={(disabled && disabled === true) ? true : false}

        >
          {options.map((data, index) => (
            <Option key={index} value={data.value}>
              {data.label}
            </Option>
          ))}

        </Select>

        <span className="text-red-500 text-[.75rem] mb-0">
          {validationErrors}
        </span>
      </Space>


    </>
  );
};

export default SelectField;
