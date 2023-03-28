import { createSlice } from '@reduxjs/toolkit'
import { getProducts, searchProducts } from './productActions'

const initialState = {
    products: [],
    focusedProduct: {}
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFocusedProduct: (state, actions) => {
            state.focusedProduct = actions.payload
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, { payload }) => {
            state.products = payload
        },
        [searchProducts.fulfilled]: (state, { payload }) => {
            state.products = payload
        },
    }
})

export const { setFocusedProduct } = productSlice.actions

export default productSlice.reducer


