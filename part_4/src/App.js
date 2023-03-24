import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AuthService from './services/auth.service';
import {UserContext} from './contexts/UserContext';


import Home from './pages/Home'
import Management from './pages/Management'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import BaseLayout from './components/layouts/BaseLayout'

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  const checkUserToken = () => {
      const userToken = AuthService.getCurrentUser();
      userToken ? setIsLogged(true) : setIsLogged(false);
  }

  const checkUserPermission = async () => {
    if(isLogged) {
      const admin = await AuthService.getUserPermission()
      setIsAdmin(admin)
    } else {
      setIsAdmin(false)
    }  
  }

  useEffect(() => {
      checkUserToken();
      checkUserPermission();
  }, [isLogged]);

  return (
    <Router>
      <UserContext.Provider value={{isLogged, isAdmin, setIsLogged: function(){
        setIsLogged()
      }}}>
        <BaseLayout>
            <Routes>
              {isLogged &&
                <>
                  <Route exact path="/" element={<Home />}/>
                  {isAdmin &&
                    <Route exact path="/management" element={<Management />}/>
                  }
                  <Route exact path="*" element={<Error />}/>
                </>
              }
              <Route exact path="/login" element={<Login setIsLogged={setIsLogged} />}/>
              <Route exact path="/register" element={<Register />}/>
              <Route exact path="*" element={<Login />}/>
            </Routes>
        </BaseLayout>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
