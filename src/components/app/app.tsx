import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import {
  AppHeader,
  Modal,
  IngredientDetails,
  OrderInfo,
  ProtectedRoute
} from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { checkAuth } from '../../services/slices/userSlice';
import { clearOrderDetails } from '../../services/slices/orderDetailsSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = (location.state as any)?.background;

  const isIngredientsLoading = useSelector((s) => s.ingredients.isLoading);
  const ingredients = useSelector((s) => s.ingredients.items);
  const error = useSelector((s) => s.ingredients.error);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkAuth());
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(clearOrderDetails());
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error}
        </div>
      ) : ingredients.length === 0 ? (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет ингредиентов
        </div>
      ) : (
        <>
          <Routes location={background || location}>
            <Route path='/' element={<ConstructorPage />} />

            <Route path='/feed' element={<Feed />} />

            <Route
              path='/login'
              element={<ProtectedRoute onlyUnAuth element={<Login />} />}
            />
            <Route
              path='/register'
              element={<ProtectedRoute onlyUnAuth element={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth element={<ForgotPassword />} />
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth element={<ResetPassword />} />
              }
            />

            <Route
              path='/profile'
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path='/profile/orders'
              element={<ProtectedRoute element={<ProfileOrders />} />}
            />

            {/* Страницы при прямом заходе */}
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route
              path='/profile/orders/:number'
              element={<ProtectedRoute element={<OrderInfo />} />}
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {/* Модалки только если есть background */}
          {background && (
            <Routes>
              <Route
                path='/ingredients/:id'
                element={
                  <Modal onClose={handleCloseModal} title='Детали ингредиента'>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:number'
                element={
                  <Modal onClose={handleCloseModal} title='Детали заказа'>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <ProtectedRoute
                    element={
                      <Modal onClose={handleCloseModal} title='Детали заказа'>
                        <OrderInfo />
                      </Modal>
                    }
                  />
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
