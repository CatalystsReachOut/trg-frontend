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
import { BsThreeDots } from "react-icons/bs"

import { Modal, Switch, Dropdown } from 'antd'


const InterviewRounds = ({ notify, enterLoading, exitLoading, loadings }) => {
  const [user, setUser] = useState({
    name: "",
    profile: "",
    noOfRound: "",
    noOfQuestion: "",
    rounds: []
  })



  const columnsQues = [
    {
      title: "Action",
      dataIndex: "_id",
      render: (_id) => (<Switch className='bg-[gray] mr-[10px]'
        defaultChecked={false}
        onChange={() => setQuestionData(questionData.map(item => {
          if (item?._id == _id) {
            item.checked = !item.checked
            return { ...item }
          } else {
            return { ...item }
          }
        }))} />)
    },
    {
      title: "Question",
      dataIndex: "question",
    },
    {
      title: "Question Type",
      dataIndex: "questionType",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },


  ];


  const columns = [
    {
      title: "Profile",
      dataIndex: "profile",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      },
      render: data => (
        <div>{profileData?.find(s => s?.value == data)?.label}</div>
      )
    },
    {
      title: "No Of Round",
      dataIndex: "noOfRound",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
    },
    {
      title: "No Of Question",
      dataIndex: "noOfQuestion",
      sorter: {
        compare: Sorter.DEFAULT,
        multiple: 4
      }
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


  ///////////////// ADD ROUND QUESTION //////////////////////

  const [edit, setEdit] = useState(false)

  const handleMenuClick = async (e) => {
    const key = e.key.split("_");

    if (key[0] === "edit") {
      await setEdit(true)
      await setUser(data.find(item => item._id == key[1]))
      console.log(data)
      console.log(key)
      await setQuestionData(addedRoundData.find(item => item._id === key[1])?.rounds)
      showModal()
    }
    else {
      handleDelete(key[1])
    }
  };

  const columnsAddedRound = [
    {
      title: "Round",
      dataIndex: "round",
      render: (round) => (<p>{roundData?.find(item => item.value == round)?.label}</p>)
    },
    {
      title: "No of Question",
      dataIndex: "question",
      render: (question) => {
        var subjective = 0;
        var objective = 0;

        for (var quest of question) {
          if (quest.questionType == "Subjective") {
            subjective++;
          } else {
            objective++;
          }
        }

        return <>
          <p>Subjective : {subjective}</p>
          <p>Objective : {objective}</p>
        </>
      }
    },
    {
      title: "Time (Minutes)",
      dataIndex: 'time',
      render: (time, data) => {
        return <Input
          label=""
          placeHolder=""
          type="number"
          value={data?.time}
          name="logo"
          onChange={(e) => setAddedRoundData(addedRoundData.map(item => {
            if (item.round == data.round) {
              item.time = e.target.value
              return { ...item }
            } else {
              return { ...item }
            }
          }))}
        />
      }
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      render: (marks, data) => {
        return <Input
          label=""
          placeHolder=""
          type="text"
          value={marks}
          onChange={(e) => setAddedRoundData(addedRoundData.map(item => {
            if (item.round == data.round) {
              item.totalMarks = e.target.value
              return { ...item }
            } else {
              return { ...item }
            }
          }))}
        />
      }
    },
    {
      title: "Disclaimer",
      dataIndex: "disclaimer",
      render: (disclaimer, data) => {
        return <Input
          label=""
          placeHolder=""
          type="text"
          value={disclaimer}
          onChange={(e) => setAddedRoundData(addedRoundData.map(item => {
            if (item.round == data.round) {
              item.disclaimer = e.target.value
              return { ...item }
            } else {
              return { ...item }
            }
          }))}
        />
      }
    },
    {
      title: "Action",
      dataIndex: "round",
      render: (id) => (<Dropdown
        menu={{ items: [{ label: 'Edit', key: `edit` + "_" + id }, { label: 'Delete', key: "delete" + "_" + id }], onClick: handleMenuClick }}
        trigger={['click']}
      >
        <BsThreeDots />
      </Dropdown>)
    }
  ]

  const [data, setData] = useState([
  ]);

  const [profileData, setProfileData] = useState([])
  const [roundData, setRoundData] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  const [questionData, setQuestionData] = useState([])

  const [addedRoundData, setAddedRoundData] = useState([])

  console.log(addedRoundData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
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

  const getBasicData = async () => {
    const [data1, data2, data3] = await Promise.all([
      apiProvider.getProfile()
        .then(res => {
          const arr = res?.data?.map((i, key) => ({
            label: i?.title,
            value: i?._id
          }))
          setProfileData(arr)
        })
        .catch(err => {
          console.log(err);
        })
      ,
      // apiProvider.getQuestionBank()
      apiProvider.getRound()
        .then(res => {
          const arr = res?.data?.map((i, key) => ({
            label: i?.name,
            value: i?._id
          }))
          setRoundData(arr)
        })
        .catch(err => {
          console.log(err);
        }),

      apiProvider.getDepartment()
        .then(res => {
          const arr = res?.data?.map((i, key) => ({
            label: i?.name,
            value: i?._id
          }))
          setDepartmentData(arr)
        })
        .catch(err => {
          console.log(err);
        })

    ])
  }

  const getData = () => {
    // enterLoading(2)
    apiProvider.getInterviewRounds()
      .then(res => {
        setData(res.data)
        // return exitLoading(2)
      })
      .catch(err => {
        console.log(err)
        // return exitLoading(2)

      })
  }

  const handleSubmit = () => {
    // enterLoading(1)
    return apiProvider.createInterviewRounds({
      profile: user?.profile,
      rounds: [
        ...addedRoundData
      ]
    })
      .then(res => {
        // exitLoading(1)
        if (res.isSuccess) {
          clearData()
          getData()
          return notify('success', 'added success');
        } else {
          return notify('error', res.message);
        }
      })
      .catch(err => {
        console.log(err)
        // exitLoading(1)
        return notify('error', err.message);
      })
  }

  const clearData = () => {
    setUser({
      name: "",
      profile: "",
      noOfRound: "",
      noOfQuestion: "",
      rounds: []
    })
  }


  const handleDelete = (id) => {
    return apiProvider.editInterviewRound(id, { status: "DELETED" })
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
    getBasicData()
  }, [])



  //////////////////////// MODAL ////////////////////////

  const addRound = () => {

    setAddedRoundData([...addedRoundData, { round: user?.round, question: questionData.filter(item => item.checked == true), time: 0, marks: 0, disclaimer: '' }])
  }



  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    if (!user?.profile) {
      return notify('error', 'Please select Profile first');
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    addRound()
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const getQuestions = (e) => {
    apiProvider.getQuestionBank(`?departmentId=${e}`).then(res => {
      console.log(res);
      for (var dat of res.data) {
        dat.checked = false
      }
      setQuestionData(res?.data)
    })
      .catch(err => {
        console.log(err);
      })
  }


  return (
    <div className='interview_round'>
      <Modal width={800} className="interview_round_modal" title="Interview Round" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
        <div className='grid grid-cols-1 lg:grid-cols-3 '>
          <div className="col-span-1">
            <Select
              label={'Department'}
              placeHolder={'Department'}
              name="department"
              onChange={(e) => getQuestions(e.value)}
              options={departmentData}
            />
          </div>

          <div className="col-span-3 h-[30px]"></div>

          <div className="col-span-3">

            <Table columns={columnsQues} dataSource={questionData} pagination={false} />

          </div>


        </div>
      </Modal>
      <Card>
        <div className='font-bold'> Add Interview Round </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4'>
          <div className="col-span-1">
            <Select
              label={'Profile'}
              placeHolder={'Profile'}
              name="profile"
              onChange={handelChangeSelect}
              options={profileData}
            />
          </div>

          <div className="col-span-1">
            <Select
              label={'Round'}
              placeHolder={'Round'}
              name="round"
              onChange={handelChangeSelect}
              options={roundData}
            />
          </div>

          <div className="col-span-1 flex items-end">
            <Button
              title="Fetch Question"
              className={'min-w-[100px]'}
              onClick={() => showModal()}
            />
          </div>

          <div className="col-span-3 py-[20px]">
            <Table columns={columnsAddedRound} dataSource={addedRoundData} pagination={false} />

          </div>


        </div>
        <div className="flex justify-end mt-3">
          <Button
            title="Add Interview Round"
            className={'min-w-[100px]'}
            onClick={handleSubmit}
          />
        </div>
      </Card>

      <Card className={'mt-3'}>
        <div className="font-bold my-3">
          Interview Rounds
        </div>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default InterviewRounds