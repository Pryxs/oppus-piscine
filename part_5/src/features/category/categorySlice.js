import { createSlice } from '@reduxjs/toolkit'
import { getCategories } from './categoryActions'

const initialState = {
    categories: [],
    focusedCategory: {}
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setFocusedCategory: (state, actions) => {
            state.focusedCategory = actions.payload
        },
    },
    extraReducers: {
        [getCategories.fulfilled]: (state, { payload }) => {
            state.categories = payload
        },
    }
})

export const { setFocusedCategory } = categorySlice.actions

export default categorySlice.reducer


