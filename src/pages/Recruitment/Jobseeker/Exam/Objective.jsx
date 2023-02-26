import React from 'react'

const Objective = ({ data }) => {
    return (
        <div>
            <div className='text-lg'>
                {data?.question}
            </div>
            <div className="mt-2">
                {
                    data?.options?.map((i,key)=>(
                        <div className='p-2 px-4 w-full border border-secondary rounded-full cursor-pointer mb-2 hover:bg-secondary hover:text-white focus:secondary'>
                            {key + 1}. This is Option
                        </div>
                    ))
                }
                {/* {
                    data?.options?.map((i,key)=>(
                    <div key={key} className='flex gap-3 items-center'>
                        <input type="radio" style={{ accentColor: 'green' }} name='option' /> {i?.answerBody}
                    </div>
                    ))
                } */}
            </div>
        </div>
    )
}

export default Objective