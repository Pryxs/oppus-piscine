import React, { useContext } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate, Link } from "react-router-dom";
import {UserContext} from '../contexts/UserContext';


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
                <li>
                    <button onClick={logout}>Déconnexion</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;