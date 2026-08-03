import reducer, { fetchIngredients } from './ingredientsSlice';
import type { TIngredient } from '../../utils/types';

const mockItems: TIngredient[] = [
  {
    _id: '1',
    name: 'test',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice async actions', () => {
  it('pending: isLoading -> true', () => {
    const state = reducer(undefined, fetchIngredients.pending('req', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fulfilled: записывает items и isLoading -> false', () => {
    const state = reducer(
      undefined,
      fetchIngredients.fulfilled(mockItems, 'req', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockItems);
  });

  it('rejected: записывает error и isLoading -> false', () => {
    const state = reducer(
      undefined,
      fetchIngredients.rejected(new Error('fail'), 'req', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeTruthy();
  });
});