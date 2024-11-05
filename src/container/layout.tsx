import { getCartAsync } from 'actions/cartActions';
import Header from 'container/header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from 'reducers/rootReducer';

export default function CustomLayout() {
  const user = useSelector((state: RootState) => state.user);
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getCartAsync());
  }, [user?.data]);

  return (
    <section>
      {user.data && <Header user={user.data} cartProducts={cartProducts} />}
      <Outlet />
    </section>
  );
}
