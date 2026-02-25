import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrder } from '../../utils/burger-api';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TNewOrder | null;
  orderError: string | null;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null,
  orderError: null
};

export const createOrder = createAsyncThunk<TNewOrder, string[]>(
  'burgerConstructor/createOrder',
  async (ingredientIds) => {
    const res = await orderBurgerApi(ingredientIds);
    return res.order;
  }
);

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.bun = item;
        } else {
          state.ingredients.push(item);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() } as TConstructorIngredient
      })
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const arr = state.ingredients;
      if (from < 0 || to < 0 || from >= arr.length || to >= arr.length) return;
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },

    closeOrderModal: (state) => {
      state.orderModalData = null;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
        state.orderModalData = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.ingredients = [];
        state.bun = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.error.message ?? 'Ошибка оформления заказа';
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  closeOrderModal
} = constructorSlice.actions;

export default constructorSlice.reducer;
