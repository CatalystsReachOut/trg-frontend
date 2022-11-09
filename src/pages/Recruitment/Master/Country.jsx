import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const Country = () => {
  const [name, setName] = useState()

  const [user, setUser] = useState({
    countryName:'',
    code:''
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
      title: "Country Name",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      }
    },
    {
      title: "Country Code",
      dataIndex: "code",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
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
      name: "John Brown",
      code:"IN",
      action:<Action/>
    },
  ]);

  const getData =()=>{
    apiProvider.getCountry()
    .then(res=>{
      console.log(res)
      const arr=[]
      for (const i of res.data) {
        const obj = {
          key:i._id,
          name:i.countryName,
          code:i.code,
          action:<Action/>
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
    apiProvider.createCountry(user)
    .then(res=>{
      console.log(res)
      getData();
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
          <div className='font-bold'> Add Country </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Input
              label={'Country'}
              placeHolder = {'Enter Country Name'}
              value = {user.countryName}
              name ={'countryName'}
              onChange = {handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Country Code'}
              placeHolder = {'Enter Country Code'}
              value = {user.code}
              name ={'code'}
              onChange = {handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button 
            title="Add Country" 
            className={'min-w-[100px]'}
            onClick={handleSubmit}
            />
          </div>
        </Card>

        <Card className={'mt-3'}>
          <div className="font-bold my-3">
            Country
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default Country