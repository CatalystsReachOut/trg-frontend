import React, { useEffect, useState } from 'react'
import BackButton from '../../../components/Button/BackButton'
import Card from '../../../components/Card/Card'
import pendingPro from './../../../assets/images/recruitment/pending-status.png'
import successPro from './../../../assets/images/recruitment/success-status.png'
import * as apiProvider from '../../../services/api/recruitment'
import {ROUTES} from "../../../routes/RouterConfig.js"


import { useParams, useNavigate } from 'react-router-dom'


const Progress = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [data, setData] = useState()
    const [statusImage, setStatusImage] = useState()

    const getData = () => {
        apiProvider.getJobById(id)
            .then(res => {
                console.log(res)
                if (res.isSuccess) {
                    setData(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        getData();
    }, [])


    useEffect(() => {
        if (data && data.job) {
            const jb = data.job;

            const obj = {}
            if (jb.approver_1.status === "PENDING") {
                obj.approver_1 = pendingPro
            } else {
                obj.approver_1 = successPro
            }

            if (jb.approver_2.status === "PENDING") {
                obj.approver_2 = pendingPro
            } else {
                obj.approver_2 = successPro
            }

            if (jb.approver_3.status === "PENDING") {
                obj.approver_3 = pendingPro
            } else {
                obj.approver_3 = successPro
            }

            if (jb.approver_4.status === "PENDING") {
                obj.approver_4 = pendingPro
            } else {
                obj.approver_4 = successPro
            }

            setStatusImage(obj)
        }
    }, [data])


    return (
        <div className='py-[20px]'>
            <Card>
                <div
                    onClick={() => navigate(ROUTES.Recruitment.ViewJobs)}
                    className='flex gap-3 items-center cursor-pointer'>
                    <BackButton />
                    {/* <div className='text-lg'>{data?.profileName}</div> */}
                </div>
                {/* success Image */}
                <div className='px-6 py-6 grid grid-cols-11'>
                    <div className="col-span-2 flex items-center justify-center">
                        <img src={statusImage?.approver_1} alt="" className='w-[50px]' />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <div className='h-[2px] bg-third w-full'></div>

                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                        <img src={statusImage?.approver_2} alt="" className='w-[50px]' />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <div className='h-[2px] bg-third w-full'></div>

                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                        <img src={statusImage?.approver_3} alt="" className='w-[50px]' />
                    </div>
                    <div className="col-span-1 flex items-center justify-center">
                        <div className='h-[2px] bg-third w-full'></div>

                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                        <img src={statusImage?.approver_4} alt="" className='w-[50px]' />
                    </div>
                    <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                        <div className='sm:text-lg text-sm'>
                            Reporting Manager
                        </div>
                        <div className='sm:text-base text-xs'>
                            {
                                data?.approver_1?.status === "PENDING" ? "Pending Approval" : data?.approver_1?.approvedAt
                            }
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                        <div className='sm:text-lg text-sm'>
                            HR Manager
                        </div>
                        <div className='sm:text-base text-xs'>
                            {
                                data?.approver_2?.status === "PENDING" ? "Pending Approval" : data?.approver_1?.approvedAt
                            }
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                        <div className='sm:text-lg text-sm'>
                            Country Head
                        </div>
                        <div className='sm:text-base text-xs'>
                            {
                                data?.approver_1?.status === "PENDING" ? "Pending Approval" : data?.approver_1?.approvedAt
                            }
                        </div>
                    </div>
                    <div className="col-span-1"></div>
                    <div className="col-span-2 flex flex-col items-center justify-center text-center mt-3">
                        <div className='sm:text-lg text-sm'>
                            HR Head
                        </div>
                        <div className='sm:text-base text-xs'>
                            {
                                data?.approver_1?.status === "PENDING" ? "Pending Approval" : data?.approver_1?.approvedAt
                            }
                        </div>
                    </div>
                </div>
            </Card>
            <Card className='mt-6 px-6'>
                <div className='font-extrabold text-lg text-secondary'>Job Created</div>
                <div>{data?.job?.createdAt?.split("T")[0]}</div>
                <div className="grid grid-cols-3 my-6 text-lg">
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Bussiness Name :</div>
                        <div>{data?.businessName}</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Profile :</div>
                        <div>{data?.profileName}</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>Number Of Openings:</div>
                        <div>{data?.job?.numberOfOpenings}</div>
                    </div>
                    <div className="col-span-1 flex gap-3 mt-3">
                        <div className='font-bold '>City :</div>
                        <div>{data?.cityName}</div>
                    </div>
                </div>
            </Card>
            <Card className='mt-6 px-6'>
                <div className='font-extrabold text-lg text-secondary'>Reporting Manager</div>


                {
                    data && data?.approver_1?.status == "PENDING" ? <>
                        <div>2nd Nov 2022 | 4:06 pm</div>
                        <div className="grid grid-cols-3 my-6 text-lg">
                            <div className="col-span-1 flex gap-3 mt-3">
                                <div className='font-bold '>Remarks :</div>
                                <div>This is Remarks</div>
                            </div>
                        </div> </> : <h6 className='py-[15px] font-semibold'>Pending Approval</h6>
                }


            </Card>
            <Card className='mt-6 px-6'>
                <div className='font-extrabold text-lg text-secondary'>HR Manager</div>
                {
                    data && data?.approver_1?.status == "PENDING" ? <>

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
                    </> : <h6 className='py-[15px] font-semibold'>Pending Approval</h6>
                }

            </Card>
            <Card className='mt-6 px-6'>
                <div className='font-extrabold text-lg text-secondary'>Country Head</div>

                {
                    data && data?.approver_1?.status == "PENDING" ? <>
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
                    </> : <h6 className='py-[15px] font-semibold'>Pending Approval</h6>}
            </Card>
            <Card className='mt-6 px-6'>
                <div className='font-extrabold text-lg text-secondary'>HR Head</div>
                {
                    data && data?.approver_1?.status == "PENDING" ?
                        <>
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
                        </> : <h6 className='py-[15px] font-semibold'>Pending Approval</h6>}
            </Card>
        </div>
    )
}

export default Progress