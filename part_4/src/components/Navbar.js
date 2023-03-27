import React, { useContext } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate, Link } from "react-router-dom";
import {UserContext} from '../contexts/UserContext';

import styled from '@emotion/styled'
import {BaseButton} from '../styles/BaseButton'


const Button = styled.button`
    ${BaseButton}
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.secondary};
`


const Navbar = () =>{
    const navigate = useNavigate()
    const userContext = useContext(UserContext)

    const logout = () => {
        AuthService.logout()
        userContext.setIsLogged()
        navigate('/login')
    }

    return(
        <nav>
            <ul>
                <li>
                    <Link to={''}>Accueil</Link>
                </li>
                {userContext.isAdmin &&
                <li>
                    <Link to={'management'}>Gestionnaire</Link>
                </li>
                }
            </ul>

            <Button onClick={logout}>Déconnexion</Button>
        </nav>
    )
}

export default Navbar;