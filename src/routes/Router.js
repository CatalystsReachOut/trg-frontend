import React from 'react'
import { Route, Routes } from 'react-router-dom'


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


////Create Job
import RecCreateJob from './../pages/Recruitment/JobsCreation/CreateJob'
import RecCreateJobApp1 from './../pages/Recruitment/JobsCreation/Approver1'
import RecCreateJobApp2 from './../pages/Recruitment/JobsCreation/Approver2'
import RecCreateJobApp3 from './../pages/Recruitment/JobsCreation/Approver3'
import RecCreateJobApp4 from './../pages/Recruitment/JobsCreation/Approver4'
import RecCreateJobProgrss from './../pages/Recruitment/JobsCreation/Progress'
import Footer from '../components/Footer/Footer';
import Login from '../pages/Register/Login';
import Jobs from '../pages/Recruitment/Jobs/Jobs';
import Profile from '../pages/Recruitment/Profile/Profile';


////Job seeker
import JobSeekerCreate from './../pages/Recruitment/Jobseeker/Add'
import JobSeekerProfile from './../pages/Recruitment/Jobseeker/Profile'

import { notification } from 'antd';
import { useState } from 'react';

const Router = () => {

  const RouteWithRole = ({ Element }) => {
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

    return (
      <div className='bg-[#F5F5F5]'>
        <Navbar />
        <div className='container mx-auto p-[20px]  min-h-screen'>
          <Element notify={notify} enterLoading={enterLoading} exitLoading={exitLoading} loadings={loadings} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route exact path={ROUTES.Login} element={<Login />}></Route>
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


        //// Create Job /////
        <Route exact path={ROUTES.Recruitment.CreateJob} element={<RouteWithRole Element={RecCreateJob} />}></Route>
        <Route exact path='/s1' element={<RouteWithRole Element={RecCreateJobApp1} />}></Route>
        <Route exact path='/s2' element={<RouteWithRole Element={RecCreateJobApp2} />}></Route>
        <Route exact path='/s3' element={<RouteWithRole Element={RecCreateJobApp3} />}></Route>
        <Route exact path='/s4' element={<RouteWithRole Element={RecCreateJobApp4} />}></Route>
        <Route exact path='/pp' element={<RouteWithRole Element={RecCreateJobProgrss} />}></Route>

        // jobs
        <Route exact path={ROUTES.Jobs} element={<RouteWithRole Element={Jobs} />}></Route>

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