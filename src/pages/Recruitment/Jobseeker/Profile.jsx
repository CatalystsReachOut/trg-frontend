import React from 'react'
import { AiOutlineDownload, AiOutlineMessage, AiOutlinePhone } from 'react-icons/ai'
import { IoDocumentOutline, IoDocumentsOutline, IoLocationOutline } from 'react-icons/io5'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Card from '../../../components/Card/Card'
import sampleImage from './../../../assets/images/recruitment/sample.png'
const Profile = () => {
    return (
        <div>
            <Card className='sm:px-7 px-3'>
                <div className="grid grid-cols-3 gap-6">
                    <div className="sm:col-span-2 col-span-3">
                        <div className="flex items-center justify-between">
                            <div className='flex items-center gap-5'>
                                <div className='w-[150px] aspect-square flex items-center justify-center overflow-hidden rounded-full border border-2 border-secondary'>
                                    <img src={sampleImage} alt="" className='max-w-full ' />
                                </div>
                                <div>
                                    <div className='font-bold text-2xl'>Anand Doddamani</div>
                                    <div className='text-fourth text-xs'>TRG ID: 52345435243</div>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 cursor-pointer'><IoDocumentOutline className='text-xl' />CV</div>
                        </div>
                        <div className='flex flex-col gap-2 mt-6 text-gray-500'>
                            <div className="flex items-center gap-6"><FiMail /> anand@gmail.com</div>
                            <div className="flex items-center gap-6"><FiPhone /> +91 8904079022</div>
                            <div className="flex items-center gap-6"><FiMapPin /> Mumbai India</div>
                        </div>
                    </div>
                    <div className="sm:col-span-1 col-span-3">
                        <div className='text-lg font-bold'>Skills</div>
                        <div className='my-3 bg-primary h-[2px]'></div>
                        <ul className='list-none flex flex-col gap-3'>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                        </ul>
                    </div>
                    <div className="sm:col-span-2 col-span-3 text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas porro laborum odit magnam, quos hic perspiciatis. Suscipit dicta magnam doloremque amet provident, earum recusandae et quos aliquam, rerum necessitatibus labore aspernatur. Quibusdam, odio quisquam corrupti laboriosam, itaque error dolore vitae rerum hic soluta minima distinctio nisi nihil vel et beatae.
                    </div>
                    <div className="sm:col-span-2 col-span-3 mt-3">
                        <div className='text-lg font-bold'>Work Experience</div>
                        <div className='my-3 bg-primary h-[2px]'></div>
                        <div>
                            <div className='text-base text-gray-500'>SDE</div>
                            <div className='text-lg'>Amazon</div>
                            <div className='text-lg'>2016, March - Present</div>
                        </div>
                    </div>
                    <div className="sm:col-span-2 col-span-3 mt-3">
                        <div className='text-lg font-bold'>Education</div>
                        <div className='my-3 bg-primary h-[2px]'></div>
                        <div>
                            <div className='text-base text-gray-500'>Engineering</div>
                            <div className='text-lg'>XYZ University</div>
                            <div className='text-lg'>2016, March - Present</div>
                        </div>
                    </div>
                    <div className="sm:col-span-2 col-span-3 mt-3">
                        <div className='text-lg font-bold'>Awards and Accomplishment</div>
                        <div className='my-3 bg-primary h-[2px]'></div>
                        <div>
                            {/* <div className='text-base text-gray-500'>Engineering</div>
                            <div className='text-lg'>XYZ University</div>
                            <div className='text-lg'>2016, March - Present</div> */}
                        </div>
                    </div>
                    <div className="sm:col-span-2 col-span-3 mt-3">
                        <div className='text-lg font-bold'>Certificates</div>
                        <div className='my-3 bg-primary h-[2px]'></div>
                        <div>
                            {/* <div className='text-base text-gray-500'>Engineering</div>
                            <div className='text-lg'>XYZ University</div>
                            <div className='text-lg'>2016, March - Present</div> */}
                        </div>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default Profile