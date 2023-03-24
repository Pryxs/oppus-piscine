import React, {useContext} from 'react';
import Navbar from '../Navbar'
import {UserContext} from '../../contexts/UserContext';

const BaseLayout = ({children}) =>{
    const userContext = useContext(UserContext)

    return(
        <>
        {userContext.isLogged &&
            <Navbar/>
        }
        <main>{children}</main>
        </>
    )
}

export default BaseLayout;