import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'


//Components
import Navbar from './../components/Navbar/Navbar'


//Other Data
import { ROUTES } from './RouterConfig';


//Pages
import About from '../pages/About/About';
import Home from '../pages/Home/Home';

////////////Recruitment////////////////////
////Master
import RecMasterRound from '../pages/Recruitment/Master/Rounds'
import RecMasterInterviewRounds from './../pages/Recruitment/Master/InterViewRounds'
import RecMasterState from './../pages/Recruitment/Master/State'
import RecMasterQuestionBank from './../pages/Recruitment/Master/QuestionBank'
import RecMasterDepartment from './../pages/Recruitment/Master/Department'
import RecMasterCountry from './../pages/Recruitment/Master/Country'
import RecMasterCity from './../pages/Recruitment/Master/City'
import RecMasterBussiness from './../pages/Recruitment/Master/Bussiness'
import RecMasterWorkType from './../pages/Recruitment/Master/WorkType'
import RecMasterWorkShift from './../pages/Recruitment/Master/WorkShift'


////Create Job
import RecCreateJob from './../pages/Recruitment/JobsCreation/CreateJob'
import RecCreateJobApp1 from './../pages/Recruitment/JobsCreation/Approver1'
import RecCreateJobApp2 from './../pages/Recruitment/JobsCreation/Approver2'
import RecCreateJobApp3 from './../pages/Recruitment/JobsCreation/Approver3'
import RecCreateJobApp4 from './../pages/Recruitment/JobsCreation/Approver4'
import RecCreateJobProgrss from './../pages/Recruitment/JobsCreation/Progress'
import Footer from '../components/Footer/Footer';
import Login from '../pages/Register/Login';
import SignUp from '../pages/Register/SignUp';
import Jobs from '../pages/Recruitment/Jobs/Jobs';
import Profile from '../pages/Recruitment/Profile/Profile';


////Job seeker
import JobSeekerCreate from './../pages/Recruitment/Jobseeker/Add'
import JobSeekerProfile from './../pages/Recruitment/Jobseeker/Profile'

import { notification } from 'antd';
import { useState } from 'react';


// Storage constants
import * as storageConstants from "../utils/storageConstants"



// NavData

import { defaultNavbarData, adminNavbarData } from "../../src/components/Navbar/nav.js"
import JobDescription from '../pages/Recruitment/Master/JobDescription';
import ForgotPassword from '../pages/Register/ForgotPassword';
import Otp from '../pages/Register/Otp';
import ResetPassword from '../pages/Register/ResetPassword';
import Container from '../pages/Register/Container';

const Router = () => {

  const notify = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  }

  const exitLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  }


  const RouteWithRole = ({ Element }) => {


    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem(storageConstants.AUTH)))
    const [role, setRole] = useState(JSON.parse(localStorage.getItem(storageConstants.USER_ROLE)))
    const [redirect, setRedirect] = "/login?redirect=" + window.location.pathname;


    return (
      <>
        {
          auth ? <div className='bg-[#F5F5F5]'>

            <Navbar navbarData={role == 'ADMIN' ? adminNavbarData : defaultNavbarData} />
            <div className='container mx-auto p-[20px]  min-h-screen'>
              <Element notify={notify} enterLoading={enterLoading} exitLoading={exitLoading} loadings={loadings} />
            </div>
            <Footer />
          </div> : <Navigate replace to={redirect} />
        }
      </>
    );
  }

  return (
    <div>
      <Routes>

        <Route element={<Container/>}>

        <Route index exact path={ROUTES.User.Login} element={<Login loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
        <Route exact path={ROUTES.User.SignUp} element={<SignUp loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
        <Route exact path={ROUTES.User.ForgotPassword} element={<ForgotPassword loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
        <Route exact path={ROUTES.User.OTP} element={<Otp loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
        <Route exact path={ROUTES.User.Reset} element={<ResetPassword loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
        </Route>
        
        <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
        <Route exact path={ROUTES.About} element={<RouteWithRole Element={About} />}></Route>

        /////////////////// Recruitment //////////////////////
        // Master

        <Route exact path={ROUTES.Recruitment.Master.Rounds} element={<RouteWithRole Element={RecMasterRound} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.Bussiness} element={<RouteWithRole Element={RecMasterBussiness} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.City} element={<RouteWithRole Element={RecMasterCity} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.Country} element={<RouteWithRole Element={RecMasterCountry} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.Department} element={<RouteWithRole Element={RecMasterDepartment} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.InterviewRounds} element={<RouteWithRole Element={RecMasterInterviewRounds} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.QuestionBank} element={<RouteWithRole Element={RecMasterQuestionBank} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.State} element={<RouteWithRole Element={RecMasterState} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.WorkType} element={<RouteWithRole Element={RecMasterWorkType} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.WorkShift} element={<RouteWithRole Element={RecMasterWorkShift} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.JobDescription} element={<RouteWithRole Element={JobDescription} />}></Route>



        //// Create Job /////
        <Route exact path={ROUTES.Recruitment.CreateJob} element={<RouteWithRole Element={RecCreateJob} />}></Route>
        <Route exact path={`${ROUTES.Recruitment.Job}/:id`} element={<RouteWithRole Element={RecCreateJobApp4} />}></Route>
        <Route exact path='/job/progress/:id' element={<RouteWithRole Element={RecCreateJobProgrss} />}></Route>

        // jobs
        <Route exact path={ROUTES.Recruitment.ViewJobs} element={<RouteWithRole Element={Jobs} />}></Route>

      //profile
        <Route exact path={ROUTES.Recruitment.Profile} element={<RouteWithRole Element={Profile} />}></Route>
        

      //JobSeeker
        <Route exact path={'/aa'} element={<RouteWithRole Element={JobSeekerProfile} />}></Route>
        <Route exact path={'/ab'} element={<RouteWithRole Element={JobSeekerCreate} />}></Route>



      </Routes>
    </div>
  )
}

export default Router