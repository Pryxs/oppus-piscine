import { createSlice } from '@reduxjs/toolkit'
import { loginUser, isAdmin } from './authActions'


const initialState = {
    user: null,
    isAdmin: false
}

const aurhSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
        },
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, { payload }) => {
          state.user = payload
        },
        [isAdmin.fulfilled]: (state, { payload }) => {
          state.isAdmin = payload
        },
    }
})

export const { logout } = aurhSlice.actions

export default aurhSlice.reducer


