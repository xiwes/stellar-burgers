import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchProfileOrders } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.feed.profileOrders);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
