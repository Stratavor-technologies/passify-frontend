import React, { useState } from "react";
import closeEyeIcon from "../../assets/images/svg/closeEyeIcon.svg";
import openEyeIcon from "../../assets/images/svg/openEyeIcon.svg";

const BaseInputField = ({
    label,
    type,
    placeholder,
    id,
    forLabel,
    name,
    handleChange,
    validationErrors,
    value
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    const borderColorClass = validationErrors ? "border-red-500" : "border-[#CED4DA]";

    return (
        <div className="relative my-4 ">
            <input
                type={isPasswordVisible ? "text" : type}
                id={id}
                name={name}
                value={value}
                onChange={(e) => handleChange(e)}
                className={`peer p-4 w-full border ${borderColorClass} rounded-lg text-sm placeholder:text-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2 `}
                placeholder={placeholder}
            />

            <label
                htmlFor={forLabel}
                className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-black peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 w-full"
            >
                {label}
            </label>
            {type === "password" && (
                <>
                    <img
                        src={isPasswordVisible ? openEyeIcon : closeEyeIcon}
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-[1.4375rem] cursor-pointer"
                        alt={isPasswordVisible ? "Hide Password" : "Show Password"}
                    />
                </>
            )}
            <span className="text-red-500 text-[.75rem]">{validationErrors}</span>
        </div>
    );
};

export default BaseInputField;
