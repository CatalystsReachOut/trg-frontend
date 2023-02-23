import React from "react";
import { useState } from "react";
import ProgressBar from "../../components/partials/ProgressBar";
import Select from "../../components/Select/Select";
import Footer from '../../components/Footer/Footer'
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from '../../routes/RouterConfig'
import Input from "../../components/Input/Input";
import * as apiProvider from './../../services/api/jobseeker'
const Basic = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const currentPath = location.pathname;
  const verifyPath = ROUTES.Profile.Initial.Basic
  const changedir = (dir) => {
    localStorage.setItem('employment', true);
    navigate('/education');
  }

  const [user, setUser] = useState({
    currentlyEmployed: undefined,
    totalWorkExperience:{
      year: '',
      month: ''
    },
    company: '',
    jobTitle: '',
    currentCity: '',
    startDate: '',
    endDate: '',
    currency: '',
    annualIncome: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handelChangeSelect = (e) => {
    const { name, value } = e;
    console.log(e)
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const arr = [
    {
      label: "opt1",
      value: "1",
    },
    {
      label: "opt2",
      value: "2",
    },
  ];

  const currency = [{
    label: '$',
    value: 'Dollars'
  },
  {
    label: '₹',
    value: 'Rupees'
  }]

  const handleSubmit = async()=>{
    await apiProvider.UpdateProfile({employment: [user]})
    .then(res => {
      changedir()
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    }
    )
  }
  return (
    <div>
      <div className="w-[80%] m-auto  mt-10 min-h-[90vh]">
        <div className="flex text-xl justify-center">
          <ProgressBar currentPath={currentPath} verifyPath={verifyPath}/>
        </div>
        <div className="mt-10 pl-[3rem]  border-2 p-5">
          <div className="text-[#19435D] text-xl font-medium">
            Welcome Name!
          </div>
          <div className="text-3xl font-medium mt-[30px]">
            Add Your Employment
          </div>

          {/* {
                user.currentlyEmployed == true || (user.currentlyEmployed == false && user.currentlyEmployed != undefined) ? */}
          <p className="mt-[30px] text-lg font-semibold">
            Currently Employed ?
          </p>
          <div className="mt-[2px]">
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setUser(prev => ({
                    ...prev,
                    currentlyEmployed: true
                  }))
                }}
                className={`h-[40px] w-[100px] flex justify-center text-lg items-center border hover:bg-secondary bg-[#F8F8F8] rounded-full cursor-pointer ${user.currentlyEmployed == true ? 'bg-secondary' : ''}`}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setUser(prev => ({
                    ...prev,
                    currentlyEmployed: false
                  }))
                }}
                className={`h-[40px] w-[100px] flex justify-center text-lg items-center border hover:bg-secondary bg-[#F8F8F8] rounded-full cursor-pointer ${user.currentlyEmployed != undefined && user.currentlyEmployed == false ? 'bg-secondary' : ''}`}
              >
                No
              </button>
            </div>
          </div>

          {
            user.currentlyEmployed == true || (user.currentlyEmployed == false && user.currentlyEmployed != undefined) ?
              <div className=" grid md:grid-cols-2 grid-cols-1 gap-3 mt-5">



                <div className="cols-span-1">
                  <p className="text-lg font-semibold mb-2">
                    Total Work Experience
                  </p>
                  <div className="flex justify-between gap-3">
                    <Input
                      placeHolder="Year"
                      onChange={(e)=>{setUser(prev=>({...prev, totalWorkExperience:{...prev.totalWorkExperience, year:e.target.value}}))}}
                      value={user.totalWorkExperience.year}
                      label={""}
                      className="gap-0 w-full"
                    />
                    <Input
                      placeHolder="Month"
                      onChange={(e)=>{setUser(prev=>({...prev, totalWorkExperience:{...prev.totalWorkExperience, month:e.target.value}}))}}
                      value={user.totalWorkExperience.month}
                      label={""}
                      className="gap-0 w-full"
                    />
                  </div>
                </div>
                <div className="cols-span-1">
                  <p className="text-lg font-semibold mb-2">Job Title</p>
                  <Input
                    type="text"
                    placeHolder="Eg.Web Developer"
                    value={user.jobTitle}
                    name="jobTitle"
                    onChange={handleChange}
                    label={""}
                    className="gap-0"
                  />
                </div>
                <div className="cols-span-1">

                  <p className="text-lg font-semibold mb-2">Working Since</p>
                  <input
                    type="date"
                    value={user.startDate}
                    className="border-[#ccc] focus:outline-[#F1C40F]   ml-4 border-[1px] rounded-sm text-sm p-1 px-4  h-[40px] w-auto"
                    name="startDate"
                    onChange={handleChange}
                  />


                  <span className="ml-4 font-semibold">To</span>
                  <input
                    type="date"
                    placeholder="Present"
                    className="border-[#ccc] focus:outline-[#F1C40F]  ml-4 border-[1px] rounded-sm text-sm p-1 px-4  h-[40px] w-auto"
                    value={user.endDate}
                    name="endDate"
                    onChange={handleChange}
                  />
                </div>
                <div className="cols-span-1">
                  <p className="text-lg font-semibold mb-2">Company</p>
                  <Input
                    type="text"
                    placeHolder="Eg.Flipkart"
                    name="company"
                    value={user.company}
                    onChange={handleChange}
                    label=""
                    className="gap-0"

                  />
                </div>
                <div className="cols-span-1">
                  <p className="text-lg font-semibold mb-2">Current City</p>
                  <Input
                    type="text"
                    placeHolder="Mention the city you live"
                    name="currentCity"
                    value={user.currentCity}
                    onChange={handleChange}
                    label=""
                    className="gap-0"
                  />
                </div>
                <div className="cols-span-1">
                  <p className="text-lg font-semibold mb-2">Annual Income</p>
                  <div className="flex">
                    <Select
                      placeholder="$"
                      className="outline-0 ml-[1px] border-[#ccc] focus:outline-[#F1C40F] h-[40px] w-[5rem] gap-0"
                      style={{
                        width: 40,
                      }}
                      options={currency}
                      name="currency"
                      onChange={handelChangeSelect}
                      value={user.currency}
                      label=""
                    />
                    <input
                      className="w-[15rem] ml-[1rem] border-[1px] border-[#ccc] rounded-sm text-base p-1 px-2 focus:outline-[#F1C40F] h-[40px]"
                      type="Number"
                      placeholder="Eg.5000"
                      name="annualIncome"
                      value={user.annualIncome}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-span-2 mt-8 flex justify-center">
                  <button onClick={handleSubmit} className="rounded-md bg-yellow-500 w-[13rem] h-[3rem]">
                    Save and Continue
                  </button>
                </div>
              </div>
              :
              null}
        </div>
      </div>
      <footer className="sticky">
        <Footer />
      </footer>
    </div>
  );
};

export default Basic;
