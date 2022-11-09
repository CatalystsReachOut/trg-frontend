import React from 'react'
import Sel from 'react-select';
import { Option } from 'antd/lib/mentions';
import './Select.scss'

const defaultOptions = [
    {
        label:'Default Opt1',
        value:'val1'
    },
    {
        label:'Default Opt2',
        value:'val2'
    },
]


const Select = (props) => {
    const {
        className,
        options,
        labelClassName,
        selectClassName,
        label,
        onChange,
        name,
        value,
        disabled
    } = props;  

    
  return (
    <div className={`custom-select w-full flex flex-col gap-2.5 ${className}`}>
        <label className={`text-base px-2 ${labelClassName}`} htmlFor="">{label}</label>
        <Sel
            className={`text-sm px-2 outline-0 ${selectClassName}`}
            options={options}
            onChange={(p,e)=>{
                onChange({...p,name:e.name})
            }}
            name={name}
            isDisabled={disabled}
        />
    </div>
  )
}

Select.defaultProps={
    label:'Default Label',
    options:defaultOptions
}

export default Select