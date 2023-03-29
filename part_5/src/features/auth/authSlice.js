import { createSlice } from '@reduxjs/toolkit'
import { loginUser, checkUserPermission } from './authThunks'


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
        [checkUserPermission.fulfilled]: (state, { payload }) => {
          state.isAdmin = payload
        },
    }
})

export const { logout } = aurhSlice.actions

export const getUserSelector = state => state.auth.user
export const isAdminSelector = state => state.auth.isAdmin

export default aurhSlice.reducer


