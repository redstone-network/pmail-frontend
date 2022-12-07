import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

interface CounterState {
  value: string
}
const initialState: CounterState = {
  value: ''
}
export const counterSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    }
  }
})
export const { setAccount } = counterSlice.actions
export const selectCount = (state: RootState) => state.account.value

export default counterSlice.reducer
