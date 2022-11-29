import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
// import Button from '../../../components/Button/Button'


const City = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [city, setCity] = useState({
    country: '',
    state: '',
    name: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handelChangeSelect = (e) => {
    const { name, value } = e;
    setCity(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const [countryOptions, setCountryOptions] = useState([])

  const [stateOptions, setStateOptions] = useState([])

  const columns = [
    {
      title: "City",
      dataIndex: "name"
    },
    {
      title: "State",
      dataIndex: "state",
      render: (_, { state }) => (<> {stateOptions.find(item => item.value === state)?.label} </>)

    },
    {
      title: "Country",
      dataIndex: "country",
      render: (_, { country }) => (<> {countryOptions.find(item => item.value === country)?.label} </>)

    },
    {
      title: "Action",
      dataIndex: "status"
    },
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
    const [data1] = await Promise.all([
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
        })
    ])

    setCountryOptions(data1);

  }

  const getStateOpt = async (id) => {
    apiProvider.getState(`?country=${id}`)
      .then(res => {
        const arr = res.data?.map(data => ({
          value: data._id,
          label: data.name
        }))
        setStateOptions(arr)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    enterLoading(1)
    apiProvider.createCity(city)
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
    setCity({
      country: '',
      state: '',
      name: ''
    })
  }

  useEffect(() => {
    getAllData()
    getData();
  }, [])

  useEffect(() => {
    if (city?.country) {
      getStateOpt(city?.country)
    }
  }, [city?.country])

  return (
    <div>
      <Card>
        <div className='font-bold'> Add City </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Select
              label="Country"
              options={countryOptions}
              name="country"
              value={city?.country}
              onChange={handelChangeSelect}
            >
            </Select>
          </div>
          <div className="col-span-1">
            <Select
              label="State"
              options={stateOptions}
              name="state"
              value={city?.state}
              onChange={handelChangeSelect}
            >
            </Select>
          </div>
          <div className="col-span-1">
            <Input
              label={'City'}
              placeHolder={'Enter City Name'}
              name="name"
              value={city.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            loading={loadings[1]}
            title="Add City"
            className={'min-w-[100px]'}
            onClick={handleSubmit}
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