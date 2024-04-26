import { createSlice } from '@reduxjs/toolkit'

 
const initialState = {
  isLogUser: false,
  token: "",
  userId: "",
  role:"",
  firstname: "",
  lastname: "",
  email: "",
  kidId: "",
  kidAvatar: "",
  kidUsername: "",
  kidFirstname:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogUser = true
      state.token = action.payload  
    },
    //******* */ modif ML ***************
    userId: (state, action) => {
      state.userId = action.payload
    },
    role: (state, action) => {
      state.role = action.payload
    },
    userFirstname: (state, action) => {
      state.firstname = action.payload
    },
    userLastname: (state, action) => {
      state.lastname = action.payload
    },
    userEmail: (state, action) => {
      state.email = action.payload
    },
    userKidId: (state, action) => {
      state.kidId = action.payload
    },
    userKidAvatar: (state, action) => {
      state.kidAvatar = action.payload
    },
    userKidUsername: (state, action) => {
      state.kidUsername = action.payload
    },
    userKidFirstname: (state, action) => {
      state.kidFirstname = action.payload
    },
    userLogout: (state) => {
      state.isLogUser = false
      state.token= ""
      state.userId= ""
      state.firstname= ""
      state.lastname= ""
      state.email= ""
      state.kidId= ""
      state.kidAvatar= ""
      state.kidUsername= ""
      state.kidFirstname = ""
      state.role = ""
    },
    userToken: (state, action) => {
      state.token = action.payload
    },
  }
})

export const { role, userToken, userLogin, userId, userFirstname, userLastname, userLogout , userKidId, userKidAvatar , userKidUsername, userKidFirstname, userEmail} = userSlice.actions

export default userSlice.reducer