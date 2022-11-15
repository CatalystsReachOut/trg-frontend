import React from 'react'
import BackButton from '../../../components/Button/BackButton'
import Card from '../../../components/Card/Card'
import sampleImage from './../../../assets/images/recruitment/sample.png'
import Upload from '../../../components/Input/Upload'
import Input from '../../../components/Input/Input'
import TextArea from '../../../components/Input/TextArea'
import { FiPlusCircle, FiX } from 'react-icons/fi'
import AddBtn from '../../../components/Add/Add'

const Add = () => {
    const skills = [
        'HTML',
        'CSS',
        'JavaScript',
        'TypeScript',
        'React.Js',
        'Node.js'
    ]
    return (
        <div>
            <Card className="sm:px-6 px-3">
                <div className="flex sm:gap-4 gap-3 items-center">
                    <BackButton /> <div className='font-bold text-2xl'>My Resume</div>
                </div>
                <div className="mt-6">
                    <div className='text-base font-medium my-3'>Personal Details</div>
                    <div className='mb-2'>CV</div>
                    <Upload />
                </div>
                <div className="mt-5 flex items-center gap-5">
                    <div className='w-[150px] aspect-square flex items-center justify-center overflow-hidden rounded-full border border-2 border-secondary'>
                        <img src={sampleImage} alt="" className='max-w-full ' />
                    </div>
                    <Upload content={'Upload Picture'} className={'px-6'} />
                </div>
                <div className="mt-5">
                    <div className="grid sm:grid-cols-2 sm:gap-6 gap-3 gird-cols-1">
                        <div className="col-span-1">
                            <Input
                                label="First Name"
                                required={1}
                                placeHolder="Enter First Name"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Last Name"
                                required={1}
                                placeHolder="Enter Last Name"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Email"
                                required={1}
                                placeHolder="Enter Email"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Phone"
                                required={1}
                                placeHolder="Enter Phone"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                                label="Address"
                                required={1}
                                placeHolder="Enter Address"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="text-base font-medium">Professinal Summary</div>
                    <div className='text-xs text-gray-500'>Write 2-4 short and energetic sentences to interest the reader. Mention your role, experience and most importantly- your biggest achievement, best qualities and skills.
                    <TextArea
                    label=''
                    className="px-0"
                    inputClassName="px-0"
                    placeHolder="Write about yourself"
                    />
                    </div>
                </div>
                <div className="mt-5">
                    <div className='text-base font-medium'>Total Experience</div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                        <div className="col-span-1">
                            <Input
                            label="Years"
                            required={1}
                            placeHolder="Ex: 5"
                            />
                        </div>
                        <div className="col-span-1">
                            <Input
                            label="Months"
                            required={1}
                            placeHolder="Ex: 10"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className='text-base font-medium'>Education</div>
                    <div className='text-xs text-gray-500'>
                        A varied education on your resume sums up the value that your learnings and background will bring to job.
                    </div>
                    <button className='flex items-center gap-2 text-secondary mt-3'>
                        <FiPlusCircle/> Add Education
                    </button>
                </div>
                <div className="mt-8">
                    <div className='text-base font-medium'>Employment History</div>
                    <div className='text-xs text-gray-500'>
                    Show your relevant experience (last 10 years). Use bullet points to note your achievement
                    </div>
                    <button className='flex items-center gap-2 text-secondary mt-3'>
                        <FiPlusCircle/> Add Employment History
                    </button>
                </div>
                <div className="mt-8">
                    <div className='text-base font-medium'>Certificates</div>
                    <div className='text-xs text-gray-500'>
                        Show your relevant experience (last 10 years). Use bullet points to note your achievements                    
                    </div>
                    <button className='flex items-center gap-2 text-secondary mt-3'>
                        <FiPlusCircle/> Add Certificates
                    </button>
                </div>
                <div className="mt-8">
                    <div className='text-base font-medium'>Awards and Accomplishment</div>
                    <div className='text-xs text-gray-500'>
                        Show your relevant experience (last 10 years). Use bullet points to note your achievements                    
                    </div>
                    <AddBtn/>
                </div>
                <div className="mt-8">
                    <div className='text-base font-medium'>Skills</div>
                    <div className='text-xs text-gray-500'>
                        Choose 5 of the most important skills to show your talents! Make sure they match the keywords of the job listing if applying via an online system.                    
                    </div>
                    <div className='mt-2 flex flex-wrap gap-3'>
                        {
                            skills?.map((i,key)=>(
                                <div className='bg-secondary flex items-center text-white p-1 px-2 rounded-full'>{i} <FiX className='cursor-pointer'/></div>
                            ))
                        }
                    </div>
                    <button className='flex items-center gap-2 text-secondary mt-3'>
                        <FiPlusCircle/> Add Skill
                    </button>
                </div>
            </Card>
        </div>
    )
}

export default Add