import {Fragment, useState, useEffect, createContext } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import Home from './pages/Home';
import SigninSignup from './components/Layout/SigninSignup';
import SignIn from './components/Layout/SigninSignup/Signin';
import Signup from './components/Layout/SigninSignup/Signup';
import AdminCourses from './pages/AdminCourses';
import HeaderOnly from './components/Layout/HeaderOnly';
import ScheduleUser from './pages/ScheduleUser';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassRegisterPage from './pages/register classes';
function App() {

  const [user, setUser] = useState({});
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    response=>response,
    error=>{
      
      const {status} = error.response;
      if(status === 401) {
        localStorage.clear();
        setUser({});
        <Navigate replace to={"/login"} />
      }
      return Promise.reject(error);
    }
    );
    useEffect(()=>{
      axios.get('http://localhost:5000/auth');
      const currentUser = localStorage.getItem('user');
      if(currentUser) setUser(JSON.parse(currentUser));
  },[]);
  
  const {authenticate,accessLevel} = user;
  const adminAccess = (authenticate && accessLevel === 1);
  const studentAccess = (authenticate && accessLevel === 3);
  return (
      <div className="App">
          <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                      studentAccess? <Navigate to='/Home'/> : 
                      adminAccess ? <Navigate to="/Admin"/>: 
                      <Navigate to='/login'/>}
                />
                <Route
                    path='/login'
                    // element={<SigninSignup><Signin isOption /></SigninSignup>}
                    element={
                      studentAccess? <Navigate to='/Home'/> : 
                      adminAccess ?  <Navigate to="/Admin"/>: 
                      <SigninSignup><SignIn setUser={setUser} isOption /></SigninSignup>}
                />
                <Route
                  path='/register'
                  element={<SigninSignup><Signup/></SigninSignup>}
                />

                <Route
                  path='/Home'
                  element={studentAccess? <DefaultLayout setUser={setUser} ><Home /> </DefaultLayout> : <Navigate to='/login'/>}
                />

                <Route
                  path='/ScheduleUser'
                  element={user ? <DefaultLayout><ScheduleUser  /> </DefaultLayout> : <Navigate to="/login"/>}
                />

                {/* admin */}
                <Route
                  path='/Admin'
                  element={ adminAccess ? <HeaderOnly setUser={setUser} ><AdminCourses/></HeaderOnly> : <Navigate to='/login'/>}
                />
                <Route
                  path='registerClass'
                  element={ <ClassRegisterPage/>}
                />

                <Route path="*" element={<div><h1 style={{textAlign:'center'}}>404 NOT FOUND</h1></div>}/>
                
            </Routes>
          </Router>

      </div>

  );
}

export default App;
