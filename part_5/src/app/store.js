import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/product/productSlice'
import categoryReducer from '../features/category/categorySlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
  },
})