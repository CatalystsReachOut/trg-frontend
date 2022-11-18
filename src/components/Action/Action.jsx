import React from 'react'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'

const Action = ({handleClickEdit, handleClickDelete}) => {
  return (
    <div className='flex gap-3'>
      <button onClick={()=>handleClickDelete}><AiOutlineDelete className='text-[red]'/></button>
      <button onClick={()=>handleClickEdit}><AiOutlineEdit/></button>
    </div>
  )
}

export default Action