import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

type TProps = {
  onlyUnAuth?: boolean;
  element: ReactElement;
};

export const ProtectedRoute: FC<TProps> = ({ onlyUnAuth = false, element }) => {
  const location = useLocation();
  const user = useSelector((s) => s.user.user);
  const isAuthChecked = useSelector((s) => s.user.isAuthChecked);

  if (!isAuthChecked) return null;

  if (onlyUnAuth && user) {
    const from = (location.state as any)?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return element;
};
