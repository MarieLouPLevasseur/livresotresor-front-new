import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // TODO changer la valeur en dynamique pour production?
  apiUrl: 'http://localhost:8000',
}


export const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    apiUrl: (state) => {
      return state.apiUrl
    }
  }
})

export const { apiUrl } = apiSlice.actions

export default apiSlice.reducer