import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../../components/Card/Card'
import { ROUTES } from '../../../routes/RouterConfig'
import * as apiProveder from './../../../services/api/jobseeker'
import Objective from './Exam/Objective'
import Subjective from './Exam/Subjective'

const Exam = ({notify}) => {
  const { jobId, step } = useParams();

  const navigate = useNavigate()

  const [jobDetails, setJobDetails] = useState()

  const [data, setData] = useState({})
  const [answers, setAnswers] = useState({})

  const getData = async () => {
    apiProveder.getInterViewQuestions(jobId)
      .then(res => {
        console.log(res);
        setJobDetails(res.data)
        setData(res.data[step])
        setAnswers(
          res.data[step]?.questions?.map(s=>{
            return{
              questionId:s?._id,
              selectedOption:''
            }
          })
        )
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSubmit = async() => {
    const obj = {
      totalMarks:data.totalMarks,
      roundName:data.round.name,
      roundId:data.round._id,
      answers:answers
    }
    await apiProveder.UpdateJobApplication(data.applicationId, obj)
      .then(res=>{
        console.log(res);
        if(res.data.status=="PASSED"&&Number(step)+1<jobDetails?.length){
          const obj = {
            percentage:res?.data?.percentage,
            result:res?.data?.status,
            nextStep:true
          }
          navigate(ROUTES.JobSeeker.Exam+'/'+jobId+'/'+Number(step)+'/'+Number(step),{state:obj})
        }
        if(res?.data?.status=="PASSED"&&Number(step)+1==jobDetails?.length){
          const obj = {
            percentage:res?.data?.percentage,
            result:res?.data?.status,
            nextStep:false
          }
          navigate(ROUTES.JobSeeker.Exam+'/'+jobId+'/'+Number(step)+'/'+Number(step),{state:obj})
        }
        if(res?.data?.status!="PASSED"){
          // notify("danger",res.result)
        }
        notify("success",res?.data?.status)
      })
      .catch(err=>{
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

            <div className="mt-6 flex">
              <button 
              onClick={handleSubmit}
              className="m-auto btn-primary p-3 px-4">
                Submit Exam
              </button>
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
                      <Subjective data={i} answers={answers} setAnswers={setAnswers}/>
                    </div>
                    :
                    <div className='w-[95%]'>
                      <Objective data={i} answers={answers} setAnswers={setAnswers}   />
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