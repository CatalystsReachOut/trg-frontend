import React, { useState } from 'react'

const Objective = ({ data, answers, setAnswers }) => {
    const thisQuestion = answers.find(s=>s.question==data?._id)
    const [prev, setPrev] = useState(false)
    return (
        <div>
            <div className='text-lg'>
                {data?.question}
            </div>
            <div className="mt-2">
                {
                    data?.options?.map((i, key) => (
                        <div
                            onClick={() => {
                                const arr = answers
                                for (const d of arr) {
                                    if (d?.questionId == data?._id) d.selectedOption = i?.answerBody
                                }
                                console.log(arr);
                                setAnswers(arr)
                                setPrev(prev=>!prev)
                            }}
                            className={`p-2 px-4 w-full border border-secondary rounded-full cursor-pointer mb-2 hover:bg-secondary hover:text-white focus:secondary ${answers.find(s=>(s?.questionId==data?._id))?.selectedOption==i?.answerBody?'bg-secondary text-white':''}`}
                            >
                            {key + 1}. {i?.answerBody}
                        </div>
                    ))
                }
                {/* {
                    data?.options?.map((i,key)=>(
                    <div key={key} className='flex gap-3 items-center'>
                        <input type="radio" style={{ accentColor: 'green' }} name='option' /> {i?.answerBody}
                    </div>
                    ))
                } */}
            </div>
        </div>
    )
}

export default Objective