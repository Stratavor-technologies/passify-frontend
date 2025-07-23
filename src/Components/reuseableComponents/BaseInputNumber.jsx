import React, { useState } from 'react';

const BaseInputNumber = ({ name, type, placeholder, onInputChange, labelValue, validationErrors }) => {
    const maxCharacters = 15;

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const newValue = event.target.value.slice(0, maxCharacters);
        setValue(newValue);
        onInputChange(name, newValue);
    };

    return (
        <div className="my-6">
            <label className="text-[0.9rem]">{labelValue}</label>

            <input
                style={{ '::placeholder': { color: 'red' } }}
                type={type}
                placeholder={placeholder}
                name={name}
                className='h-[3.125rem] bg-gray-100 border hover:border-blue-500 hover:bg-white outline-none border-transparent text-xs leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out w-full text-black'
                value={value}
                onChange={(event) => handleChange(event)}
            />
            <span className="text-red-500 text-[.75rem]">{validationErrors}</span>
        </div>
    );
};

export default BaseInputNumber;
