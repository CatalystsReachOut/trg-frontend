import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import TextArea from './../../../components/Input/TextArea'
import * as apiProvider from '../../../services/api/recruitment'

const Bussiness = () => {
  const [name, setName] = useState()


  const columns = [
    {
      title: "Round",
      dataIndex: "name"
    },
    
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
      action:<Action/>
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
      action:<Action/>
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
      action:<Action/>
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
      action:<Action/>
    }
  ];

  const getData =()=>{
    apiProvider.getBusiness()
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleSubmit =()=>{
    apiProvider.createBusiness({name:name})
    .then(res=>{
      console.log(res)
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
          <div className='font-bold'> Add Round </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Input
              label={'Title'}
              placeHolder = {'Enter Title'}
              value = {name}
              onChange = {e => setName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Address'}
              placeHolder = {'Enter Address'}
              value = {name}
              onChange = {e => setName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Bussiness Logo'}
              placeHolder = {'Bussiness Logo'}
              type="file"
              value = {name}
              onChange = {e => setName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Bussiness URL'}
              placeHolder = {'Bussiness URL'}
              value = {name}
              onChange = {e => setName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Bussiness Code'}
              placeHolder = {'Bussiness Code'}
              value = {name}
              onChange = {e => setName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Summary'}
              placeHolder = {'Summary'}
              value = {name}
              onChange = {e => setName(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <TextArea
              label={'Description'}
              placeHolder = {'Description'}
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
            Rounds
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default Bussiness