import React from 'react';

export const UserContext = React.createContext({
    isLogged : false,
    isAdmin : false,
});