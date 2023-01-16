import React, { useState, useEffect } from 'react'
import * as apiProvider from '../../../services/api/recruitment'
import JobComponent from "../../../components/Jobs/Jobs"
import { RiSearch2Line } from 'react-icons/ri'
import Select from 'react-select'
import Card from '../../../components/Card/Card'
import * as storageConstant from './../../../utils/storageConstants'
import { useNavigate } from 'react-router-dom'
import Table from '../../../components/Table/Table'
import { ROUTES } from '../../../routes/RouterConfig'
import { Modal } from 'antd'
import Button from '../../../components/Button/Button'
import { DownOutlined, PhoneOutlined, MailOutlined   } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { fetchLocalData } from '../../../services/common'
import * as sessionStorage from '../../../utils/storageConstants'



const Jobs = () => {

  const [jobId, setJobId] = useState("")
  const [jobData, setJobData] = useState({})

  const [step, setStep] = useState(1)

  const [profileData, setProfileData] = useState([])

  const userProfile = fetchLocalData(sessionStorage.LOCAL,sessionStorage.PROFILE_ID)

  const userRole = fetchLocalData(sessionStorage.LOCAL,sessionStorage.ROLE)

  const columns = [
    {
      title: "Business",
      dataIndex: "businessName",
      render: (_, { state }) => (<> <img width={100} src="https://raichandgroup.com/assets/images/logo/sidebar-logo.png" alt="" /> </>)

    },
    {
      title: "Job ID",
      dataIndex: "jobId",
      // render: (_, { state }) => (<> {stateOptions.find(item => item.value === state)?.label} </>)

    },
    {
      title: "Opportunity ID",
      dataIndex: "opportunityId",
      render: (_, { opportunityId }) => (<> {opportunityId?opportunityId:'Not Created'} </>)

    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      // render: (_, { country }) => (<> {countryOptions.find(item => item.value === country)?.label} </>)
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (_, { createdAt }) => (<> {createdAt.split("T")[0]} </>)
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, { _id , approver_1,approver_2,approver_3,approver_4}) => (<div className='flex items-center gap-2'> 
        <Button title="view" onClick={() => { showModal(); setJobId(_id) }} /> 
        {
          userProfile==approver_1?.profileId||userProfile==approver_2?.profileId||userProfile==approver_3?.profileId||userProfile==approver_4?.profileId||userRole=="ADMIN"
          ?
          <Button title="Edit" onClick={() => { navigate(ROUTES.Recruitment.Job+'/'+_id) }} /> 
          :
          null
        }
        </div>
      )
    },

  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const navigate = useNavigate()

  const [data, setData] = useState()

  const getData = () => {
    apiProvider.getJob()
      .then(res => {
        if (res.isSuccess) {
          setData(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getBasicData= async() => {
    await apiProvider.getProfile()
    .then(res=>{
      if (res.isSuccess) {
        setProfileData(res.data)
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  const band = localStorage.getItem(storageConstant.BAND)


  useEffect(() => {
    getBasicData()
    getData();
  }, [])

  useEffect(() => {
    if (jobId) {
      setJobData(data?.find(item => item._id === jobId))
    }
  }, [jobId])



  return (
    <div>
      <Modal width={800} title="Job Details" open={isModalOpen} footer={null} onCancel={handleCancel}>
        {
          step === 1 ? <>
            <h6 className='text-center font-semibold text-[20px]'>Job ID : {jobData?.jobId}</h6>
            <div className="grid mt-[30px] grid-cols-2 gap-4">
              <div className="col-span-2">
                <span className='font-semibold text-[16px]'>Profile :</span> {jobData?.profileName}
              </div>
              <div className="col-span-2">
                <span className='font-semibold text-[16px]'>Business :</span> {jobData?.businessName}
              </div>
              <div className="col-span-2">
                <span className='font-semibold text-[16px]'>Location :</span> {jobData?.countryName}-{jobData?.stateName}-{jobData?.cityName}
              </div>
              <div className="col-span-2">
                <span className='font-semibold text-[16px]'>Headcount :</span> {jobData?.headcount}
              </div>
            </div>

            <div className='mt-[30px] justify-center flex gap-3 py-3'>
              <Button title="Track Status" className="w-[100px] font-semibold" onClick={() => setStep(2)} />
              <Button type='2' title="Close" onClick={handleCancel} className="w-[100px] font-semibold" />
            </div>

          </> : <>
            <h6 className='text-center font-semibold text-[20px]'>Job Status</h6>
            {/* <button className="btn-primary">
              Back
            </button> */}

            <p className='text-[18px] mt-[20px]'>Job ID : <span className='font-semibold'>{jobData?.jobId}</ span> </p>

            <div className="grid mt-[30px] grid-cols-4 gap-4 pb-[50px]">
              <div className="items-center justify-center">
                <div className='flex'>
                  <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                      <DownOutlined />
                    </a>
                  </Dropdown>
                  <h6 className=' ml-[5px] font-semibold text-[17px]'>Reporting Manager ({profileData?.find(s=>s._id==jobData?.profileId).reportProfile?profileData?.find(s=>s._id==profileData?.find(s=>s._id==jobData?.profileId).reportProfile).title:'not assigned any' })</h6>
                </div>
                <p className='text-[14px] ml-[15px] text-[red]'>Pending</p>
              </div>
              <div className="items-center justify-center">
                <div className='flex'>
                  <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                      <DownOutlined />
                    </a>
                  </Dropdown>
                  <h6 className='font-semibold ml-[5px] text-[18px]'>HR Manager   ({profileData?.find(s=>s._id==jobData?.profileId).approvingAuthority[0]?.profile?profileData?.find(s=>s?._id==profileData?.find(s=>s?._id==jobData?.profileId)?.approvingAuthority[0]?.profile)?.title:'not assigned any' })</h6>
                </div>
                <p className='text-[14px] text-[red] ml-[15px]'>Pending at Level 1</p>
              </div><div className=" items-center justify-center">
                <div className='flex '>
                  <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                      <DownOutlined />
                    </a>
                  </Dropdown>
                  <h6 className='font-semibold ml-[5px] text-[18px]'>Country Head  ({profileData?.find(s=>s._id==jobData?.profileId).approvingAuthority[1]?.profile?profileData?.find(s=>s?._id==profileData?.find(s=>s?._id==jobData?.profileId)?.approvingAuthority[1]?.profile)?.title:'not assigned any' })</h6>
                </div>
                <p className='text-[14px] ml-[15px] text-[red]'>Pending at Level 2</p>

              </div><div className=" items-center justify-center">
                <div className='flex'>
                  <Dropdown overlay={menu}>
                    <a onClick={(e) => e.preventDefault()}>
                      <DownOutlined />
                    </a>
                  </Dropdown>
                  <h6 className='font-semibold ml-[5px] text-[17px] whitespace-none'>HR Head  ({profileData?.find(s=>s._id==jobData?.profileId).approvingAuthority[2]?.profile?profileData?.find(s=>s?._id==profileData?.find(s=>s?._id==jobData?.profileId)?.approvingAuthority[2]?.profile)?.title:'not assigned any' })</h6>
                </div>
                <p className='text-[14px] ml-[15px] text-[red]'>Pending at Level 3</p>

              </div>
            </div>



            {/* <div className='mt-[30px] justify-center flex gap-3 py-3'>
              <Button title="Track Status" className="w-[100px] font-semibold" onClick={() => navigate("/recruitment/view-job")} />
              <Button type='2' title="Close" onClick={handleCancel} className="w-[100px] font-semibold" />
            </div> */}

          </>
        }
      </Modal>
      <Card className=' flex items-center justify-between px-3 flex-wrap gap-3'>
        <div className='flex items-center gap-3 flex-wrap'>
          <Select />
          <Select />
          <Select />
          <Select
            options={[{
              label: 'label1',
              value: 'value1',
              isOptionSelected: true
            }]}
          />
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex p-2 gap-2 items-center bg-white10 h-[40px] rounded-lg'>
            <RiSearch2Line />
            <input type="text" placeholder='Search' className='outline-none focus:outline-none p-2 w-auto bg-transparent' />
          </div>
          <button onClick={() => { navigate(ROUTES.Recruitment.CreateJob) }} className='btn-primary text-white h-[40px] p-2 rounded-lg'>
            + Add Job
          </button>
        </div>

      </Card>
      <br />
      <Table columns={columns} dataSource={data} />

      {/* {
        data && data?.length != 0 ? data.map((item, key) => {
          // return <JobComponent data={item} />
          if (item?.approver_1?.status == 'PENDING' && band >= 5)
            return <JobComponent data={item} />
          else if (item?.approver_2?.status == 'PENDING' && band >= 4)
            return <JobComponent data={item} />
          else if (item?.approver_3?.status == 'PENDING' && band >= 3)
            return <JobComponent data={item} />
          else if (item?.approver_4?.status == 'PENDING' && band >= 2)
            return <JobComponent data={item} />
          else
            return <JobComponent data={item} />
        })
          :
          <div>
            No Jobs Avaialable
          </div>
      } */}


    </div>
  )
}

export default Jobs

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            9661396318
          </a>
        ),
        icon: <PhoneOutlined />
      },
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            info@raichandgroup.com
          </a>
        ),
        icon: <MailOutlined />
      }
    ]}
  />
);