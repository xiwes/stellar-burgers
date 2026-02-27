import { rootReducer } from './rootReducer';

describe('rootReducer', () => {
  it('возвращает initial state при UNKNOWN_ACTION', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: { items: [], isLoading: false, error: null },
      burgerConstructor: {
        bun: null,
        ingredients: [],
        orderRequest: false,
        orderModalData: null,
        orderError: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null,
        profileOrders: [],
        profileLoading: false,
        profileError: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        authRequest: false,
        authError: null
      },
      orderDetails: { order: null, isLoading: false, error: null }
    });
  });
});