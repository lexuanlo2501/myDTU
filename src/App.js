import {useState, useEffect } from 'react';
import { Routes, Route, Navigate , useNavigate} from 'react-router-dom';
import DefaultLayout from './components/Layout/DefaultLayout';
import Home from './pages/Home';
import SigninSignup from './components/Layout/SigninSignup';
import SignIn from './components/Layout/SigninSignup/Signin';
import Signup from './components/Layout/SigninSignup/Signup';
import AdminCourses from './pages/AdminCourses';
import HeaderOnly from './components/Layout/HeaderOnly';
import ClassInfo from './pages/class info';
import ScheduleUser from './pages/ScheduleUser';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalInfo from './pages/personal info';
import NotificationPage from './components/Notification';
import ClassRegisterPage from './pages/register classes';
import ClassTranscript  from './pages/Transcript manager';
import Curriculum from './pages/curriculum';
import Header from './components/Layout/components/Header';

function App() {

  const [user, setUser] = useState({});
  const [avt_src,setSrc] = useState();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  axios.interceptors.response.use(
    response=>response,
    error=>{
      if(error.response.status === 401) {
        localStorage.clear();
        setUser({});
        return navigate('/login')
      }
      return Promise.reject(error);
    }
    );
    useEffect(()=>{
      axios.get('http://localhost:5000/auth');
      const currentUser = localStorage.getItem('user');
      if(currentUser) setUser(JSON.parse(currentUser));
  },[]);
  
  const 
      {authenticate,accessLevel} = user,
      adminAccess = (authenticate && accessLevel === 1),
      lecturerAccess = (authenticate && accessLevel === 2),
      studentAccess = (authenticate && accessLevel === 3);
  
  return (
      <div className="App">
          
            <Routes>
                <Route
                    path='/'
                    element={
                      studentAccess || lecturerAccess ? <Navigate to='/Home'/> : 
                      adminAccess ? <Navigate to="/Admin"/>: 
                      <Navigate to='/login'/>}
                />
                <Route
                    path='/login'
                    element={
                      studentAccess || lecturerAccess ? <Navigate to='/Home'/> : 
                      adminAccess ?  <Navigate to="/Admin"/>: 
                      <SigninSignup>
                        <SignIn setUser={setUser}  setSrc={setSrc} isOption />
                      </SigninSignup>}
                />
                <Route
                  path='/register'
                  element={
                  <SigninSignup>
                    <Signup/>
                  </SigninSignup>}
                />

                <Route
                  path='/Home'
                  element={
                  studentAccess || lecturerAccess? 
                  <>

                  <Header/>
                  <DefaultLayout lecturerAccess={lecturerAccess} setUser={setUser} avt_src={avt_src} >
                  <Home /> 
                  </DefaultLayout>
                  </> : 
                  <Navigate to='/login'/>
                  }
                >
                </Route>
            
            <Route path='student' >
              {
                studentAccess? (
                <>
                  <Route
                path='ScheduleUser'
                element={
                  user ? 
                  <>
                  <Header/>
                  <DefaultLayout lecturerAccess={lecturerAccess} avt_src={avt_src}  >
                    <ScheduleUser  /> 
                  </DefaultLayout> 
                  </>: 
                  <Navigate to="/login"/>}
            />

              <Route
                path='registerClass'
                element={ user ? <ClassRegisterPage avt_src={avt_src} setUser={setUser}/> : <Navigate to="/login"/>}
              />


              <Route
                path='curriculum'
                element={ user ? <Curriculum avt_src={avt_src} setUser={setUser}/> : <Navigate to="/login"/>}
              />
              </>
            ):
              <Route element={<Navigate to='/Home'/>} />
              }
            </Route>
            
            
            <Route path='lecturer' >
              {lecturerAccess?
              <Route path='transcript-manager/:id' 
              element={
                <>
                <Header setUser={setUser}/>
                <DefaultLayout lecturerAccess={lecturerAccess} avt_src={avt_src}  >
                    <ClassTranscript/>
                </DefaultLayout> 
                </>
              }
                
              />: <Route element={<Navigate to='/Home'/>} />}
                
            </Route>


            <Route
                path='classInfo/:id'
                element={<ClassInfo avt_src={avt_src} setUser={setUser}/>}
            />  
                
                
            <Route
                  path='/personalInfo'
                  element={<PersonalInfo avt_src={avt_src} setSrc={setSrc} setUser={setUser}/>}
            />
            
            <Route
                  path='/notifications'
                  element={ accessLevel && authenticate ? <NotificationPage setUser={setUser}/> : <Navigate to='/login'/>}
            />
                
            <Route
                  path='/Admin'
                  element={ adminAccess ? <HeaderOnly  avt_src={avt_src} setUser={setUser} ><AdminCourses/></HeaderOnly> : <Navigate to='/login'/>}
            />
                
            <Route path="*" element={<div><h1 style={{textAlign:'center'}}>404 NOT FOUND</h1></div>}/>
                
            </Routes>

      </div>

  );
}

export default App;
