import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input1 from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import ProgressBar from "../../components/partials/ProgressBar";
import { ROUTES } from "../../routes/RouterConfig";
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import * as apiProvider from './../../services/api/jobseeker'

const Education = () => {
  const navigate = useNavigate();
  const [yes, setYes] = useState(false);
  const [yes1, setYes1] = useState(false);
  const [edu1, setEdu1] = useState();
  const [course1, setCourse1] = useState();
  const changedir = (dir) => {
    navigate("/new-user/login");
  };


  const [user, setUser] = useState({
    education:'',
    course:'',
    specialization:'',
    university:'',
    courseType:'',
    startingYear:'',
    passYear:'',
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

  const edu = [
    {
      label: "Pg/Master",
      value: "Pg",
    },
    {
      label: "Graduation/Diploma",
      value: "Graduation",
    },
    {
      label: "12th",
      value: "12",
    },
    {
      label: "10th",
      value: "10",
    },
    {
      label: "Below 10th",
      value: "Below 10",
    },
  ];

  const course = [
    {
      label: "Barch",
      value: "Barch",
    },
    {
      label: "B.E/B.Tech",
      value: "B.E/B.Tech",
    },
    {
      label: "BCA",
      value: "BCA",
    },
  ];

  const setEdu = (e) => {
    setEdu1(e.value);
    setYes(true);
  };
  const setCourse = (e) => {
    setCourse1(e.value);
    setYes1(true);
  };
  const specialization = [
    {
      name:'Full Time',
      value:'Full-time'
    },
    {
      name:'Part Time',
      value:'Part-time'
    },
    {
      name:'Distance Learning',
      value:'Online'
    },
  ]

  const handleSubmit = async()=>{
    await apiProvider.UpdateProfile({education: [user]})
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
          <ProgressBar />
        </div>
        <Card className="mt-10  pl-[3rem]  border-2 p-5">
          <p className="text-3xl font-medium mt-[30px]"></p>
          <div className="grid-cols-2 grid gap-20">
            <div className="col-span-1">
              <p className="mt-[25px] text-lg font-semibold">
                Mention your Education
              </p>
              <Select
                label="Education"
                className="mt-[2rem] font-semibold"
                labelClassName={"font-semibold text-lg"}
                placeholder="Select Education"
                options={edu}
                value={user?.education}
                name="education"
                onChange={handelChangeSelect}
              />
              {user?.education ? (
                <div>
                  <Select
                    placeholder="Select Course"
                    labelClassName={"font-semibold text-lg"}
                    className="mt-[2rem] font-semibold"
                    label="Course"
                    name={"course"}
                    options={course}
                    value={user?.course}
                    onChange={handelChangeSelect}
                  />
                  {user?.course ? (
                    <div>
                      <Input1
                        type="text"
                        label="Specialization"
                        labelClassName={"font-semibold text-lg"}
                        className="w-[20.5rem] font-semibold mt-[2rem] mr-[3rem]"
                        placeHolder="Eg. Data Analytics"
                        name={'specialization'}
                        onChange={handleChange}
                        value={user?.specialization}
                      />
                      <p className="mt-[20px] text-lg font-semibold">
                        Course Type
                      </p>
                      <div className="flex font-semibold gap-3">
                        {
                          specialization.map((item,index) => (
                            <button
                            key={index}
                            className={`rounded-3xl focus:bg-yellow-400 outline-[#ccc] h-[3rem] mt-[0.5rem] pt-[0.2rem] justify-center text-center bg-[#F8F8F8] cursor-pointer px-4 flex flex-nowrap items-center ${user.courseType===item.value ? 'bg-yellow-400 text-white' : ''}`}
                            onClick={() => setUser(prev => ({
                              ...prev,
                              courseType: item.value
                            }))
                            }
                            >
                              {item.name}
                            </button>
                          ))
                        }
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
            {/* Second column */}
            {user?.course ? (
              <div className=" mt-[18.7rem] pr-[2rem] col-span-1">
                <Input1
                  type="text"
                  className="font-semibold"
                  label="University"
                  labelClassName={"font-semibold text-lg"}
                  placeHolder="Eg. Kle Tech"
                  name={'university'}
                  value={user?.university}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-2">
                  <div className="col-span-1">
                    <p className="mt-[25px] text-lg font-semibold">
                      Starting Year
                    </p>
                    <input
                      type="Number"
                      label=""
                      className="w-[8rem] h-4 outline-none ml-[0.7rem] mt-[1rem]"
                      placeHolder="Eg.2020"
                      value={user?.startingYear}
                      name={'startingYear'}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <p className="mt-[25px] text-lg font-semibold">
                      Passing Year
                    </p>

                    <input
                      type="number"
                      className="w-[8rem] h-4 outline-none mt-[1rem]"
                      placeHolder="Eg.2020"
                      value={user?.passYear}
                      name={'passYear'}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {user?.course ? (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  handleSubmit()
                }}
                className="rounded-md text-xl text-white bg-yellow-500 w-[16rem] h-[3rem]"
              >
                Save
              </button>
            </div>
          ) : null}
        </Card>
      </div>
      <footer className="sticky">
        <Footer />
      </footer>
    </div>
  );
};
export default Education;
