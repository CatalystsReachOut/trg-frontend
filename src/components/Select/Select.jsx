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
    isMulti,
    isSearchable,
    required,
    onMultiChange,
    isMultiFun
}) => {



    return (
        <div className={`custom-select w-full flex flex-col gap-2.5 ${className}`}>
            <label className={`text-base px-2 ${labelClassName}`} htmlFor="">{label} {required?<span style={{color:'red'}}>*</span>:null}</label>
            <Sel
                className={`text-sm px-2 outline-0 ${selectClassName}`}
                options={options}
                onChange={(p, e) => {
                    if(isMultiFun){
                        onMultiChange({data:p, name:e.name})
                    }
                    else{
                        onChange({ ...p, name: e.name })
                    }
                }}
                
                value={isMulti?options?.find(s => (s.value == value)):(options?.find(s => (s.value == value)) || null)}
                name={name}
                isDisabled={disabled}
                placeholder={placeholder}
                selelcted={defaultValue}
                isMulti={isMulti}
                defaultValue={defaultValue}
                isSearchable={isSearchable?isSearchable:false}
            />
        </div>
    )
}

Select.defaultProps = {
    label: 'Default Label',
}
export default Select