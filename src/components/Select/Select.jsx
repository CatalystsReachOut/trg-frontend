import React from 'react'
import Sel from 'react-select';
import { Option } from 'antd/lib/mentions';
import './Select.scss'


const Select = ({
    className,
    options,
    labelClassName,
    selectClassName,
    label,
    onChange,
    name,
    value,
    disabled,
    defaultValue,
    placeholder,
    isMulti
}) => {



    return (
        <div className={`custom-select w-full flex flex-col gap-2.5 ${className}`}>
            <label className={`text-base px-2 ${labelClassName}`} htmlFor="">{label}</label>
            <Sel
                className={`text-sm px-2 outline-0 ${selectClassName}`}
                options={options}
                onChange={(p, e) => {
                    onChange({ ...p, name: e.name })
                }}
                value={options?.find(s => (s.value == value))}
                name={name}
                isDisabled={disabled}
                placeholder={placeholder}
                selelcted={defaultValue}
                isMulti={isMulti}
                defaultValue={defaultValue}
            />
        </div>
    )
}

Select.defaultProps = {
    label: 'Default Label',
}

export default Select