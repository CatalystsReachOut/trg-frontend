import React from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'

const Department = () => {
  const [name, setName] = useState()

  const handleSubmit = () => {
    console.log('console')
  }

  const columns = [
    {
      title: "Department",
      dataIndex: "name",
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

  const data = [
    {
      key: "1",
      name: "Department 1",
      chinese: 98,
      math: 60,
      english: 70,
      action:<Action/>
    },
    {
      key: "2",
      name: "Department 2",
      chinese: 98,
      math: 66,
      english: 89,
      action:<Action/>
    },
    {
      key: "3",
      name: "Department 3",
      chinese: 98,
      math: 90,
      english: 70,
      action:<Action/>
    },
    {
      key: "4",
      name: "Department 4",
      chinese: 88,
      math: 99,
      english: 89,
      action:<Action/>
    }
  ];

  return (
    <div>
        <Card>
          <div className='font-bold'> Add Department </div>
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
            Department
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default Department