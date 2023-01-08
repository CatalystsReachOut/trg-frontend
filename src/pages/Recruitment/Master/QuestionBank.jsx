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
import { Dropdown, Switch, Tag } from 'antd';
import TextArea from '../../../components/Input/TextArea'
import { BsThreeDots } from 'react-icons/bs'

const QuestionBank = ({ notify }) => {

  const [user, setUser] = useState({
    departmentId: '',
    questionType: '',
    question: '',
    options: '',
    correctAnswer: ''
  })


  const [edit, setEdit] = useState(false)

  const handleMenuClick = (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      setEdit(true)
      setUser(data.find(item => item._id === key[1]))

    } else {  // delete
      handleDelete(key[1])
    }
  };

  const [options, setOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  })


  const clearData = () => {
    setOptions({
      option1: '',
      option2: '',
      option3: '',
      option4: '',
    })

    setUser({
      departmentId: '',
      questionType: '',
      question: '',
      options: '',
      correctAnswer: ''
    })
  }
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
      title: "Sl no.",
      dataIndex: "index",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 2
      },
      render: (value, item, index) => index + 1
    },
    {
      title: "Department Name",
      dataIndex: "departmentId",
      render: (val) => <p>{departmentOpt?.find(item => item.value == val)?.label}</p>
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
      },
      render: (summary, a) => <div className="content max-h-[100px] overflow-y-auto" >
        {
          summary?.length != 0 ? summary?.map((i, key) => (
            <div className={`${i?.answerBody == a?.correctAnswer ? 'bg-[#78e08f] text-white font-bold' : ''} px-2`}>{i?.answerBody}</div>
          ))
            :
            <div className='text-center'>
              ------
            </div>
        }
        {
          console.log(a?.correctAnswer)
        }
      </div>
    },
    {
      title: "Answer",
      dataIndex: "correctAnswer",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 1
      },
      render: (summary) => <div className="content max-h-[100px] overflow-y-auto" dangerouslySetInnerHTML={{ __html: summary }}></div>
    },
    {
      title: "Status",
      dataIndex: "_id",
      render: (id) => (<Switch className='bg-[gray]' defaultChecked onChange={() => console.log(id)} />)
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id) => (<Dropdown
        className='cursor-pointer'
        menu={{ items: [{ label: 'Edit', key: `edit` + "_" + id }, { label: 'Delete', key: "delete" + "_" + id }], onClick: handleMenuClick }}
        trigger={['click']}
      >
        <BsThreeDots />
      </Dropdown>)
    }
  ];

  const [data, setData] = useState([]);

  const getBasicData = () => {
    apiProvider.getDepartment()
      .then(res => {
        console.log(res);
        const arr = res.data.map(data => ({
          value: data._id,
          label: data.name
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
        getData()
        return notify('success', 'added success');
      })
      .catch(err => {
        console.log(err)
        return notify('success', err.message);
      })
  }

  const handleEdit = () => {
    // enterLoading(1)
    return apiProvider.editQuestionBank(user?._id, user)
      .then(res => {
        if (res.isSuccess) {
          clearData()
          getData()
          setEdit(false)
          return notify('success', 'added success');
        } else {
          setEdit(false)
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)

        return notify('error', err.message);
      })
  }

  const handleDelete = (id) => {
    return apiProvider.editQuestionBank(id, { status: "DELETED" })
      .then(res => {
        if (res.isSuccess) {
          clearData()
          getData()
          setEdit(false)
          return notify('success', 'added success');
        } else {
          setEdit(false)
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)

        return notify('error', err.message);
      })
  }

  useEffect(() => {
    getData();
    getBasicData();
  }, [])

  return (
    <div>
      <Card>
        <div className='font-bold'> Add Question Bank </div>
        <div className='form-parent'>
          <div className="form-child">
            <Select
              label="Department"
              placeholder="Select Department"
              value={user?.departmentId}
              onChange={handelChangeSelect}
              options={departmentOpt}
              name="departmentId"
            />
          </div>
          <div className="form-child">
            <Select
              label="Question Type"
              value={user?.questionType}
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

                <ReactQuill className='px-2 min-h-[100px]' label={"description"} theme="snow" value={user?.correctAnswer} onChange={(e) => setUser((prev) => ({ ...prev, "correctAnswer": e }))} />
              </div>

          }

        </div>
        <div className="flex justify-end mt-3">
          <Button
            title="Add Question"
            className={'min-w-[100px]'}
            onClick={() => { edit ? handleEdit() : handleSubmit() }}
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