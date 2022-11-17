import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const InterviewRounds = ({ notify, enterLoading, exitLoading, loadings }) => {
  const [user, setUser] = useState({
    profile:"",
    noOfRound:"",
    noOfQuestion:""
  })


  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },
    {
      title: "No Of Round",
      dataIndex: "noOfRound",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },
    {
      title: "No Of Question",
      dataIndex: "noOfQuestion",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },
    {
      title: "Action",
      dataIndex: "action"
    },
  ];

  const [data, setData] = useState([
  ]);

  const [profileData, setProfileData] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
        ...prev,
        [name]: value
    }))
}

const handelChangeSelect = (e) => {
  const { name, value } = e;
  setUser(prev => ({
    ...prev,
    [name]: value
  }))
}

const getBasicData = async() => {
 const [data1, data2] = await Promise.all([
  apiProvider.getProfile()
  .then(res=>{
    const arr = res?.data?.map((i,key)=>({
      label:i?.title,
      value:i?._id
    }))
    setProfileData(arr)
  })
  .catch(err=>{
    console.log(err);
  })
  ,
  apiProvider.getQuestionBank()
  .then(res=>{
    console.log(res);
  })
  .catch(err=>{
    console.log(err);
  })
 ])
}

const getData = () => {
  enterLoading(2)
  apiProvider.getInterviewRounds()
      .then(res => {
              setData(res.data)
          return exitLoading(2)
      })
      .catch(err => {
          console.log(err)
          return exitLoading(2)

      })
}

const handleSubmit = () => {
  enterLoading(1)
  return apiProvider.createInterviewRounds(user)
      .then(res => {
          exitLoading(1)
          if (res.isSuccess) {
              clearData()
              getData()
              return notify('success', 'added success');
          } else {
              return notify('error', res.message);
          }
      })
      .catch(err => {
          console.log(err)
          exitLoading(1)
          return notify('error', err.message);
      })
}

const clearData = () => {
  setUser({
    profile:"",
    noOfRound:"",
    noOfQuestion:""
  })
}

useEffect(() => {
  getData();
  getBasicData()
}, [])


  return (
    <div>
        <Card>
          <div className='font-bold'> Add Interview Round </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Select
              label={'Profile'}
              placeHolder = {'Profile'}
              name="profile"
              onChange = {handelChangeSelect}
              options={profileData}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'No Of Round'}
              placeHolder = {'Enter Number Of Round'}
              name="noOfRound"
              value = {user?.noOfRound}
              onChange = {handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'No Of Question'}
              placeHolder = {'Enter Number Of Question'}
              name="noOfQuestion"
              value = {user?.noOfQuestion}
              onChange = {handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button 
            title="Add Interview Round" 
            className={'min-w-[100px]'}
            onClick={handleSubmit}
            />
          </div>
        </Card>

        <Card className={'mt-3'}>
          <div className="font-bold my-3">
            Interview Rounds
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default InterviewRounds