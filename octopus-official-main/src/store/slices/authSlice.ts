import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  designation: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  loading: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false
    },
    loginFailure: (state) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer