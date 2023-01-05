import React from 'react'
import ProgressBar from '../../components/partials/ProgressBar'

const Basic = () => {
  return (
    <div>
        <div className="w-[80%] m-auto mt-5">
            <div className='flex justify-center'>
                <ProgressBar/>
            </div>
            <div className="mt-10 border border-2 p-5">
                <div className='text-[#19435D] text-xl font-medium'>Welcome Name!</div>
                <div className='text-3xl font-medium mt-[30px]'>Add Your Employment</div>
                <div className='mt-[30px]'>
                    <label htmlFor=""></label>
                    <div className="flex gap-3">
                        <div className="h-[50px] w-[100px] flex justify-center text-lg items-center border border-[#2E7D21] bg-[#4CD1371A] rounded-full cursor-pointer">
                            Yes
                        </div>
                        <div className="h-[50px] w-[100px] flex justify-center text-lg items-center border bg-[#F8F8F8] rounded-full cursor-pointer">
                            No
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Basic