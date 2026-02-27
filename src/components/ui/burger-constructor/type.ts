import type { TIngredient, TConstructorIngredient } from '@utils-types';
import type { TNewOrder } from '../../../utils/burger-api';

export type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: TNewOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
