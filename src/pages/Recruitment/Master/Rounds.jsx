import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import { BsThreeDots } from "react-icons/bs"
import { Switch, Dropdown } from 'antd';


const Rounds = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [round, setRound] = useState({
    name: ""
  })


  const [edit, setEdit] = useState(false)

  const handleMenuClick = (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      setEdit(true)
      setRound(data.find(item => item._id === key[1]))

    } else {  // delete
      // setBusiness(data.find(item => item._id === key[1]))
    }
  };


  const columns = [
    {
      title: "Round",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id) => (<Dropdown
      className='cursor-pointer'
        menu={{ items: [{ label: 'Edit', key: `edit` + "_" + id }, { label: 'Delete', key: "delete" + "_" + id }], onClick: handleMenuClick }}
        trigger={['click']}
      >
        <BsThreeDots />
      </Dropdown>)
    }
  ];


  const [profileData, setProfileData] = useState([])



  const [data, setData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRound(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDelete = (id) => {
    console.log(id);
  }

  const handleEdit = (id) => {
    console.log(id);
  }


  const getData = () => {
    // enterLoading(2)
    apiProvider.getRound()
      .then(res => {

        if (res.isSuccess) {
          const arr = res?.data?.map((i, key) => ({
            ...i,
            action: <Action
              handleClickDelete={handleDelete(i?.id)}
              handleClickEdit={handleEdit(i)}
            />
          }))
          setData(arr)
        }
        // return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        // return exitLoading(2)

      })
  }

  const handleSubmit = () => {

    // enterLoading(1)
    return apiProvider.createRound(round)
      .then(res => {
        // exitLoading(1)
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
        // exitLoading(1)
        return notify('error', err.message);
      })
  }

  const clearData = () => {
    setRound({
      name: '',
    })
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <Card>
        <div className='font-bold'> Add Round </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Input
              label={'Round Name'}
              placeHolder={'Enter Round Name'}
              name="name"
              value={round?.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          {
            edit ?
              <Button
                title="Update Round"
                className={'min-w-[100px]'}
                onClick={() => console.log(round)}
                loading={loadings[1]}
              /> : <Button
                title="Add Round"
                className={'min-w-[100px]'}
                onClick={() => handleSubmit(round)}
                loading={loadings[1]}
              />}
        </div>
      </Card>

      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          Rounds
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Rounds