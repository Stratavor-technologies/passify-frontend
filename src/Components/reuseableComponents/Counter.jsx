import React, { useState } from "react";
import AddIcon from "../../assets/images/svg/AddIcon.svg";
import SubtractIcon from "../../assets/images/svg/SubtractIcon.svg";

const NumberInput = ({
  name,
  initialValue = 1,
  step = 1,
  onCounterChange,
  maxLength,
}) => {
  const [value, setValue] = useState(
    Math.min(30, Math.max(1, parseInt(initialValue, 10))) || 1
  );

  const handleIncrement = () => {
    if (value + step <= 30) {
      const newValue = value + step;
      setValue(newValue);
      onCounterChange && onCounterChange(name, newValue);
    }
  };

  const handleDecrement = () => {
    if (value - step >= 1) {
      const newValue = value - step;
      setValue(newValue);
      onCounterChange && onCounterChange(name, newValue);
    }
  };

  const handleChange = (e) => {
    let newValue = parseInt(e.target.value, 10) || 1;
    newValue = Math.min(30, Math.max(1, newValue));
    setValue(newValue);
    onCounterChange && onCounterChange(name, newValue);
  };

  return (
    <div className="flex border-[1px] border-[#CED4DA] w-[7.5rem]  justify-center p-[.5rem] rounded-[.25rem]">
      <span className="" onClick={handleDecrement}>
        <img src={SubtractIcon} alt="SubtractIcon" />
      </span>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="text-center max-w-[2.5rem] w-full text-[#364349] font-[500]"
        min={1}
        max={30}
      />
      <span className="plus" onClick={handleIncrement}>
        <img src={AddIcon} alt="AddIcon" />
      </span>
    </div>
  );
};

export default NumberInput;
