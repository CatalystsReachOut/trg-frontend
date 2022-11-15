import React from 'react'
import { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import Input from '../Input/Input'

const Add = () => {
    const [flag, setFlag] = useState(false)
  return (
    <div>
    {flag?
    <div>
        <input type="text" className='border border-2 border-secondary focus:outline-none'/>
    </div>
    :
    <button className='flex items-center gap-2 text-secondary mt-3' onClick={()=>{setFlag(true)}}>
        <FiPlusCircle /> Add Awards and Accomplishment
    </button>}
    </div>
  )
}

export default Add