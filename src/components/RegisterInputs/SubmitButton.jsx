import React from 'react'

const SubmitButton = ({label,style,handleEvent}) => {
    return (
        
            <button 
            className={`capitalize bg-[#f1c40f] mt-[2.75rem] mb-[0.75rem] text-white font-[600] text-[1.125rem] leading-[1.25rem] py-[12px] px-[2rem] rounded-[10px] ${style}`}
            onClick={handleEvent}
            >{label}</button>
        
    )
}

export default SubmitButton