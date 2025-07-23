import React from "react";

const BaseCard = ({ children }) => {
  return (
    <>
      <div className=" col-md-5 bg-[#f8f8f8] rounded-lg p-2 w-full flex flex-basis">
        {children}
      </div>
    </>
  );
};

export default BaseCard;
