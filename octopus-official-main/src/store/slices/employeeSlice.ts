import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Employee {
  id: string
  uniqueId: string
  firstName: string
  middleName?: string
  lastName: string
  email: string
  phoneNumber?: string
  dateOfBirth?: string
  dateOfJoining?: string
  state?: string
  city?: string
  status: 'active' | 'banned'
  totalExperience?: number
  gender: 'male' | 'female' | 'other' | ''
  emergencyContactName?: string
  emergencyContactNumber?: string
  currentAddress?: string
  permanentAddress?: string
  currentSalary?: number
  highestQualification?: string
  accountHolderName?: string
  bankName?: string
  accountNumber?: string
  ifscCode?: string
  designation?: string
  technologies?: string[]
  note?: string
}

interface EmployeeState {
  employees: Employee[]
  filteredEmployees: Employee[]
  currentFilter: 'all' | 'active' | 'banned'
  currentPage: number
}

const initialState: EmployeeState = {
  employees: [],
  filteredEmployees: [],
  currentFilter: 'all',
  currentPage: 1
}

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload
      state.filteredEmployees = action.payload
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.employees.push(action.payload)
      // Update filteredEmployees based on current filter
      if (state.currentFilter === 'all' || action.payload.status === state.currentFilter) {
        state.filteredEmployees.push(action.payload)
      }
    },
    removeEmployee(state, action: PayloadAction<string>) {
      state.employees = state.employees.filter(emp => emp.id !== action.payload)
      state.filteredEmployees = state.filteredEmployees.filter(emp => emp.id !== action.payload)
    },
    updateEmployee(state, action: PayloadAction<{ id: string, changes: Partial<Employee> }>) {
      const { id, changes } = action.payload
      const index = state.employees.findIndex(emp => emp.id === id)
      if (index !== -1) {
        state.employees[index] = { ...state.employees[index], ...changes }
      }

      const filteredIndex = state.filteredEmployees.findIndex(emp => emp.id === id)
      if (filteredIndex !== -1) {
        state.filteredEmployees[filteredIndex] = { ...state.filteredEmployees[filteredIndex], ...changes }
      }
    },
    setFilter(state, action: PayloadAction<'all' | 'active' | 'banned'>) {
      state.currentFilter = action.payload
      state.filteredEmployees = action.payload === 'all'
        ? state.employees
        : state.employees.filter(emp => emp.status === action.payload)
      state.currentPage = 1
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    }
  }
})

export const { setEmployees, addEmployee, removeEmployee, updateEmployee, setFilter, setCurrentPage } = employeeSlice.actions
export default employeeSlice.reducer
