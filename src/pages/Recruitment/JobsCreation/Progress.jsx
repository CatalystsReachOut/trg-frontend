import React from 'react'
import BackButton from '../../../components/Button/BackButton'
import Card from '../../../components/Card/Card'
import pendingPro from './../../../assets/images/recruitment/pending-status.png'
import successPro from './../../../assets/images/recruitment/success-status.png'

const Progress = () => {
  return (
    <div>
        <Card>
            <div className='flex gap-3 items-center'>
                <BackButton/>
                <div className='text-lg'>Software Developer</div>
            </div>
            <div className='px-6 py-6 grid grid-cols-11'>
                <div className="col-span-2 flex items-center justify-center">
                    <img src={successPro} alt="" className='w-[50px]' />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <div className='h-[2px] bg-third w-full'></div>

                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <img src={successPro} alt="" className='w-[50px]' />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <div className='h-[2px] bg-third w-full'></div>

                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <img src={pendingPro} alt="" className='w-[50px]' />
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <div className='h-[2px] bg-third w-full'></div>

                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <img src={pendingPro} alt="" className='w-[50px]' />
                </div>
                <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                    <div className='sm:text-lg text-sm'>
                        Reporting Manager
                    </div>
                    <div className='sm:text-base text-xs'>
                        2nd Nov 2022 | 4:06 pm
                    </div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                    <div  className='sm:text-lg text-sm'>
                        Reporting Manager
                    </div>
                    <div className='sm:text-base text-xs'>
                        2nd Nov 2022 | 4:06 pm
                    </div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                    <div  className='sm:text-lg text-sm'>
                        Pending
                    </div>
                    <div className='sm:text-base text-xs'></div>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                    <div  className='sm:text-lg text-sm'>
                        Pending

                    </div>
                    <div className='sm:text-base text-xs'></div>
                </div>
            </div>
        </Card>
        <Card className='mt-6 px-6'>
            <div className='font-extrabold text-lg text-secondary'>Job Created</div>
            <div>2nd Nov 2022 | 4:06 pm</div>
            <div className="grid grid-cols-3 my-6 text-lg">
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>Bussiness Name :</div>
                    <div>This is bussiness name</div>
                </div>
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>Country :</div>
                    <div>India</div>
                </div>
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>State :</div>
                    <div>Karnataka</div>
                </div>
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>City :</div>
                    <div>Bengaluru</div>
                </div>
            </div>
        </Card>
        <Card className='mt-6 px-6'>
            <div className='font-extrabold text-lg text-secondary'>Approver 1</div>
            <div>2nd Nov 2022 | 4:06 pm</div>
            <div className="grid grid-cols-3 my-6 text-lg">
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>Bussiness Name :</div>
                    <div>This is bussiness name</div>
                </div>
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>Country :</div>
                    <div>India</div>
                </div>
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>State :</div>
                    <div>Karnataka</div>
                </div>
                <div className="col-span-1 flex gap-3 mt-3">
                    <div className='font-bold '>City :</div>
                    <div>Bengaluru</div>
                </div>
            </div>
        </Card>
        <Card className='mt-6 px-6'>
        <div className='font-extrabold text-lg text-secondary'>Approver 2</div>
            <div>2nd Nov 2022 | 4:06 pm</div>
                <div className="grid grid-cols-3 my-6 text-lg">
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Eligibility Criteria :</div>
                        <div>B.E Computer Science</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Work Type :</div>
                        <div>Remote</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Work Shift :</div>
                        <div>Day</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Remark :</div>
                        <div>This is Remark by Approver 1</div>
                    </div>
                </div>
        </Card>
        <Card className='mt-6 px-6'>
        <div className='font-extrabold text-lg text-secondary'>Approver 3</div>
            <div>2nd Nov 2022 | 4:06 pm</div>
                <div className="grid grid-cols-3 my-6 text-lg">
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Price Range :</div>
                        <div>10,000 - 15,000</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Compensation mode: :</div>
                        <div>Mode 1</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                       
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Remark :</div>
                        <div>Remark 2</div>
                    </div>
                </div>
        </Card>
        <Card className='mt-6 px-6'>
        <div className='font-extrabold text-lg text-secondary'>Approver 4</div>
            <div>2nd Nov 2022 | 4:06 pm</div>
                <div className="grid grid-cols-3 my-6 text-lg">
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Hierarchy band :</div>
                        <div>10</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>InterView</div>
                        <div>Interview</div>
                    </div>
                </div>
        </Card>
    </div>
  )
}

export default Progress