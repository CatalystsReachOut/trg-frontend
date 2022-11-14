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

const City = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [city, setCity] = useState({
    country: '',
    state: '',
    cityName: ''
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


  const [country, setCountry] = useState([])

  const [state, setState] = useState([])

  const columns = [
    {
      title: "City",
      dataIndex: "cityName"
    },
    {
      title: "State",
      dataIndex: "state",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
    },
    {
      title: "Action",
      dataIndex: "status"
    },
  ];

  const [data, setData] = useState([

  ]);



  const getData = () => {
    enterLoading(2)
    apiProvider.getCity()
      .then(res => {
        console.log(res)
        const arr = []
        for (const i of res.data) {
          const obj = {
            key: i._id,
            cityName: i.cityName,
            state: i.state,
            country: i.country
          }
          arr.push(obj)
        }
        setData(arr)
        return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        exitLoading(2)
      })
  }

  const getAllData = async () => {
    const [data1, data2] = await Promise.all([
      apiProvider.getCountry()
        .then(res => {
          const arr = res.data?.map(data => ({
            value: data._id,
            label: data.countryName
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
            label: data.title
          }))
          return arr
        })
        .catch(err => {
          console.log(err)
        }),
    ])

    setCountry(data1);
    setState(data2)

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
      cityName: ''
    })
  }

  useEffect(() => {
    getData();
    getAllData()
  }, [])


  return (
    <div>
      <Card>
        <div className='font-bold'> Add City </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Select
              label="Country"
              options={country}
              name="country"
              value={city?.country}
              onChange={handelChangeSelect}
            >
            </Select>
          </div>
          <div className="col-span-1">
            <Select
              label="State"
              options={state}
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
              name="cityName"
              value={city.cityName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
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
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default City