import React from 'react'
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'

const Action = () => {
  return (
    <div className='flex gap-3'>
      <button onClick={()=>console.log('a')}><AiOutlineDelete className='text-[red]'/></button>
      <button onClick={()=>console.log('b')}><AiOutlineEdit/></button>
    </div>
  )
}

export default Action