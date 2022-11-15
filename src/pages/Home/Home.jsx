import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { ROUTES } from '../../routes/RouterConfig'
import ReactApexChart from "react-apexcharts";
import { TbUser } from 'react-icons/tb';
import {RiUserSearchLine} from 'react-icons/ri'
import {BsBriefcase} from 'react-icons/bs'
import {FiUsers} from 'react-icons/fi'

const Home = () => {

    const navigate = useNavigate()

    const changeDir = (dir) =>{
        navigate(dir)
    }

    const option1 = {
          
      series: [75],
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
             hollow: {
              margin: 0,
              size: '70%',
              background: '#fff',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24
              }
            },
            track: {
              background: '#fff',
              strokeWidth: '67%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35
              }
            },
        
            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: '#888',
                fontSize: '17px'
              },
              value: {
                formatter: function(val) {
                  return parseInt(val);
                },
                color: '#111',
                fontSize: '36px',
                show: true,
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#ABE5A1'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: 'round'
        },
        labels: ['Valuation'],
      },
    
    
    };

  return (
    <div className='Home'>
      <div className=" px-2 text-lg my-3">
        Dashboard
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <Card className='px-6'>
            <div>
              <div className='flex justify-between font-bold'>
                <FiUsers className='text-2xl '/> Total Users
              </div>
              <div className="text-end font-medium text-3xl mt-3">
                53
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className='px-6'>
            <div>
              <div className='flex justify-between font-bold'>
                <BsBriefcase className='text-2xl '/> Total Jobs
              </div>
              <div className="text-end font-medium text-3xl mt-3">
                3
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className='px-6'>
            <div>
              <div className='flex justify-between font-bold'>
                <RiUserSearchLine className='text-2xl '/> Total Jobseekers
              </div>
              <div className="text-end font-medium text-3xl mt-3">
                34
              </div>
            </div>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className='px-6'>
            <div>
              <div className='flex justify-between font-bold'>
                <TbUser className='text-2xl '/> Total Applicants
              </div>
              <div className="text-end font-medium text-3xl mt-3">
                12
              </div>
            </div>
          </Card>
        </div>
      </div>
      {/* <div className="grid grid-cols-4 gap-5 my-4">
        <div className="col-span-1">
          <Card>
            <ReactApexChart options={option1.options} series={option1.series} type="radialBar" />
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <ReactApexChart options={option1.options} series={option1.series} type="radialBar" />
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <ReactApexChart options={option1.options} series={option1.series} type="radialBar" />
          </Card>
        </div>
        <div className="col-span-1">
          <Card>
            <ReactApexChart options={option1.options} series={option1.series} type="radialBar" />
          </Card>
        </div>
      </div> */}
   </div>
  )
}

export default Home