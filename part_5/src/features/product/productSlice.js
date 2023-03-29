import { createSlice } from '@reduxjs/toolkit'
import { getProducts, searchProducts } from './productThunks'

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

export const getAllProductsSelector = state => state.product.products
export const getFocusedProductSelector = state => state.product.focusedProduct

export default productSlice.reducer


