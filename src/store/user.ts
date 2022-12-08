import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

interface UserState {
  name: string
  id: string
}

const initialState: UserState = {
  name: '',
  id: ''
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    }
  }
})

export const { setName, setId } = userSlice.actions

export const user = (state: RootState) => state.user.name

export default userSlice.reducer
