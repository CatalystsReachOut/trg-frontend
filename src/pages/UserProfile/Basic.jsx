import React from "react";
import { useState } from "react";
import ProgressBar from "../../components/partials/ProgressBar";
import Select from "react-select";
import Footer from '../../components/Footer/Footer'
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../routes/RouterConfig'
const Basic = () => {
  const navigate=useNavigate();

  const [yes, setYes] = useState(false);
  const changedir = (dir) =>{
    navigate('/education');
    localStorage.setItem('employment',true);
  }
  const handleChange = () => {};
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

  const currency=[{
    label:'$',
    value:'Dollars'
  },
{
  label:'Rupees',
  value:'Rupees'
}]
  return (
    <div>
      <div className="w-[80%] m-auto  mt-10">
        <div className="flex text-xl justify-center">
          <ProgressBar />
        </div>
        <div className="mt-10 w-[50%] pl-[3rem] ml-[420px] border-2 h-[47rem] p-5">
          <div className="text-[#19435D] text-xl font-medium">
            Welcome Name!
          </div>
          <div className="text-3xl font-medium mt-[30px]">
            Add Your Employment
          </div>
          <div className="grid mt-[10px] grid-cols-2">
            <div className="form-child flex flex-col col-span-1 gap-2.5">
              <p className="mt-[30px] text-lg font-semibold">
                Currently Employed ?
              </p>
              <div className="mt-[2px]">
                <div className="flex gap-3">
                  <button
                    onClick={() => setYes(true)}
                    className="h-[50px] w-[100px] flex justify-center text-lg items-center border hover:bg-green-600 bg-[#F8F8F8] rounded-full cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setYes(false)}
                    className="hover:bg-green-600 h-[50px] w-[100px] flex justify-center text-lg items-center border bg-[#F8F8F8] rounded-full cursor-pointer"
                  >
                    No
                  </button>
                </div>
                </div>

                
                { yes ?
                  <div>
                <div className="mt-8">
                  <p className="text-lg font-semibold mt-4">
                    Total Work Experience
                  </p>
                  <div className="flex mt-[16px]">
                    <Select
                      className="w-40"
                      placeholder="Year"
                      style={{
                        width: 150,
                      }}
                      onChange={handleChange}
                      options={arr}
                    />
                    <Select
                      placeholder="Month"
                      className="outline-0 ml-[15px] w-40"
                      style={{
                        width: 150,
                      }}
                      onChange={handleChange}
                      options={arr}
                    />
                  </div>
                </div>
                <div className="">
                  <p className="text-lg font-semibold mt-8">Job Title</p>
                    <input
                      className="w-[21rem] border-[#ccc] focus:outline-[#F1C40F] border-[1px] rounded-sm text-sm p-1 px-2  h-[40px] mt-[16px]"
                      type="text"
                      placeholder="Eg.Web Developer"
                    />
                </div>
                <div className="">
                <p className="text-lg font-semibold mt-8">Working Since</p>
                <input type="date" className="border-[#ccc] focus:outline-[#F1C40F] w-36 border-[1px] rounded-sm text-sm p-1 px-2  h-[40px] mt-[16px]" />
                <span className="ml-4 font-semibold">To</span>
                <input type="Number" placeholder="Present" className="border-[#ccc] focus:outline-[#F1C40F]  w-36 ml-4 border-[1px] rounded-sm text-sm p-1 px-4  h-[40px] mt-[16px]" />
                </div>
                </div>
                    :null
                }
              </div>
            

            <div className="form-child flex flex-col col-span-1 gap-2.5"> 
            {
              yes ?
            <div>
              <div className="mt-[10rem]">
              <p className="text-lg font-semibold">Company</p>
              <input
                    className="w-[21rem] border-[1px] border-[#ccc] rounded-sm text-base p-1 px-2 focus:outline-[#F1C40F] h-[40px] mt-[16px]"
                      type="text"
                      placeholder="Eg.Flipkart"
                    />
              </div>
              <div className="mt-8">
              <p className="text-lg font-semibold">Current City</p>
              <input
                    className="w-[21rem] border-[1px] border-[#ccc] rounded-sm text-base p-1 px-2 focus:outline-[#F1C40F] h-[40px] mt-[16px]"
                      type="text"
                      placeholder="Mention the city you live"
                    />
              </div>
              <div className="mt-8">
              <p className="text-lg font-semibold">Annual Income</p>
              <div className="flex">
              <Select
                      placeholder="$"
                      className="outline-0 ml-[1px] mt-[1.2rem] border-[#ccc] focus:outline-[#F1C40F] h-[40px] w-[5rem]"
                      style={{
                        width: 40,
                      }}
                      onChange={handleChange}
                      options={currency}
                    />
                    <input
                    className="w-[15rem] ml-[1rem] border-[1px] border-[#ccc] rounded-sm text-base p-1 px-2 focus:outline-[#F1C40F] h-[40px] mt-[16px]"
                      type="Number"
                      placeholder="Eg.5000"
                    />
                    </div>
              </div>
              </div>:null
                    }
          </div>
          <div className="mt-8 ml-[17rem]">
                  <button onClick={() =>{changedir()}} className="rounded-md bg-yellow-500 w-[13rem] h-[3rem]">
                  Save and Continue
                  </button>
                  </div>
        </div>
      </div>
    </div>
    <footer className="sticky">
    <Footer/>
    </footer>
    </div>
  );
};

export default Basic;
