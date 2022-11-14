import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const InterviewRounds = ({ notify, enterLoading, exitLoading, loadings }) => {
  const [interviewRound, setInterviewRound] = useState({
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
    setInterviewRound(prev => ({
        ...prev,
        [name]: value
    }))
}

const getData = () => {
  enterLoading(2)
  apiProvider.getInterviewRounds()
      .then(res => {

          if (res.isSuccess) {
              setData(res.data)
              const arr = res.data.map(data => ({
                  value: data._id,
                  label: data.profile
              }))
              setProfileData(arr)
          }
          return exitLoading(2)
      })
      .catch(err => {
          console.log(err)
          return exitLoading(2)

      })
}

const handleSubmit = () => {

  enterLoading(1)
  return apiProvider.createInterviewRounds(interviewRound)
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
  setInterviewRound({
    profile:"",
    noOfRound:"",
    noOfQuestion:""
  })
}

useEffect(() => {
  getData();
}, [])


  return (
    <div>
        <Card>
          <div className='font-bold'> Add Interview Round </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Input
              label={'Profile'}
              placeHolder = {'Profile'}
              name="profile"
              value = {interviewRound?.profile}
              onChange = {handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'No Of Round'}
              placeHolder = {'Enter Number Of Round'}
              name="noOfRound"
              value = {interviewRound?.noOfRound}
              onChange = {handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'No Of Question'}
              placeHolder = {'Enter Number Of Question'}
              name="noOfQuestion"
              value = {interviewRound?.noOfQuestion}
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