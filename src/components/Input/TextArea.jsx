import React from 'react'

const TextArea = (props) => {

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
        readOnly
    } = props;
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
        <label htmlFor="" className={`text-base px-2  ${labelClassName}`}>{label}</label>
        <div className='px-2 w-full'>
          <textarea 
          type={type} 
          value={value}
          placeholder={placeHolder}
          name={name}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          rows={4}
          className={`text-sm p-1 px-2 min-w-full border-[2px] rounded-sm focus:outline-[#F1C40F]  ${inputClassName}`}
          />
        </div>
    </div>
  )
}

TextArea.defaultProps = {
    type:'text',
    label:'Default Label',
    placeHolder:'Default Placeholder'
}

export default TextArea
