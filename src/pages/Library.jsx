import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import BaseCardWithImage from "../Components/Cards/BaseCardWithImage";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
import RadioGroup from "../Components/reuseableComponents/BaseRadio";
import { useSelector } from "react-redux";
import { libraryCategoryOption } from "../utils/RewardOption.js";
import { Spin } from "antd";
import { get } from "../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const userData = useSelector((state) => state.user.userData);
  const [Data, setData] = useState([]);
  const [LibraryData, setLibraryData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const libraryData = async () => {
    try {
      setLoading(true)

      const libraryCardData = await get("/library/list");
      setLibraryData(libraryCardData?.data);
      setData(libraryCardData?.data);
    } catch (error) {
      toast.error(error);

      setLoading(false)
    } finally {
      setLoading(false)
    }
  };

  const handleRadioChange = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
    if (event.target.value == 1) {
      setLibraryData(Data);
    } else {

      const filtered = Data.filter((card) => card.category == event.target.value);
      setLibraryData(filtered);
    }

  };


  // navigate To Design page
  const navigateToDesign = () => {
    navigate("/design");
  };

  useEffect(() => {
    libraryData();
  }, []);

  return (
    <>
      <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
        <div className="flex justify-between my-[1.5625rem]">
          <h3 className="font-[500] text-[1.875rem] text-[#364349] leading-[2.5rem]">
            {getLabelsBySelectedLang("Library")}
          </h3>

          <button
            className="flex items-center gap-[.5rem] px-[1.5rem] py-[.5rem] border  rounded-[.1875rem] bg-[#7249CB]"
            onClick={() => navigateToDesign()}
          >
            <AiOutlinePlus color="#fff" />
            <span className="text-[#fff] font-[600] leading-[1.375rem] text-[0.938rem]">
              {getLabelsBySelectedLang("Create Card")}
            </span>
          </button>
        </div>

        <div className="rounded-[1rem] bg-[#ffffff] p-5 flex items-center gap-6 shadow-lg">
          <h1 className="text-[#364349] text-[1rem] leading-[1.5rem] font-[500]">
            {getLabelsBySelectedLang("Category")}
          </h1>

          <RadioGroup
            options={libraryCategoryOption}
            selectedValue={selectedValue}
            onRadioChange={handleRadioChange}
            name="category"
          />
        </div>

        <div className="flex justify-center my-2">
          {
            loading &&
            <button className="bg-[#7249cb] my-2 py-[8px] px-[15px] rounded-md text-white"> <Spin /> </button>
          }
        </div>

        <div className=" rounded-[1rem] p-5 flex gap-[2rem] flex-wrap">
          {LibraryData?.map((data, index) => (
            <BaseCardWithImage key={index} libraryData={data} />
          ))}
        </div>

      </div>
    </>
  );
};

export default Library;
