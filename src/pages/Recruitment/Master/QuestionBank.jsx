import React, { useEffect } from 'react'
import { useState } from 'react'
import Action from '../../../components/Action/Action'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Input from '../../../components/Input/Input'
import Select from '../../../components/Select/Select'
import Table from '../../../components/Table/Table'
import { Sorter } from '../../../helpers/Sorter'
import * as apiProvider from '../../../services/api/recruitment'
import ReactQuill from 'react-quill';
import { Tag } from 'antd';
import TextArea from '../../../components/Input/TextArea'

const QuestionBank = ({ notify }) => {

  const [user, setUser] = useState({
    departmentName: '',
    questionType: '',
    question: '',
    options: '',
    correctAnswer: ''
  })

  const [options, setOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  })

  const [allOptions, setAllOptions] = useState([])

  useEffect(() => {
    const arr = []
    const arr1 = []
    if (options.option1) {
      const obj = {
        label: options.option1,
        value: options.option1,
      }
      const obj1 = {
        optionNumber: 1,
        answerBody: options.option1
      }
      arr.push(obj)
      arr1.push(obj1)
    }
    if (options.option2) {
      const obj = {
        label: options.option2,
        value: options.option2,
      }
      const obj1 = {
        optionNumber: 2,
        answerBody: options.option2
      }
      arr.push(obj)
      arr1.push(obj1)
    }
    if (options.option3) {
      const obj = {
        label: options.option3,
        value: options.option3,
      }
      const obj1 = {
        optionNumber: 3,
        answerBody: options.option3
      }
      arr.push(obj)
      arr1.push(obj1)
    }
    if (options.option4) {
      const obj = {
        label: options.option4,
        value: options.option4,
      }
      const obj1 = {
        optionNumber: 4,
        answerBody: options.option4
      }
      arr.push(obj)
      arr1.push(obj1)
    }

    setUser(prev => ({
      ...prev,
      options: arr1
    }))
    setAllOptions(arr)
  }, [options])

  const questionType = [
    {
      label: 'Subjective',
      value: 'Subjective'
    },
    {
      label: 'Objective',
      value: 'Objective'
    },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChangeOptions = (e) => {
    const { name, value } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const handelChangeSelect = (e) => {
    const { name, value } = e;
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [departmentOpt, setDepartmentOpt] = useState([])


  const columns = [
    {
      title: "Round",
      dataIndex: "departmentName"
    },
    {
      title: "Question Type",
      dataIndex: "questionType",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Question",
      dataIndex: "question",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 3
      }
    },
    {
      title: "Options",
      dataIndex: "options",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      }
    },
    {
      title: "Action",
      dataIndex: "action"
    },
  ];

  const [data, setData] = useState([
    {
      key: "1",
      name: "John Brown",
      chinese: 98,
      math: 60,
      english: 70,
      action: <Action />
    },
    {
      key: "2",
      name: "Jim Green",
      chinese: 98,
      math: 66,
      english: 89,
      action: <Action />
    },
    {
      key: "3",
      name: "Joe Black",
      chinese: 98,
      math: 90,
      english: 70,
      action: <Action />
    },
    {
      key: "4",
      name: "Jim Red",
      chinese: 88,
      math: 99,
      english: 89,
      action: <Action />
    }
  ]);

  const getBasicData = () => {
    apiProvider.getDepartment()
      .then(res => {
        console.log(res);
        const arr = res?.data?.map((i, key) => ({
          label: i?.name,
          value: i?._id
        }))
        setDepartmentOpt(arr)
      })
      .catch(err => {
        // console.log(err);
      })
  }

  const getData = () => {
    apiProvider.getQuestionBank()
      .then(res => {
        console.log(res)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubmit = () => {
    apiProvider.createQuestionBank(user)
      .then(res => {
        console.log(res)
        return notify('success', 'added success');
      })
      .catch(err => {
        console.log(err)
        return notify('success', err.message);
      })
  }

  useEffect(() => {
    getData();
    getBasicData();
  }, [])

  return (
    <div>
      <Card>
        <div className='font-bold'> Add Department </div>
        <div className='form-parent'>
          <div className="form-child">
            <Select
              label="Department"
              placeholder="Select Department"
              onChange={handelChangeSelect}
              options={departmentOpt}
              name="departmentName"
            />
          </div>
          <div className="form-child">
            <Select
              label="Question Type"
              options={questionType}
              defaultValue={'subjective'}
              name="questionType"
              placeholder="Select Question Type"
              onChange={handelChangeSelect}
            />
          </div>
          <div className="form-child col-span-12">
            <TextArea label="Question"
              placeHolder="Enter Question"
              onChange={handleChange}
              name="question"
              value={user?.question} />


          </div>
          {
            user?.questionType == "Objective"
              ?
              <>
                <div className="form-child col-span-3">
                  <Input
                    label="Option 1"
                    placeHolder="Enter Option 1"
                    onChange={handleChangeOptions}
                    name="option1"
                    value={options?.option1}
                  />
                </div>
                <div className="form-child col-span-3">
                  <Input
                    label="Option 2"
                    placeHolder="Enter Option 2"
                    onChange={handleChangeOptions}
                    name="option2"
                    value={options?.option2}
                  />
                </div>
                <div className="form-child col-span-3">
                  <Input
                    label="Option 3"
                    placeHolder="Enter Option 3"
                    onChange={handleChangeOptions}
                    name="option3"
                    value={options?.option3}
                  />
                </div>
                <div className="form-child col-span-3">
                  <Input
                    label="Option 4"
                    placeHolder="Enter Option 4"
                    onChange={handleChangeOptions}
                    name="option4"
                    value={options?.option4}
                  />
                </div>
                <div className="form-child">
                  <Select
                    label="Correct Answer"
                    placeholder="Enter Correct Answer"
                    onChange={handelChangeSelect}
                    value={user?.correctAnswer}
                    options={allOptions}
                    name="correctAnswer"
                  />
                </div>
                <div className="col-span-12 px-2">
                  {
                    allOptions.map((i, key) => (<Tag closable onClose={() => console.log('ajn')}>
                      {i?.label}
                    </Tag>))
                  }
                </div>
              </>
              :
              <div className="form-child col-span-12">
                <label htmlFor="" className={`text-base px-2  mb-[10px]`}>Enter Answer</label>

                <ReactQuill className='px-2 min-h-[100px]' label={"description"} theme="snow" value={user?.answer} onChange={(e) => setUser((prev) => ({ ...prev, "answer": e }))} />
              </div>

          }

        </div>
        <div className="flex justify-end mt-3">
          <Button
            title="Add Question"
            className={'min-w-[100px]'}
            onClick={handleSubmit}
          />
        </div>
      </Card>

      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          Rounds
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default QuestionBank