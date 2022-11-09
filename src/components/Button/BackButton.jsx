import React from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineInsertRowLeft } from 'react-icons/ai'

const BackButton = ({onClick}) => {
  return (
    <button 
    className='w-[35px] aspect-square rounded-full flex justify-center items-center btn-primary'
    onClick={onClick}
    ><AiOutlineArrowLeft/></button>
  )
}

export default BackButton