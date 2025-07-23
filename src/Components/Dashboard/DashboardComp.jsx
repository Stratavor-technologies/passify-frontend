import React from "react";
import { cardData } from "../../utils/dashboardCardData.js";
import { Link } from "react-router-dom";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation.js";
import { resetForm } from "../../store/reducers/designSlice.js";
import { useDispatch } from "react-redux";

const DashboardComp = () => {
  const dispatch = useDispatch();

  const resetFormValues = () => {
    dispatch(resetForm());
  };

  return (
    <>
      <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
        <div className="flex justify-between my-[1.5625rem]">
          <h1 className="text-[1.875rem] font-[500] text-[#364349]">
            {getLabelsBySelectedLang("Dashboard")}
          </h1>

          <Link to="/mycards">
            <button className="bg-[#7249CB] py-[.5rem] px-[1.5rem] rounded-[.1875rem] text-white font-[600] text-[.9375rem] leading-[1.375rem] ">
              {getLabelsBySelectedLang("My Cards")}
            </button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-x-[4rem] items-center h-[calc(100%-6rem)] ">
          {cardData.map((item, index) => (
            <div
              className="w-full bg-white shadow-xl rounded-lg mb-3"
              key={index}
            >
              <div>
                <img
                  src={item.img}
                  alt="card image"
                  className="object-cover w-[100%]"
                />
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h5 className="text-[1.5625rem] text-[#364349] leading-[2.1875rem] font-[500]">
                  {getLabelsBySelectedLang("Stylish cards")}
                </h5>
                <p className="font-[400] text-[.9375rem] text-[#677781] leading-[1.5rem]">
                  {getLabelsBySelectedLang(`${item.paragraph}`)}
                </p>

                <Link to={item.link}>
                  <button
                    className="text-[.9375rem] leading-[1.375rem] whitespace-nowrap font-[600] text-[#FFFFFF] bg-[#7249CB] rounded-[.1875rem] w-[9.5rem] py-[.5rem] px-[1.5rem] outline-none"
                    onClick={resetFormValues}
                  >
                    {getLabelsBySelectedLang(`${item.btnText}`)}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardComp;
