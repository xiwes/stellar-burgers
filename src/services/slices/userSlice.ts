import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  authRequest: boolean;
  authError: string | null;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  authRequest: false,
  authError: null
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    saveTokens(res.accessToken, res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    saveTokens(res.accessToken, res.refreshToken);
    return res.user;
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await getUserApi();
  if (!res.success) throw new Error('Не удалось получить пользователя');
  return res.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    if (!res.success) throw new Error('Не удалось обновить пользователя');
    return res.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
  return true;
});

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkApi) => {
    const token = getCookie('accessToken');
    const refresh = localStorage.getItem('refreshToken');
    if (!token || !refresh) return null;
    try {
      const res = await getUserApi();
      if (!res.success) return null;
      return res.user;
    } catch {
      return null;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.authError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(registerUser.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.authRequest = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authRequest = false;
        state.authError = action.error.message ?? 'Ошибка регистрации';
      })

      .addCase(loginUser.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authRequest = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authRequest = false;
        state.authError = action.error.message ?? 'Ошибка авторизации';
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.authRequest = true;
        state.authError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.authRequest = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.authRequest = false;
        state.authError = action.error.message ?? 'Ошибка обновления профиля';
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { resetAuthError } = userSlice.actions;
export default userSlice.reducer;
