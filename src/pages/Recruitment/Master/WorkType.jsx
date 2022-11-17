import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const WorkShift = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [user, setUser] = useState({
    title: ""
  })
  const columns = [
    {
      title: "WorkType",
      dataIndex: "title",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },
    {
      title: "Action",
      dataIndex: "status"
    },
  ];




  const [profileData, setProfileData] = useState([])



  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const getData = () => {
    enterLoading(2)
    apiProvider.getWorkType()
      .then(res => {

        if (res.isSuccess) {
          setData(res.data)
          const arr = res.data.map(data => ({
            value: data._id,
            label: data.title
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
    return apiProvider.createWorkType(user)
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
      title: '',
    })
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <Card>
        <div className='font-bold'> Add Work Type </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Input
              label={'Work Type'}
              placeHolder={'Enter Work Type'}
              name="title"
              value={user?.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            title="Add Work Shift"
            className={'min-w-[100px]'}
            onClick={() => handleSubmit(user)}
            loading={loadings[1]}
          />
        </div>
      </Card>

      <Card className={'mt-3'}>
        <div className="font-bold my-3">
            Work Type
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default WorkShift