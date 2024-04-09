import './App.css';

import React from 'react';
import SignIn from './Components/Authentications/SignIn';
import SignUp from './Components/Authentications/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GlobalProvider } from './Components/Context/GlobalStorage';
import SecurePassNavBar from './Components/NavBar/SecurePassNavBar';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <SecurePassNavBar />
        <Router>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
