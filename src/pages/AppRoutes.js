import { Navigate, Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { useChat } from '../hooks/useChat';
import { StoreContext } from '../context/store';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import MiniDrawer from '../components/MiniDrawer';
import FilterBar from '../components/FilterBar';

const AppRoutes = observer(() => {
  useChat();
  const { userStore } = useContext(StoreContext);

  return (
    <>
      {window.location.pathname !== '/auth' && <MiniDrawer />}
      {window.location.pathname !== '/auth' && <FilterBar />}
      <Routes>
        {publicRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} exact />;
        })}
        {userStore.isLoggedIn ? (
          authRoutes.map(({ path, Component }) => {
            return (
              <Route key={path} path={path} element={<Component />} exact />
            );
          })
        ) : (
          <Route path="*" element={<Navigate to="/auth" replace />} />
        )}
      </Routes>
    </>
  );
});

export default AppRoutes;
