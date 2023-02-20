import React from 'react'
import { useState } from 'react'
import { TiTick } from 'react-icons/ti'

const ProgressBar = () => {
    let c= localStorage.getItem('employment');
    let d=localStorage.getItem('Education');
    console.log(c);
    const [arr, setArr] = useState([
        {
            title: 'Basic',
            selected: true,
        },
        {
            title: 'Employment',
            selected: c ? true:false,
        },
        {
            title: 'Education',
            selected: d ? true:false
        },
    ])


    const colors = {
        three: '#4CD137',
        two: '#E5FFE8',
        first: '#D9D9D9'
    }
    return (
        <div className='w-full'>
            <div className="flex flex-nowrap justify-center">
                {
                    arr?.map((i, key) => (
                        <div className='flex flex-col gap-1 font-semibold '>
                            {i?.title}
                            <div className='flex items-center'>
                                {
                                    i?.selected
                                    ?
                                    <TiTick className={`bg-[#4CD137] rounded-full text-white h-[30px] w-[30px]`} />
                                    :
                                    key==0
                                    ?
                                    <div className={`bg-[${!i?.selected?colors.two:colors.three}] rounded-full text-white h-[30px] w-[30px]`}></div>
                                    :
                                    <div className={`bg-[${!i?.selected&&arr[parseInt(key)-1].selected?colors.two:colors.first}] rounded-full text-white h-[30px] w-[30px]`}></div>
                                }
                                {
                                    key +1 !== arr.length 
                                    &&
                                    <div className={`w-[150px] bg-[${i?.selected?colors.three:colors.first}] h-[5px]`}></div>
                                }
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProgressBar