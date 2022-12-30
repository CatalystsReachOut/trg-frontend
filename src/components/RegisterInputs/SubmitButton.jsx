import React from 'react'

const SubmitButton = ({label,style}) => {
    return (
        
            <button className={`capitalize bg-[#f1c40f] mt-[2.75rem] mb-[0.75rem] text-white font-medium text-[1.5rem] leading-[1.25rem] py-[10.5px] px-[2rem] rounded-[10px] ${style}`}>{label}</button>
        
    )
}

export default SubmitButton