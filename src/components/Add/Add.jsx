import React from 'react'
import { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import Input from '../Input/Input'

const Add = () => {
    const [flag, setFlag] = useState(false)
  return (
    <div>
    {flag?
    <Input/>
    :
    <button className='flex items-center gap-2 text-secondary mt-3'>
        <FiPlusCircle onClick={()=>setFlag(true)}/> Add Awards and Accomplishment
    </button>}
    </div>
  )
}

export default Add