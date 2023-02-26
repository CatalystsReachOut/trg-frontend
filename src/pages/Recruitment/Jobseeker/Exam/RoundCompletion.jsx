import React from 'react'
import Card from '../../../../components/Card/Card'
import congrats from '../../../../assets/images/jobseeker/exam/congrats.png'

const RoundCompletion = () => {
  return (
    <div className=''>
        <div className='sm:w-[60%] w-[100%] m-auto min-h-screen flex items-center'>
            <Card className={' pb-9'}>
                <img src={congrats} className="w-[200px] mx-auto" alt="" />
                <h4 className='text-2xl text-center'>
                    You have successfully Cleared This Round
                </h4>
                <p className='px-4 text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel dolores recusandae modi ab, cum accusantium Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel dolores recusandae modi ab, cum accusantium?</p>
                <div className="flex justify-center mt-5">
                    <button className="btn-primary p-2 px-3 m-auto">
                        Go To Next Round
                    </button>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default RoundCompletion