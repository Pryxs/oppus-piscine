import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import AuthService from './services/auth.service';
import {UserContext} from './contexts/UserContext';
import { ThemeProvider } from '@emotion/react'
import {Global, css} from '@emotion/react'
import themes from './styles/themes'


import Home from './pages/Home'
import Management from './pages/Management'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import BaseLayout from './components/layouts/BaseLayout'


function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState(themes.lightMode);


  // USER STUFF

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
  

  // THEME STUFF

  const toggleTheme = () => {
    setTheme(theme.name === 'dark' ? themes.lightMode : themes.darkMode)
  }

  const globalCSS = css`
    body{
      background-color: ${theme.secondary};
      color: ${theme.textColor};
        min-height: 100vh;
        overflow: hidden;

      .toggle-theme{
        position: absolute;
        right: 20px;
        top: 20px;
        border: none;
        background-color: transparent;
        font-size: 24px;
        cursor: pointer;
        transform-origin: center;
        transition: ease-in-out .3s;

        &:hover{
          transform: scale(1.2);
          transition: ease-in-out .3s;
        }
      }

      #root{
        display: flex;
        gap: 2rem;
        height: 100vh;

        nav{
          height: 100%;
          background-color: ${theme.primary};
          padding: 2rem;

          ul{
            margin-bottom: 3rem;

            li{
              margin-bottom: 1rem;

              a{
                color: ${theme.textColor}
              }
            }
          }
        }

        ul{
          list-style-type: none;
          padding: 0;
        }
      }
    }
  `
  
  return (
    <Router>
      <UserContext.Provider value={{isLogged, isAdmin, setIsLogged: function(){
        setIsLogged()
      }}}>
        <ThemeProvider theme={theme}>
          <button className="toggle-theme" onClick={() => toggleTheme()}>{theme.name === 'dark' ? '🌞' : '🌛'}</button>
          <Global styles={globalCSS}/>
          <BaseLayout>
              <Routes>
                {isLogged ? (
                  <>
                    <Route exact path="/" element={<Home />}/>
                    {isAdmin &&
                      <Route exact path="/management" element={<Management />}/>
                    }
                    <Route exact path="*" element={<Error />}/>
                  </>
                ) : (
                  <>
                    <Route exact path="/login" element={<Login setIsLogged={setIsLogged} />}/>
                    <Route exact path="/register" element={<Register />}/>
                    <Route exact path="*" element={<Login />}/>
                  </>
                )}
              </Routes>
          </BaseLayout>
        </ThemeProvider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
