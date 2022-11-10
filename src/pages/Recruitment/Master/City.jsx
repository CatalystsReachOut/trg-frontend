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

const City = () => {

  const [user, setUser] = useState({
    country:'',
    state:'',
    cityName:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }

  const handelChangeSelect = (e) => {
    const {name, value} = e;
    setUser(prev=>({
      ...prev,
      [name]:value
    }))
  }


  const [country,setCountry] = useState([
    { value: 'India', label: 'India' },

  ])

  const [state,setState] = useState([
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Maharastra', label: 'Maharastra' },
    { value: 'Goa', label: 'Goa' }
  ])

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
        multiple:1
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
      dataIndex: "action"
    },
  ];

  const [data,setData] = useState([
    
  ]);

  const getAllData = () =>{
    const [data1,data2] = Promise.all([
      apiProvider.getCountry()
      .then(res=>{
        console.log(res)
        const arr = []
        for (const i of res.data) {
          const obj= {
            value:i._id,
            label:i.countryName
          }
          arr.push(obj)
        }
        setCountry(arr)
      })
      .catch(err=>{
        console.log(err)
      }),
      apiProvider.getState()
      .then(res=>{
        console.log(res)
        const arr = []
        for (const i of res.data) {
          const obj= {
            value:i._id,
            label:i.stateName,
            actio:<Action/>
          }
          arr.push(obj)
        }
        setState(arr)
      })
      .catch(err=>{
        console.log(err)
      }),
    ])
  }

  const getData =()=>{
    apiProvider.getCity()
    .then(res=>{
      console.log(res)
      const arr = []
      for (const i of res.data) {
        const obj = {
          key:i._id,
          cityName:i.cityName,
          state:i.state,
          country:i.country
        }
        arr.push(obj)
      }
      setData(arr)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const handleSubmit =()=>{
    apiProvider.createCity(user)
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  useEffect(()=>{
    getData();
    getAllData();
  },[])


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
                value={user.country}
                onChange={handelChangeSelect}
              >
              </Select>
            </div>
            <div className="col-span-1">
              <Select 
                label="State"
                options={state}
                name="state"
                value={user.state}
                onChange={handelChangeSelect}
              >
              </Select>
            </div>
            <div className="col-span-1">
              <Input
              label={'City'}
              placeHolder = {'Enter City Name'}
              name="cityName"
              value = {user.cityName}
              onChange = {handleChange}
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
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default City