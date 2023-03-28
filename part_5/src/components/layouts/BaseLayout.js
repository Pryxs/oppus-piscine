import React, {useContext} from 'react';
import Navbar from '../Navbar'
import { useSelector } from 'react-redux'

const BaseLayout = ({children}) =>{
    const user = useSelector((state) => state.auth.user)

    return(
        <>
        {user &&
            <Navbar/>
        }
        <main>{children}</main>
        </>
    )
}

export default BaseLayout;