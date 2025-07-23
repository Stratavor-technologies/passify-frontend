import { Input } from 'antd'
import React from 'react'


const BasePasswordField = (props) => {
    const { placeholder, labelValue, name, type, handleChange, validationErrors } = props
    return (
        <>
            <div className="my-3">
                <label className="text-[0.9rem]">{labelValue}</label>
                <Input.Password
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="h-16 bg-gray-100 border border-transparent text-gray-700 text-sm leading-4 font-normal mb-6 px-5 py-2 rounded-md transition-all duration-300 ease-in-out"
                    onChange={(e) => handleChange(e)}
                />
                <span className="text-red-500 text-[.75rem]">{validationErrors}</span>
            </div>

        </>
    )
}

export default BasePasswordField
