import React from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import Select from '../../../components/Select/Select'
import { Sorter } from '../../../helpers/Sorter'

const State = () => {
  const [user, setUser] = useState({
    country:'',
    state:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const handelChangeSelect = (e) => {
    console.log(e);
    const {name, value} = e;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = () => {
    console.log('console')
  }

  const coutry = [
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'USA' },
    { value: 'UK', label: 'UK' }
  ]

  const columns = [
    {
      title: "State",
      dataIndex: "state",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      }
    },
    {
      title: "Action",
      dataIndex: "action"
    },
  ];

  const data = [
    {
      key: "1",
      name: "Hubli",
      state: "Karnataka",
      country: "India",
      english: 70,
      action:<Action/>
    },
    {
      key: "2",
      name: "Mumbai",
      state: "Maharashtra",
      country: "India",
      english: 70,
      action:<Action/>
    },
    {
      key: "3",
      name: "Pune",
      state: "Maharashtra",
      country: "India",
      english: 70,
      action:<Action/>
    },
  ];

  return (
    <div>
        <Card>
          <div className='font-bold'> Add State </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Select 
                label="Country"
                options={coutry}
                name="country"
                value={user.country}
                onChange={handelChangeSelect}
              >
              </Select>
            </div>
            <div className="col-span-1">
              <Input
              label={'Sate'}
              placeHolder = {'Enter State Name'}
              name="state"
              value = {user.state}
              onChange = {handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button 
            title="Add Sate" 
            className={'min-w-[100px]'}
            onClick={handleSubmit}
            />
          </div>
        </Card>

        <Card className={'mt-4'}>
          <div className="font-bold my-3">
            State
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default State