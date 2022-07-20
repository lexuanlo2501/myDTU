import {Fragment, useState} from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Layout/Home';
import SigninSignup from './components/Layout/SigninSignup';
import SigninSignun from './components/Layout/SigninSignup';
import FormSignin from './components/Layout/SigninSignup/FormSignin';
import Signup from './components/Layout/SigninSignup/Signup';
import UserTest from './components/UserTest';
import useToken from './customHook/useToken';



function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
      <div className="App">
          <Router>
            <Routes>
                <Route
                  path='/Signin'
                  element={<SigninSignup><FormSignin isOption setToken={setToken}/></SigninSignup>}
                />
                <Route
                  path='/Signup'
                  element={<SigninSignup><Signup/></SigninSignup>}
                />
            </Routes>
          </Router>
  
        </div>
    );
  }

  return (
    <div className="App">
        <Router>
          <Routes>
              {/* <Route
                path='/Signin'
                element={<SigninSignup><FormSignin isOption/></SigninSignup>}
              />
              <Route
                path='/Signup'
                element={<SigninSignup><Signup/></SigninSignup>}
              /> */}
              <Route
                path='/Home'
                element={<Home/>}
              />
              <Route
                path='/user'
                element={<UserTest/>}
              />
          </Routes>
        </Router>

      </div>
  );
}

export default App;
