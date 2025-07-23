import React from "react";
import { Flex, Input } from "antd";

const { TextArea } = Input;

const BaseTextArea = ({
  onChange,
  value,
  // maxLength = 100,
  placeholder = "Enter text...",
  height = 120,
  name,
}) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <Flex vertical gap={32}>
      <TextArea
        // maxLength={maxLength}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        name={name}
        style={{
          height: height,
          resize: "none",
        }}
      />
    </Flex>
  );
};

export default BaseTextArea;
