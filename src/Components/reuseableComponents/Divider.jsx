import React from "react";

const Divider = ({ title }) => {
  return (
    <div className="flex justify-center items-center gap-3 text-[#677781]">
      <hr className="text-[#CED4DA] w-full" />
      {title}
      <hr className="text-[#CED4DA] w-full" />
    </div>
  );
};

export default Divider;
