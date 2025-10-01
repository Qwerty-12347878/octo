// import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// interface User {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
//   designation: string
// }

// interface AuthState {
//   isAuthenticated: boolean
//   user: User | null
//   loading: boolean
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
//   loading: false,
// }

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.loading = true
//     },
//     loginSuccess: (state, action: PayloadAction<User>) => {
//       state.isAuthenticated = true
//       state.user = action.payload
//       state.loading = false
//     },
//     loginFailure: (state) => {
//       state.loading = false
//       state.isAuthenticated = false
//       state.user = null
//     },
//     logout: (state) => {
//       state.isAuthenticated = false
//       state.user = null
//     },
//   },
// })

// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
// export default authSlice.reducer


import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  designation: string
}

interface Tokens {
  accessToken: string | null
  refreshToken: string | null
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  tokens: Tokens
  loading: boolean
  error: string | null
}

// Helper function to save auth data to localStorage
const saveAuthDataToStorage = (user: User | null, tokens: Tokens) => {
  if (user) {
    localStorage.setItem("userData", JSON.stringify(user))
  }
  if (tokens.accessToken || tokens.refreshToken) {
    localStorage.setItem("tokens", JSON.stringify(tokens))
  }
}

// Helper function to clear auth data from localStorage
const clearAuthDataFromStorage = () => {
  localStorage.removeItem("userData")
  localStorage.removeItem("tokens")
}

// Helper function to get auth data from localStorage
const getAuthDataFromStorage = () => {
  const userData = localStorage.getItem("userData")
  const tokens = localStorage.getItem("tokens")
  
  return {
    user: userData ? JSON.parse(userData) : null,
    tokens: tokens ? JSON.parse(tokens) : { accessToken: null, refreshToken: null }
  }
}

const storedAuthData = getAuthDataFromStorage()

const initialState: AuthState = {
  isAuthenticated: !!(storedAuthData.tokens.accessToken && storedAuthData.user),
  user: storedAuthData.user,
  tokens: storedAuthData.tokens,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; tokens?: Tokens }>
    ) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.tokens = action.payload.tokens || { accessToken: null, refreshToken: null }
      state.loading = false
      state.error = null

      // Save both user data and tokens to localStorage
      saveAuthDataToStorage(action.payload.user, state.tokens)
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.tokens = { accessToken: null, refreshToken: null }
      state.error = action.payload
      clearAuthDataFromStorage()
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.tokens = { accessToken: null, refreshToken: null }
      state.loading = false
      state.error = null
      clearAuthDataFromStorage()
    },
    restoreAuth: (state) => {
      const storedAuthData = getAuthDataFromStorage()
      if (storedAuthData.tokens.accessToken && storedAuthData.user) {
        state.tokens = storedAuthData.tokens
        state.user = storedAuthData.user
        state.isAuthenticated = true
      }
    },
    // Add this action to update user data separately if needed
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      // Also update localStorage
      localStorage.setItem("userData", JSON.stringify(action.payload))
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, restoreAuth, setUser } = authSlice.actions
export default authSlice.reducer