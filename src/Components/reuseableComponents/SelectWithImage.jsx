import React, { useState } from 'react';
import { Space, Input } from "antd";
import { CiSearch } from "react-icons/ci";
import Categoryicon from "../Icons/Categoryicon";



const SelectWithImage = ({
    selectedValue,
    options,
    onChange,
    label,
    validationErrors,
    name,
    signupSelect,
    placeholder,

}) => {

    const [datas, setDatas] = useState(options);
    const [filterdata, setFilterData] = useState(options);
    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState(selectedValue);
    function selectItem(item) {
        setIsSelected(item);
        onChange(name, item);
    }
    const [filterText, setFilterText] = useState("");

    const chnageSearchInput = (value) => {
        const filtered = datas.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(value)));
        setFilterData(filtered);
        setFilterText(value);
    };

    return (
        <>
            <Space direction="vertical" className="selectWithImage" style={{ width: "100%" }}>
                {label && (
                    <label className="text-[#364349] text-[.9375rem] leading-[1.5rem] mb-0">
                        {label}
                    </label>
                )}
                <div className="">
                    <div className="dropdown">
                        <div
                            onClick={(e) => {
                                setIsActive(!isActive);
                            }}
                            className="dropdown-btn">
                            <Categoryicon icon={selected} color="#677881" width={25} height={25} />
                            <span className='ml-3 lin-h leading-7'>{selected}</span>
                            <span className={isActive ? "fas fa-angle-up" : "fas fa-angle-down"} />
                        </div>
                        <div className="dropdown-content flex-wrap" style={{ display: isActive ? "flex" : "none" }} >
                            <Input.Search
                                className="input"
                                placeholder="search..."
                                onChange={(e) => { chnageSearchInput(e.target.value) }}
                                style={{ color: '#ced4da' }}
                                value={filterText}
                                // enterButton={false}
                                prefix={<CiSearch style={{ transform: 'rotate(90deg)', color: '#858585', fontSize: "1rem" }} />}
                            />
                            {filterdata.map((data, index) => (
                                <div
                                    key={index}
                                    onClick={(e) => {
                                        selectItem(data.value);
                                        setIsActive(!isActive);
                                    }}
                                    className="item">
                                    <Categoryicon icon={data.value} color="#677881" width={25} height={25} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <span className="text-red-500 text-[.75rem] mb-0">
                    {validationErrors}
                </span>
            </Space>


        </>
    );
};

export default SelectWithImage;
