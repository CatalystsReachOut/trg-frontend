import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import Select from '../../../components/Select/Select'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import { ROUTES } from '../../../routes/RouterConfig'
import { useNavigate } from 'react-router-dom'

const State = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [state, setState] = useState({
    country: '',
    name: ''
  })

  const [countryData, setCountryData] = useState([])

  const columns = [
    {
      title: "State",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (_, { country }) => (<> {countryData.find(item => item.value === country)?.label} </>)
    },
    {
      title: "Action",
      dataIndex: "status"
    },
  ];

  const [data, setData] = useState([])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handelChangeSelect = (e) => {
    const { name, value } = e;
    console.log(e)
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getData = () => {
    // enterLoading(2)
    apiProvider.getState()
      .then(res => {
        if (res.isSuccess) {
          const arr = res.data
          setData(arr)
        }
        // return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        // return exitLoading(2)

      })
  }

  const getAllData = async () => {
    // enterLoading(2)
    await apiProvider.getCountry()
      .then(res => {
        const arr = res.data?.map(i => ({
          label: i?.name,
          value: i?._id
        }))
        setCountryData(arr)
      })
      .catch(err => {
        console.log(err)
      })
    // exitLoading(2)
  }

  const handleSubmit = () => {

    enterLoading(1)
    return apiProvider.createState(state)
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
    setState({
      country: '',
      name: ''
    })
  }


  useEffect(() => {
    getAllData();
    getData();
  }, [])


  useEffect(() => {
    getData();
  }, [])

  const navigate = useNavigate();

  const changeRoute = (id) => {
    switch (id?.value) {
      case 'country':
        navigate(ROUTES.Recruitment.Master.Country);
        break;
      case 'city':
        navigate(ROUTES.Recruitment.Master.City);
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
          value={"state"}
          onChange={(e) => changeRoute(e)}
        >
        </Select>

      </Card>

      <Card>
        <div className='font-bold'> Add State </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Select
              label="Country"
              options={countryData}
              name="country"
              value={state?.country}
              onChange={handelChangeSelect}
            >
            </Select>
          </div>
          <div className="col-span-1">
            <Input
              label={'State'}
              placeHolder={'Enter State Name'}
              name="name"
              value={state?.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            loading={loadings[1]}
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
        <Table loading={loadings[2]} columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default State