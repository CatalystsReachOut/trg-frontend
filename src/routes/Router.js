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
import RecMasterWorkStyle from './../pages/Recruitment/Master/WorkStyle'
import RecMasterBand from './../pages/Recruitment/Master/Bands'
import RecMasterCompensation from './../pages/Recruitment/Master/Compensation'
import RecMasterCurrency from './../pages/Recruitment/Master/Currency'


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
import JobSeekerJobs from './../pages/Recruitment/Jobseeker/Jobs'
import JobSeekerAppliedJobs from './../pages/Recruitment/Jobseeker/AppliedJobs'
import JobSeekerExam from './../pages/Recruitment/Jobseeker/Exam'
import JobSeekerExamRoundCompletion from './../pages/Recruitment/Jobseeker/Exam/RoundCompletion'
import JobSeekerViewJob from './../pages/Recruitment/Jobseeker/ViewJob'

import { notification } from 'antd';
import { useState } from 'react';


// Storage constants
import * as storageConstants from "../utils/storageConstants"



// NavData

import { defaultNavbarData, adminNavbarData, seekerNavbarData } from "../../src/components/Navbar/nav.js"
import JobDescription from '../pages/Recruitment/Master/JobDescription';


////Registration
import ForgotPassword from '../pages/Register/ForgotPassword';
import Otp from '../pages/Register/Otp';
import ResetPassword from '../pages/Register/ResetPassword';
import Container from '../pages/Register/Container';



//Initial Profile setup
import ProfileInitContainer from '../pages/UserProfile/Container'
import ProfileInitRegistration from './../pages/UserProfile/Register'
import ProfileInitLogin from './../pages/UserProfile/Login'
import ProfileInitOTP from './../pages/UserProfile/OTPVerification'
import ProfileInitBasic from './../pages/UserProfile/Basic'
import ProfileInitEducation from "./../pages/UserProfile/Education"
import ProfileInitRegister from "./../pages/UserProfile/Registering"
import Loader from '../components/Loader/Loader';
import EditJob from '../pages/Recruitment/JobsCreation/EditJob';
import Notfound from '../components/partials/Notfound';
import JobApplications from '../pages/Recruitment/Jobs/JobApplications';
import ViewApplicants from '../pages/Recruitment/Jobs/ViewApplicants';
import Jobseeker from '../pages/Admin/Jobseeker';
const Router = () => {
  const notify = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const [loadings, setLoadings] = useState([]);

  const [loading, setLoading] = useState(0)

  const enterLoading = (index) => {
    // setLoadings((prevLoadings) => {
    //   const newLoadings = [...prevLoadings];
    //   newLoadings[index] = true;
    //   return newLoadings;
    // });
  }

  const exitLoading = (index) => {
    // setLoadings((prevLoadings) => {
    //   const newLoadings = [...prevLoadings];
    //   newLoadings[index] = false;
    //   return newLoadings;
    // });
  }


  const RouteWithRole = ({ Element, layout = true, showNavbar = true, showFooter = true }) => {


    // const [auth, setAuth] = useState(JSON.parse(localStorage.getItem(storageConstants.AUTH)))
    const [role, setRole] = useState(JSON.parse(localStorage.getItem(storageConstants.USER_ROLE)))
    const [redirect, setRedirect] = "/login"
    // ?redirect=" + window.location.pathname;


    return (
      <>
        {
          // auth ? 
          <div className='bg-[#F5F5F5]'>
            <Loader loading={loading}/>
            {
              showNavbar
              ?
              <Navbar navbarData={role == 'ADMIN' ? adminNavbarData : role=="SEEKER"?seekerNavbarData: defaultNavbarData} />
              :
              null
            }
            <div className={`${layout?'container mx-auto p-[20px]  min-h-screen':''}`}>
              <Element notify={notify} loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} setLoading={setLoading}/>
            </div>
            {
              showFooter
              ?
              <Footer />
              :
              null
            }
          </div> 
          // : <Navigate replace to={redirect} />
        }
      </>
    );
  }

  return (
    <div>
      <Routes>
        //Register Routing
        <Route element={<Container/>}>
          <Route index exact path={ROUTES.User.Login} element={<Login loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
          <Route index exact path={ROUTES.Home} element={<Login loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
          <Route exact path={ROUTES.User.SignUp} element={<SignUp loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
          <Route exact path={ROUTES.User.ForgotPassword} element={<ForgotPassword loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
          <Route exact path={ROUTES.User.OTP} element={<Otp loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
          <Route exact path={ROUTES.User.Reset} element={<ResetPassword loadings={loadings} enterLoading={enterLoading} exitLoading={exitLoading} notify={notify} />}></Route>
        </Route>


        ///User Profile Initial Completion Routing for job seeker
        <Route path={ROUTES.Profile.Initial.Root} element={<ProfileInitContainer/>}>
          <Route exact index path={ROUTES.Profile.Initial.Registration} element={<ProfileInitRegistration/>}/>
          <Route exact index path={ROUTES.Profile.Initial.Login} element={<ProfileInitLogin/>}/>
          <Route exact path={ROUTES.Profile.Initial.VerifyOTP} element={<ProfileInitOTP/>}/>
        </Route>
        <Route exact path={ROUTES.Profile.Initial.Education} element={<ProfileInitEducation/>}/>
        <Route exact path={ROUTES.Profile.Initial.Basic} element={<ProfileInitBasic/>}/>
        <Route exact path={ROUTES.Profile.Initial.Registration1} element={<ProfileInitRegister/>}/>
        
        {/* <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route> */}
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
        <Route exact path={ROUTES.Recruitment.Master.WorkStyle} element={<RouteWithRole Element={RecMasterWorkStyle} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.band} element={<RouteWithRole Element={RecMasterBand} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.compensation} element={<RouteWithRole Element={RecMasterCompensation} />}></Route>
        <Route exact path={ROUTES.Recruitment.Master.currency} element={<RouteWithRole Element={RecMasterCurrency} />}></Route>

        <Route exact path={ROUTES.Recruitment.Master.JobDescription} element={<RouteWithRole Element={JobDescription} />}></Route>

        //// Create Job /////
        <Route exact path={ROUTES.Recruitment.CreateJob} element={<RouteWithRole Element={RecCreateJob} />}></Route>
        {/* <Route exact path={`${ROUTES.Recruitment.Job}/:id`} element={<RouteWithRole Element={RecCreateJobApp4} />}></Route> */}
        <Route exact path={`${ROUTES.Recruitment.Job}/:id`} element={<RouteWithRole Element={EditJob} />}></Route>
        <Route exact path='/job/progress/:id' element={<RouteWithRole Element={RecCreateJobProgrss} />}></Route>

        // jobs
        <Route exact path={ROUTES.Recruitment.ViewJobs} element={<RouteWithRole Element={Jobs} />}></Route>
        <Route exact path={ROUTES.Recruitment.JobApplication} element={<RouteWithRole Element={JobApplications} />}></Route>
        <Route exact path={ROUTES.Recruitment.ViewApplications+'/:jobId'} element={<RouteWithRole Element={ViewApplicants} />}></Route>

      // JobSeekerJobs
        <Route exact path={ROUTES.Admin.JobSeeker} element={<RouteWithRole Element={Jobseeker} />}></Route>

      //profile
        <Route exact path={ROUTES.Recruitment.Profile} element={<RouteWithRole Element={Profile} />}></Route>

      //JobSeeker
        <Route exact path={'/aa'} element={<RouteWithRole Element={JobSeekerProfile} />}></Route>
        <Route exact path={'/ab'} element={<RouteWithRole Element={JobSeekerCreate} />}></Route>
        <Route exact path={ROUTES.JobSeeker.Job} element={<RouteWithRole Element={JobSeekerJobs} />}></Route>
        <Route exact path={ROUTES.JobSeeker.AppliedJobs} element={<RouteWithRole Element={JobSeekerAppliedJobs} />}></Route>
        <Route exact path={ROUTES.JobSeeker.Exam+'/:jobId/:step'} element={<RouteWithRole Element={JobSeekerExam} />}></Route>
        <Route exact path={ROUTES.JobSeeker.Exam+'/:jobId/:step/:stepcompletion'} element={<RouteWithRole Element={JobSeekerExamRoundCompletion} showFooter={false} showNavbar={false} />}></Route>
        <Route exact path={ROUTES.JobSeeker.Job+'/:id'} element={<RouteWithRole Element={JobSeekerViewJob} layout={false} />}></Route>



        <Route path='*' exact={true} element={<Notfound/>}>

        </Route>


      </Routes>
    </div>
  )
}

export default Router