import React, { useEffect, useState } from "react";
import BaseMobileCard from "../Components/Cards/BaseMobileCard";
import cardImage from "../assets/images/cardImg.png";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
import { Spin } from "antd";
import { get } from "../axios";
import { useNavigate } from "react-router";

const MyCards = () => {
  const initialOffset = 0;
  const [allCardData, setAllCardData] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(6);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    getCardData(offset);
  }, [offset]);

  const loadMore = () => {
    setBtnLoading(true);
    setOffset(prevOffset => prevOffset + limit);
  };

  const getCardData = async (ofSet) => {
    setBtnLoading(true);
    try {
      const response = await get(`pass/readByUser?offset=${ofSet}&limit=${limit}`);
      const passData = response?.data?.passData;
      if (passData) {
        setAllCardData(prevState => [...prevState, ...passData]);
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const navigate = useNavigate()

  const navigateToDesign = () => {
    localStorage.removeItem("userId");
    navigate("/design")
  }

  return (
    <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
      <div className="flex justify-between my-[1.5625rem]">
        <h1 className="text-[1.875rem] font-[500] text-[#364349]">
          {getLabelsBySelectedLang("My Cards")}
        </h1>
        <button className="bg-[#7249CB] py-[.5rem] px-[1.5rem] rounded-[.1875rem] text-white font-[600] text-[.9375rem] leading-[1.375rem] "
          onClick={() => navigateToDesign()}
        >
          + {getLabelsBySelectedLang("Create Card")}
        </button>
      </div>
      {allCardData.length > 0 && (
        <div className="bg-[#ffffff] rounded-[1rem] flex gap-[5rem] justify-center flex-wrap">
          {allCardData.map((data, index) => (
            <BaseMobileCard
              key={data.id}
              cardImage={cardImage}
              eyeIcon={true}
              id={data.id}
              cardData={data}
            />
          ))}
        </div>
      )}


      <div className="flex justify-center mt-4">
        {allCardData.length === 0 && !btnLoading ? (
          <p>no cards available!</p>
        ) : (
          <button onClick={loadMore} className="bg-[#7249cb] my-2 py-[8px] px-[15px] rounded-md text-white">
            {btnLoading ? <Spin /> : "Load More"}
          </button>
        )}
      </div>



    </div>
  );
};

export default MyCards;
