import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from "../../services/auth.service";


export const loginUser = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {  
        try {
            const res = await AuthService.login(data);
            return res;
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const isAdmin = createAsyncThunk(
    'auth/isAdmin',
    async (token, { rejectWithValue }) => {  
        try {
            const admin = await AuthService.getUserPermission(token)
            return admin;
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue }) => {  
        try {
            const res = await AuthService.register(data)   
            return res;
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

