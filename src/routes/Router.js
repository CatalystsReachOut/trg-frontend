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

const Router = () => {

    const RouteWithRole = ({ Element }) => {
        return (
          <>
            <Navbar/>
            <div className='container mx-auto p-[20px] bg-[#F5F5F5] min-h-screen'>
              <Element/>
            </div>
          </>
        );
      }

  return (
    <div>
        <Routes>
            <Route exact path={ROUTES.Home} element={<RouteWithRole Element={Home} />}></Route>
            <Route exact path={ROUTES.About} element={<RouteWithRole Element={About} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.Rounds} element={<RouteWithRole Element={RecMasterRound} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.Bussiness} element={<RouteWithRole Element={RecMasterBussiness} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.City} element={<RouteWithRole Element={RecMasterCity} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.Country} element={<RouteWithRole Element={RecMasterCountry} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.Department} element={<RouteWithRole Element={RecMasterDepartment} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.InterviewRounds} element={<RouteWithRole Element={RecMasterInterviewRounds} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.QuestionBank} element={<RouteWithRole Element={RecMasterQuestionBank} />}></Route>
            <Route exact path={ROUTES.Recruitment.Master.State} element={<RouteWithRole Element={RecMasterState} />}></Route>
        </Routes>
    </div>
  )
}

export default Router