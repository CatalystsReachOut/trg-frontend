import React from 'react'
import { useState } from 'react'
import { TiTick } from 'react-icons/ti'
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../routes/RouterConfig';

const ProgressBar = ({
    verifyPath
}) => {
    const location = useLocation()
    let c= localStorage.getItem('employment');
    let d=localStorage.getItem('Education');
    const currentPath = location.pathname;
    console.log(currentPath);
    console.log(c);
    const [arr, setArr] = useState([
        {
            title: 'Basic',
            selected: true,
        },
        {
            title: 'Employment',
            selected: currentPath===ROUTES.Profile.Initial.Education?true:false,
        },
        {
            title: 'Education',
            selected: false,
        },
    ])

    console.log(arr);


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
                                    <div className={`rounded-full text-white h-[30px] w-[30px]`} style={{background:!i?.selected?colors.two:colors.three}}></div>
                                    :
                                    <div className={` rounded-full text-white h-[30px] w-[30px]`} style={{background:!i?.selected&&arr[parseInt(key)-1].selected?colors.two:colors.first}}></div>
                                }
                                {
                                    key +1 !== arr.length 
                                    &&
                                    <div className={`w-[150px] h-[5px]`} style={{background:i?.selected?colors.three:colors.first}}></div>
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