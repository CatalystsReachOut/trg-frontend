import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import { ROUTES } from '../../../routes/RouterConfig'
import * as apiProvider from '../../../services/api/recruitment'
// import Button from '../../../components/Button/Button'
import { getColumnSearchProps } from '../../../helpers/TableSearch'
import { Dropdown, Switch } from 'antd'
import { BsThreeDots } from 'react-icons/bs'


const City = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [user, setUser] = useState({
    country: '',
    state: '',
    name: ''
  })

  const [edit, setEdit] = useState(false)

  const handleMenuClick = (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      setEdit(true)
      setUser(data.find(item => item._id === key[1]))

    } else {  // delete
      handleDelete(key[1], "DELETED")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handelChangeSelect = (e) => {
    const { name, value } = e;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const [countryOptions, setCountryOptions] = useState([])

  const [stateOptions, setStateOptions] = useState([])

  const columns = [
    {
      title: "Sl no.",
      dataIndex: "index",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      },
      render: (value, item, index) => index + 1
    },
    {
      title: "City",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      },
      ...getColumnSearchProps('name')
    },
    {
      title: "State",
      dataIndex: "state",
      filters: stateOptions?.map((i, key) => {
        return {
          text: i?.label,
          value: i?.value
        }
      }),
      onFilter: (value, record) => record.state.indexOf(value) === 0,
      render: (_, { state }) => (<> {stateOptions.find(item => item.value === state)?.label} </>)

    },
    {
      title: "Country",
      dataIndex: "country",
      filters: countryOptions?.map((i, key) => {
        return {
          text: i?.label,
          value: i?.value
        }
      }),
      onFilter: (value, record) => record.country.indexOf(value) === 0,
      render: (_, { country }) => (<> {countryOptions.find(item => item.value === country)?.label} </>)

    },
    {
      title: "Status",
      dataIndex: "_id",
      render: (id, d) => (
        <Switch
          className='bg-[gray]'
          checked={d?.status == "ACTIVE" ? true : false}
          onChange={(e) => {
            if (e) handleDelete(id, "ACTIVE")
            else handleDelete(id, "INACTIVE")
          }} />
      )
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

  const [data, setData] = useState([

  ]);



  const getData = () => {
    apiProvider.getCity()
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getAllData = async () => {
    const [data1, data2] = await Promise.all([
      apiProvider.getCountry()
        .then(res => {
          const arr = res.data?.map(data => ({
            value: data._id,
            label: data.name
          }))
          return arr
        })
        .catch(err => {
          console.log(err)
        }),
      apiProvider.getState()
        .then(res => {
          const arr = res.data?.map(data => ({
            value: data._id,
            label: data.name
          }))
          return arr
        })
        .catch(err => {
          console.log(err)
        })

    ])

    setCountryOptions(data1);
    setStateOptions(data2)

  }

  const handleSubmit = () => {
    enterLoading(1)
    apiProvider.createCity(user)
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

  const handleEdit = () => {
    // enterLoading(1)
    return apiProvider.editCity(user?._id, user)
      .then(res => {
        if (res.isSuccess) {
          clearData()
          getData()
          setEdit(false)
          return notify('success', 'added success');
        } else {
          setEdit(false)
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)

        return notify('error', err.message);
      })
  }

  const handleDelete = (id, status) => {
    return apiProvider.editCity(id, { status: status })
      .then(res => {
        if (res.isSuccess) {
          clearData()
          getData()
          setEdit(false)
          return notify('success', 'added success');
        } else {
          setEdit(false)
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)

        return notify('error', err.message);
      })
  }




  const clearData = () => {
    setUser({
      country: null,
      state: null,
      name: ''
    })
  }

  useEffect(() => {
    getAllData()
    getData();
  }, [])




  const navigate = useNavigate();


  const changeRoute = (id) => {
    switch (id?.value) {
      case 'country':
        navigate(ROUTES.Recruitment.Master.Country);
        break;
      case 'state':
        navigate(ROUTES.Recruitment.Master.State);
        break;

    }
  }

  const selectData = [
    {
      label: 'Country',
      value: 'country'
    },
    {
      label: 'State',
      value: 'state'
    },
    {
      label: 'City',
      value: 'city'
    }
  ]

  return (
    <div>

      <Card className={'mb-[20px]'}>
        <Select
          className="w-[30%]"
          label="Select"
          options={selectData}
          name="Select"
          value={"city"}
          onChange={(e) => changeRoute(e)}
        >
        </Select>

      </Card>
      <Card>
        <div className='font-bold'> Add City </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Select
              label="Country"
              options={countryOptions}
              name="country"
              value={user?.country}
              onChange={handelChangeSelect}
            >
            </Select>
          </div>
          <div className="col-span-1">
            <Select
              label="State"
              options={stateOptions}
              name="state"
              value={user?.state}
              onChange={handelChangeSelect}
            >
            </Select>
          </div>
          <div className="col-span-1">
            <Input
              label={'City'}
              placeHolder={'Enter City Name'}
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            loading={loadings[1]}
            title={edit ? "Update City" : "Add City"}
            className={'min-w-[100px]'}
            onClick={() => { edit ? handleEdit() : handleSubmit() }}
          />
        </div>
      </Card>

      <Card className={'mt-4'}>
        <div className="font-bold my-3">
          City
        </div>
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default City