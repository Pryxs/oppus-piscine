import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

import styled from '@emotion/styled'
import {BaseButton} from '../styles/BaseButton'


const Nav = styled.nav`
    background-color: ${props => props.theme.primary};
    padding: 3rem 3rem 3rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ul{
        li{
            margin-bottom: 2rem;

        a{
            color: inherit;
            text-decoration: inherit;
            cursor: pointer;
            font-size: 20px;

                &:hover{
                    text-decoration: underline;
                    color: ${props => props.theme.dynamic};
                }
            }
        }
    }
`

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
        <Nav>
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
        </Nav>
    )
}

export default Navbar;