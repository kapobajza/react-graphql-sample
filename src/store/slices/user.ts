import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/models';
import { RootState } from '../store';

type InitialState = {
  data: User | null;
};

const initialState: InitialState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.data = {
        ...(state.data || {}),
        ...payload,
      };
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const { reducer: userReducer } = userSlice;

export const userSelector = (state: RootState) => state.user.data || undefined;
