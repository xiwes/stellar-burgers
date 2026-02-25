import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.feed.orders);
  const isLoading = useSelector((s) => s.feed.isLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (isLoading && !orders.length) return <Preloader />;

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
