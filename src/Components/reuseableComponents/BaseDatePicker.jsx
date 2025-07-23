import React from "react";
import { DatePicker, Space } from "antd";
import CalenderData from "../../assets/images/svg/solar_calendar-bold.svg";
import { CalendarOutlined } from "@ant-design/icons"; // Import the desired icon
import moment from "moment";

const BaseDatePicker = ({
  direction = "vertical",
  width = "100%",
  onDateChange,
  name,
  customIcon,
  value,
  defaultValue,
}) => {
  const handleDateChange = (dates, dateStrings) => {

    if (onDateChange) {
      onDateChange({ dates, dateStrings, name });
    }
  };

  return (
    <Space
      direction={direction}
      style={{
        width: width,
      }}
    >
      <DatePicker
        className="w-full h-[3.125rem]"
        defaultValue={defaultValue ? moment(value) : null}
        onChange={handleDateChange}
        value={value}
        suffixIcon={
          <img src={CalenderData} alt="CalenderDateIcon" /> || (
            <CalendarOutlined />
          )
        }
      />
    </Space>
  );
};

export default BaseDatePicker;
