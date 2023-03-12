import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../../components/Card/Card'
import { ROUTES } from '../../../routes/RouterConfig'
import * as apiProveder from './../../../services/api/jobseeker'
import Objective from './Exam/Objective'
import Subjective from './Exam/Subjective'
import { Modal } from 'antd'

import Button from '../../../components/Button/Button'

const Exam = ({ notify }) => {
  const { jobId, step } = useParams();

  const navigate = useNavigate()

  const [jobDetails, setJobDetails] = useState()

  const [data, setData] = useState({})
  const [answers, setAnswers] = useState({})

  const [examResult, setExamResult] = useState({})

  const getData = async () => {
    apiProveder.getInterViewQuestions(jobId)
      .then(res => {
        console.log(res);
        setJobDetails(res.data)
        setData(res.data[step])
        setAnswers(
          res.data[step]?.questions?.map(s => {
            return {
              questionId: s?._id,
              selectedOption: ''
            }
          })
        )
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleSubmit = async () => {
    const obj = {
      totalMarks: data.totalMarks,
      roundName: data.round.name,
      roundId: data.round._id,
      step: step
    }


    if (answers) {
      const newAns = answers.filter(item => {
        if (item.selectedOption !== '' || item.selectedOption !== '') {
          return item
        }
      })

      obj.answers = newAns
    }


    await apiProveder.UpdateJobApplication(data.applicationId, obj)
      .then(res => {
        console.log(res);
        setExamResult(res.data)
        showModal()
        return
        if (res.data.status == "PASSED" && Number(step) + 1 < jobDetails?.length) {
          const obj = {
            percentage: res?.data?.percentage,
            result: res?.data?.status,
            nextStep: true
          }
          navigate(ROUTES.JobSeeker.Exam + '/' + jobId + '/' + Number(step) + '/' + Number(step), { state: obj })
        }
        if (res?.data?.status == "PASSED" && Number(step) + 1 == jobDetails?.length) {
          const obj = {
            percentage: res?.data?.percentage,
            result: res?.data?.status,
            nextStep: false
          }
          navigate(ROUTES.JobSeeker.Exam + '/' + jobId + '/' + Number(step) + '/' + Number(step), { state: obj })
        }
        if (res?.data?.status != "PASSED") {
          // notify("danger",res.result)
        }
        notify("success", res?.data?.status)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const [countdown, setCountdown] = useState(3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countdown => countdown - 1);
    }, 1000);

    // Clean up the interval when the countdown reaches zero
    if (countdown === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [countdown]); // Depend on countdown to update the UI

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModal2Open, setIsModal2Open] = useState(false);


  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        <div className="sm:col-span-1 col-span-5">
          <Modal width={800} title="Exam Details" open={isModalOpen} footer={null} onCancel={handleCancel}>
            <>

              <h6 className='text-center font-semibold text-[20px]'>Round Name: {data?.round?.name}</h6>
              <div className="grid mt-[30px] grid-cols-2 gap-4">
                <div className="col-span-2">
                  <span className='font-semibold text-[16px]'>Status :</span> {examResult?.status == 'PASSED' ? <span className='text-green-500'>Passed</span> : <span className='text-red-500'>Failed</span>}
                </div>
                <div className="col-span-2">
                  <span className='font-semibold text-[16px]'>Total Marks :</span> {data?.totalMarks}
                </div>
                <div className="col-span-2">
                  <span className='font-semibold text-[16px]'>Marks Obtained :</span> {examResult?.marksObtained}
                </div>
                <div className="col-span-2">
                  <span className='font-semibold text-[16px]'>Percentage :</span> {examResult?.percentage}
                </div>
              </div>

              <div className='mt-[30px] justify-center flex gap-3 py-3'>
                <Button title="Back to Job Details" className=" font-semibold" onClick={() => navigate('/seeker/job/' + jobId)} />
                {/* <Button type='2' title="Close" onClick={handleCancel} className="w-[100px] font-semibold" /> */}
              </div>

            </>

          </Modal>

          <Card>


            <h4 className="text-2xl text-secondary capitalize">
              {/* {
                Number(step) + 1 + '.'
              } */}
              {
                data?.round?.name
              }
            </h4>
            <h3 className='mt-[20px]'>
             Total Marks: <span className='text-secondary'>{data.totalMarks}</span> 
            </h3>
            <div className="mt-3 p-3">
              <div className="flex flex-wrap gap-3">
                <div className="col-span-1 flex flex-col items-center gap-2">
                  <div className='h-[50px] w-[50px] border flex items-center justify-center'>
                    {hours}
                  </div>
                  HH
                </div>
                <div className="col-span-1 flex flex-col items-center gap-2">
                  <div className='h-[50px] w-[50px] border flex items-center justify-center'>
                    {minutes}

                  </div>
                  MM
                </div>
                <div className="col-span-1 flex flex-col items-center gap-2">
                  <div className='h-[50px] w-[50px] border flex items-center justify-center'>
                    {seconds}
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
                    {key + 1}.
                  </div>
                  {
                    i?.questionType == 'Subjective'
                      ?
                      <div className='w-[95%]'>
                        <Subjective data={i} answers={answers} setAnswers={setAnswers} />
                      </div>
                      :
                      <div className='w-[95%]'>
                        <Objective data={i} answers={answers} setAnswers={setAnswers} />
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