import { createAsyncThunk } from '@reduxjs/toolkit'
import ProductService from "../../services/product.service";

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async (data, { rejectWithValue }) => {  
        try {
            const res = await ProductService.getAll();
            return res;
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (data, { rejectWithValue, getState, dispatch }) => {  
        try {
            const token = getState().auth.user;
            await ProductService.create(data, token);
            dispatch(getProducts())
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, { rejectWithValue, getState, dispatch }) => {  
        try {
            const token = getState().auth.user;
            await ProductService.remove(id, token);
            dispatch(getProducts())
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (data, { rejectWithValue, getState, dispatch }) => {  
        try {
            const token = getState().auth.user;
            await ProductService.update(data['_id'], data, token);
            dispatch(getProducts())
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)



export const searchProducts = createAsyncThunk(
    'product/getProducts',
    async (data, { rejectWithValue }) => {  
        try {
            const res = await ProductService.get(data)
            return res;
        } catch (error) {
            return rejectWithValue('Erreur lors de l\'appel API')
        }
    }
)



