import React from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'

const State = () => {
  const [name, setName] = useState()

  const handleSubmit = () => {
    console.log('console')
  }

  const columns = [
    {
      title: "Round",
      dataIndex: "name"
    },
    {
      title: "Chinese Score",
      dataIndex: "chinese",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Math Score",
      dataIndex: "math",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      }
    },
    {
      title: "English Score",
      dataIndex: "english",
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

  return (
    <div>
        <Card>
          <div className='font-bold'> Add Round </div>
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
            Rounds
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default State