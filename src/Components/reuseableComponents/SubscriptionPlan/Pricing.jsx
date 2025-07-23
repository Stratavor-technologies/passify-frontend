import React from "react";

const Pricing = ({ price, plan, dollarColor, priceColor, planColor, curruncy }) => {
    return (
        <div className="flex items-center gap-1 mx-auto">
            <sup
                className={`text-[1.5625rem] font-[300] leading-[2.1875rem]`}
                style={{ color: dollarColor === 'Starter' ? "#7249CB" : dollarColor === 'Plus' ? '#00CAD1' : dollarColor === "Pro" ? "#FFA900" : '' }}
            >
                {curruncy}
            </sup>
            <p className={`text-[3.75rem] font-[300]`}
                style={{ color: priceColor === 'Starter' ? "#7249CB" : priceColor === 'Plus' ? '#00CAD1' : priceColor === "Pro" ? "#FFA900" : '' }}
            >
                {price}
            </p>
            <sub className={`text-[1rem] font-[500] leading-[1.5rem] text-[${planColor}]`}>/{plan}</sub>
        </div>
    );
};

export default Pricing;
