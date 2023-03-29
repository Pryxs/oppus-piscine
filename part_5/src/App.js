import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from '@emotion/react'
import {Global, css} from '@emotion/react'
import themes from './styles/themes'

import { connect } from 'react-redux'
import { checkUserPermission } from './features/auth/authThunks'
import { getUserSelector, isAdminSelector } from './features/auth/authSlice'

import Home from './pages/Home'
import Management from './pages/Management'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './pages/Error'
import BaseLayout from './components/layouts/BaseLayout'


function App({user, isAdmin, checkUserPermission}) {
  const [theme, setTheme] = useState(themes.lightMode);

  useEffect(() => {
    console.log({user})
    if(user) checkUserPermission(user)
  }, [user]);


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

        ul{
          list-style-type: none;
          padding: 0;
        }
      }
    }
  `

  // const ButtonStyle = styled.div({
  //   backgroundColor: 'red',
  // })

  // const button = styled.div(({color}) => ({
  //   backgroundColor: color,
  //   'h1': {

  //   }
  // }))
  
  return (
    <Router>
        <ThemeProvider theme={theme}>
          <button className="toggle-theme" onClick={() => toggleTheme()}>{theme.name === 'dark' ? '🌞' : '🌛'}</button>
          <Global styles={globalCSS}/>
          <BaseLayout>
              <Routes>
                {user ? (
                  <>
                    <Route path="/" element={<Home />}/>
                    {isAdmin &&
                      <Route path="/management" element={<Management />}/>
                    }
                    <Route path="*" element={<Error />}/>
                  </>
                ) : (
                  <>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="*" element={<Login />}/>
                  </>
                )}
              </Routes>
          </BaseLayout>
        </ThemeProvider>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    user : getUserSelector(state),
    isAdmin : isAdminSelector(state)
  }
}

const mapDispatchToProps = {
  checkUserPermission,
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
