import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../../components/Card/Card'
import * as apiProveder from './../../../services/api/jobseeker'
import Objective from './Exam/Objective'
import Subjective from './Exam/Subjective'

const Exam = () => {
  const { jobId, step } = useParams();

  const [data, setData] = useState({})

  const getData = async () => {
    apiProveder.getInterViewQuestions(jobId)
      .then(res => {
        console.log(res);
        setData(res.data[step])
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        <div className="sm:col-span-1 col-span-5">

          <Card>


            <h4 className="text-2xl text-secondary">
            {
              Number(step) + 1 +'.'
            }
              {
                data?.round?.name
              }
            </h4>
            <div className="mt-3 p-3">
              <div className="flex flex-wrap gap-3">
                <div className="col-span-1 flex flex-col items-center gap-2">
                  <div className='h-[50px] w-[50px] border flex items-center justify-center'>
                    01
                  </div>
                  HH
                </div>
                <div className="col-span-1 flex flex-col items-center gap-2">
                  <div className='h-[50px] w-[50px] border flex items-center justify-center'>
                    45
                  </div>
                  MM
                </div>
                <div className="col-span-1 flex flex-col items-center gap-2">
                  <div className='h-[50px] w-[50px] border flex items-center justify-center'>
                    32
                  </div>
                  SS
                </div>
              </div>

            </div>
          </Card>
        </div>
        <div className="sm:col-span-4 col-span-5">
          <Card>
            {
              data?.questions?.map((i, key) => (
                <div className='flex mb-[50px]'>
                  <div className='w-[5%] text-lg'>
                    {key +1}.
                  </div>
                  {
                    i?.questionType=='Subjective'
                    ?
                    <div className='w-[95%]'>
                      <Subjective data={i} />
                    </div>
                    :
                    <div className='w-[95%]'>
                      <Objective data={i} />
                    </div>
                  }
                </div>
              ))
            }
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Exam