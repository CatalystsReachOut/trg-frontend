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
import RecMasterRole from './../pages/Recruitment/Master/Roles'

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
            <Route exact path={ROUTES.Recruitment.Master.Roles} element={<RouteWithRole Element={RecMasterRole} />}></Route>
        </Routes>
    </div>
  )
}

export default Router