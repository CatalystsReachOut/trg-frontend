import React from 'react'

const Input = (props) => {

    const {
        label,
        value,
        onChange,
        className,
        placeHolder,
        labelClassName,
        inputClassName,
        type
    } = props;
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
        <label htmlFor="" className={`${labelClassName}`}>{label}</label>
        <input 
        type={type} 
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        className={`text-base p-1 px-2 border-2 focus:outline-[#F1C40F] ${inputClassName}`}
        />
    </div>
  )
}

Input.defaultProps = {
    type:'text',
    label:'default label',
    placeHolder:'default placeholder'
}

export default Input
