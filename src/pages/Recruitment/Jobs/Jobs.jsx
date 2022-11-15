import React, { useState, useEffect } from 'react'
import * as apiProvider from '../../../services/api/recruitment'
import JobComponent from "../../../components/Jobs/Jobs"

const Jobs = () => {

  const [data, setData] = useState()

  const getData = () => {
    apiProvider.getJob()
      .then(res => {
        if (res.isSuccess) {
          setData(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }


  useEffect(() => {
    getData();
  }, [])




  return (<>
    {
      data && data.map((item, key) => {

        return <JobComponent data={item} />
      })
    }

  </>
  )
}

export default Jobs