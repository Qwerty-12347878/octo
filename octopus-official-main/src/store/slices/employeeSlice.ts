import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Employee {
  id: string
  uniqueId: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  dateOfJoining: string
  state: string
  city: string
  status: 'active' | 'banned'
  totalExperience: number
  gender: 'male' | 'female' | 'other'
  emergencyContactName: string
  emergencyContactNumber: string
  currentAddress: string
  permanentAddress: string
  currentSalary: number
  highestQualification: string
  accountHolderName: string
  bankName: string
  accountNumber: string
  ifscCode: string
  designation: string
  technologies: string[]
  note: string
}

interface EmployeeState {
  employees: Employee[]
  filteredEmployees: Employee[]
  currentFilter: 'all' | 'active' | 'banned'
  currentPage: number
  pageSize: number
  loading: boolean
  totalPages: number
}

const initialState: EmployeeState = {
  employees: [],
  filteredEmployees: [],
  currentFilter: 'all',
  currentPage: 1,
  pageSize: 10,
  loading: false,
  totalPages: 0,
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload
      state.filteredEmployees = action.payload
      state.totalPages = Math.ceil(action.payload.length / state.pageSize)
    },
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload)
      employeeSlice.caseReducers.applyFilter(state)
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'banned'>) => {
      state.currentFilter = action.payload
      state.currentPage = 1
      employeeSlice.caseReducers.applyFilter(state)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    applyFilter: (state) => {
      if (state.currentFilter === 'all') {
        state.filteredEmployees = state.employees
      } else {
        state.filteredEmployees = state.employees.filter(emp => emp.status === state.currentFilter)
      }
      state.totalPages = Math.ceil(state.filteredEmployees.length / state.pageSize)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setEmployees, addEmployee, setFilter, setCurrentPage, setLoading } = employeeSlice.actions
export default employeeSlice.reducer