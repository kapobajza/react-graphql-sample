import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { container } from 'tsyringe';

import { StorageService } from '../../services/Storage.service';
import { User } from '../../types/models';
import { AppDispatch, RootState } from '../store';

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

const storageService = container.resolve(StorageService);

export const storeUser = (user: User) => (dispatch: AppDispatch) => {
  storageService.setUser(user);
  dispatch(setUser(user));
};

export const clearStoredUser = () => (disptch: AppDispatch) => {
  storageService.removeUser();
  disptch(clearUser());
};
