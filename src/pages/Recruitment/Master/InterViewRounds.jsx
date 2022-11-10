import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const InterviewRounds = () => {
  const [name, setName] = useState()


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

  const getData =()=>{
    apiProvider.getInterviewRounds()
    .then(res=>{
      console.log(res)
      const arr =[]
      for (const i of res.data) {
        const obj = {
          key:i._id,
          profile:i.profile,
          noOfRound:i.noOfRound,
          noOfQuestion:i.noOfQuestion,
        }
        arr.push(obj)
      }
      setData(arr)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleSubmit =()=>{
    apiProvider.createInterviewRounds({name:name})
    .then(res=>{
      console.log(res)
      getData()
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  useEffect(()=>{
    getData();
  },[])

  return (
    <div>
        <Card>
          <div className='font-bold'> Add Interview Round </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Input
              label={'Interview Round'}
              placeHolder = {'Enter Round Name'}
              value = {name}
              onChange = {e => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button 
            title="Add Round" 
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