import React from 'react'

const Subjective = ({data}) => {
  return (
    <div>
        <div className='text-lg'>
            {data?.question}
        </div>
        <div className="mt-2">
            <input type="text" placeholder='Enter your answer here' className="w-full h-[40px] focus:outline-none focus:border-b-[1.5px] border border-x-0 border-t-0  border-b-1 px-3 border-secondary" />
        </div>
    </div>
  )
}

export default Subjective