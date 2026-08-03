import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';
import type { TIngredient } from '../../utils/types';

const bun: TIngredient = {
  _id: 'bun_1',
  name: 'Булка',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: ''
};

const main1: TIngredient = {
  _id: 'main_1',
  name: 'Начинка 1',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 50,
  image: '',
  image_mobile: '',
  image_large: ''
};

const main2: TIngredient = {
  _id: 'main_2',
  name: 'Начинка 2',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 60,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('constructorSlice reducer', () => {
  it('addIngredient: добавляет булку', () => {
    const state = reducer(undefined, addIngredient(bun));
    expect(state.bun?._id).toBe('bun_1');
  });

  it('addIngredient: добавляет начинку', () => {
    const state = reducer(undefined, addIngredient(main1));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main_1');
    expect(state.ingredients[0].id).toBeDefined();
  });

  it('removeIngredient: удаляет начинку по id', () => {
    const s1 = reducer(undefined, addIngredient(main1));
    const idToRemove = s1.ingredients[0].id;

    const s2 = reducer(s1, removeIngredient(idToRemove));
    expect(s2.ingredients).toHaveLength(0);
  });

  it('moveIngredient: меняет порядок начинок', () => {
    const s1 = reducer(undefined, addIngredient(main1));
    const s2 = reducer(s1, addIngredient(main2));

    const s3 = reducer(s2, moveIngredient({ from: 0, to: 1 }));
    expect(s3.ingredients[0]._id).toBe('main_2');
    expect(s3.ingredients[1]._id).toBe('main_1');
  });
});