import {Fragment} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Layout/Home';
import SigninSignun from './components/Layout/SigninSignup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path='/Signin-Signun'
            element={<SigninSignun/>}
          />

          <Route
            path='/Home'
            element={<Home/>}
          />
      
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
