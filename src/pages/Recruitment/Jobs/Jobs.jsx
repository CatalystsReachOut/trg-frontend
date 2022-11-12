import React from 'react'
import { Select } from 'antd';
import Card from '../../../components/Card/Card'
import {TbDots} from 'react-icons/tb'

const Jobs = () => {

    const handleChange = (value) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
      };
      
  return (<>
    <Card className="px-[2rem] pt-[2rem] pb-[5.5rem]">
         <div className='flex items-center justify-between'>
             <h1 className='text-Medium+/Title/Small '>Engineering Manager <span className='text-Medium+/SubTitle/Small text-fourth ml-[1.375rem] text-center'>Management-Catalysts</span></h1>
             
             <div className='flex items-center'>
                 <Select className='mr-[2.13rem]'
                     labelInValue
                     defaultValue={{
                       value: 'closed',
                       label: 'Closed',
                     }}
                     style={{
                       width: 120,
                     }}
                     onChange={handleChange}
                     options={[
                       {
                         value: 'edit',
                         label: 'Edit',
                       },
                       {
                         value: 'duplicate',
                         label: 'Duplicate',
                       },
                       {
                         value: 'view',
                         label: 'View',
                       },
                     ]} />
                 
                     <TbDots className='text-[2rem]'/>
             </div>
         </div>

<div className="flex items-center justify-between mt-[1.58rem]">
        <p className='text-Medium+/SubTitle/Small-Strong'>10 <span className='text-Medium+/SubLabel/Small text-fourth'>candidates</span></p>
        <p className='text-Medium+/Label/Small leading-[1.125rem] text-fourth'>Created 3y ago</p>
</div>

    </Card>
  </>
  )
}

export default Jobs