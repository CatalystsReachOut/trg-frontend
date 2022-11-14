import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'

const Country = ({ notify, enterLoading, exitLoading, loadings }) => {

  const [country, setCountry] = useState({
    name:'',
    code:''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setCountry(prev=>({
      ...prev,
      [name]:value
    }))
  }

 

  const columns = [
    {
      title: "Country Name",
      dataIndex: "name",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      }
    },
    {
      title: "Country Code",
      dataIndex: "code",
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

  const [data,setData] = useState([]);
  const [profileData, setProfileData] = useState([])

  const getData = () => {
    enterLoading(2)
    apiProvider.getCountry()
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
    return apiProvider.createCountry(country)
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
    setCountry({
      name:"",
      code:""
    })
  }
  
  useEffect(() => {
    getData();
  }, [])
  

  return (
    <div>
        <Card>
          <div className='font-bold'> Add Country </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
            <div className="col-span-1">
              <Input
              label={'Country'}
              placeHolder = {'Enter Country Name'}
              value = {country?.name}
              name ={'name'}
              onChange = {handleChange}
              />
            </div>
            <div className="col-span-1">
              <Input
              label={'Country Code'}
              placeHolder = {'Enter Country Code'}
              value = {country?.code}
              name ={'code'}
              onChange = {handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button 
            title="Add Country" 
            className={'min-w-[100px]'}
            onClick={handleSubmit}
            />
          </div>
        </Card>

        <Card className={'mt-3'}>
          <div className="font-bold my-3">
            Country
          </div>
          <Table columns={columns} dataSource={data}/>
        </Card>
    </div>
  )
}

export default Country