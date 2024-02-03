import { configureStore } from '@reduxjs/toolkit'
import userReducer from './../Utils/Slices/login/userSlice'
import kidReducer from './../Utils/Slices/login/kidSlice' 
import apiReducer from './../Utils/Slices/api/apiSlice'
import searchBookReducer from './../Utils/Slices/book/searchBookSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    kid: kidReducer,
    api: apiReducer,
    searchBook: searchBookReducer,
  },
})
