import React from 'react'
import Card from '../../../../components/Card/Card'
import congrats from '../../../../assets/images/jobseeker/exam/congrats.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ROUTES } from '../../../../routes/RouterConfig'

const RoundCompletion = () => {
    const location = useLocation()
    const data = location.state
    console.log(data);
    const navigate = useNavigate()
    const {jobId,step} = useParams()
  return (
    <div className=''>
        <div className='sm:w-[60%] w-[100%] m-auto min-h-screen flex items-center'>
            <Card className={' pb-9'}>
                <img src={congrats} className="w-[200px] mx-auto" alt="" />
                <h4 className='text-2xl text-center'>
                    You have successfully Cleared  {data?.nextStep ? 'This Round' : 'The Examination'} 
                </h4>
                <h3 className='text-center text-xl'>
                    Your Percentage for this round is : {data.percentage}
                </h3>
                <p className='px-4 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel dolores recusandae modi ab, cum accusantium Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel dolores recusandae modi ab, cum accusantium?</p>
                {
                    data.nextStep
                    ?
                    <div className="flex justify-center mt-5">
                        <button
                        onClick={()=>{
                            navigate(ROUTES.JobSeeker.Exam+'/'+jobId+'/'+Number(step)+1)
                        }}
                        className="btn-primary p-2 px-3 m-auto">
                            Go To Next Round
                        </button>
                    </div>
                    :
                    null

                }
            </Card>
        </div>
    </div>
  )
}

export default RoundCompletion