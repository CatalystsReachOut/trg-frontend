import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const Department = () => {
  const [name, setName] = useState()

  const [user, setUser] = useState({
    title:'',
    description:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const columns = [
    {
      title: "Department",
      dataIndex: "title",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Action",
      dataIndex: "action"
    },
  ];

  const [data,setData] = useState([
    {
      key: "1",
      name: "Department 1",
      action:<Action/>
    },

  ]);

  const getData =()=>{
    apiProvider.getDepartment()
    .then(res=>{
      console.log(res)
      const arr=[]
      for (const i of res.data) {
        const obj = {
          key:i._id,
          title:i.title,
          description : i.description
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
    apiProvider.createDepartment(user)
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
          <div className='font-bold'> Add Department </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Input
              label={'Department'}
              placeHolder = {'Enter Department Name'}
              value = {user.title}
              name='title'
              onChange = {handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Description'}
              placeHolder = {'Enter Description'}
              value = {user.description}
              name='description'
              onChange = {handleChange}
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
            Department
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default Department