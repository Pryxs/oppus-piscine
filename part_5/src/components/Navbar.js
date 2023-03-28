import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

import styled from '@emotion/styled'
import {BaseButton} from '../styles/BaseButton'


const Button = styled.button`
    ${BaseButton}
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.secondary};
`

const Navbar = () =>{
    const isAdmin = useSelector((state) => state.auth.isAdmin)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutEvent = () => {
        dispatch(logout())
        navigate('/login')
    }

    return(
        <nav>
            <ul>
                <li>
                    <Link to={''}>Accueil</Link>
                </li>
                {isAdmin &&
                <li>
                    <Link to={'management'}>Gestionnaire</Link>
                </li>
                }
            </ul>

            <Button onClick={logoutEvent}>Déconnexion</Button>
        </nav>
    )
}

export default Navbar;