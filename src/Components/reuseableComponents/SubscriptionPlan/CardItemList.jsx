import React from "react";

const CardItemList = ({ svgIcon, textHeading }) => {
    return (
        <li className="flex items-center gap-2 border-b-2 py-4 last-of-type:border-none">
            <img src={svgIcon} alt="" className="w-[1rem] h-[1rem]" />
            <p className="text-[1.0625rem] leading-[1.5rem] text-[#364349] font-[400]">{textHeading}</p>
        </li>
    );
};

export default CardItemList;
