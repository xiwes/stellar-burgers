// src/components/app-header/app-header.tsx

import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../ui/app-header/app-header.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useSelector } from '../../services/store';

const linkClassName = ({ isActive }: { isActive: boolean }) =>
  `${styles.link} ${isActive ? styles.link_active : styles.link_inactive}`;

const profileLinkClassName = ({ isActive }: { isActive: boolean }) =>
  `${styles.link_position_last} ${styles.link} ${
    isActive ? styles.link_active : styles.link_inactive
  }`;

export const AppHeader: FC = () => {
  const userName = useSelector((s) => s.user.user?.name);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink to='/' end className={linkClassName}>
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2 mr-10'>
                  Конструктор
                </p>
              </>
            )}
          </NavLink>

          <NavLink to='/feed' className={linkClassName}>
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <p className='text text_type_main-default ml-2'>
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className='' />
        </div>

        <NavLink to='/profile' className={profileLinkClassName}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
