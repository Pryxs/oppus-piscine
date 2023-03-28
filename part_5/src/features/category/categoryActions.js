import { createAsyncThunk } from '@reduxjs/toolkit'
import CategoryService from "../../services/category.service";
import { getProducts } from '../product/productActions'



export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (data, { rejectWithValue }) => {  
        try {
            const res = await CategoryService.getAll();
            return res;
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const createCategory = createAsyncThunk(
    'product/createCategory',
    async (data, { rejectWithValue, getState, dispatch }) => {  
        try {
            const token = getState().auth.user;
            await CategoryService.create(data, token);
            dispatch(getCategories())
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const updateCategory = createAsyncThunk(
    'product/updateCategory',
    async (data, { rejectWithValue, getState, dispatch }) => {  
        try {
            const token = getState().auth.user;
            await CategoryService.update(data['_id'], data, token);
            dispatch(getCategories())
            dispatch(getProducts())
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id,{ rejectWithValue, getState, dispatch }) => {  
        try {
            const token = getState().auth.user;
            await CategoryService.remove(id, token);
            dispatch(getCategories())
            dispatch(getProducts())
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)








