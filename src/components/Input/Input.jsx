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
        type,
        name,
        disabled,
        readOnly,
        required
    } = props;
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
        <label htmlFor="" className={`text-base px-2  ${labelClassName}`}>{label}{required?'*':null}</label>
        <div className='px-2 w-full min-h-[50px] h-full'>
          <input 
          type={type} 
          value={value}
          placeholder={placeHolder}
          name={name}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          className={`text-sm p-1 px-2 min-w-full border-[2px] h-[40px] rounded-sm focus:outline-[#F1C40F]  ${inputClassName}`}
          />
        </div>
    </div>
  )
}

Input.defaultProps = {
    type:'text',
    label:'Default Label',
    placeHolder:'Default Placeholder',
    required:0
}

export default Input
