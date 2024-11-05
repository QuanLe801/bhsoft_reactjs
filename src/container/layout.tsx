import Header from 'container/header';
import { Outlet } from 'react-router-dom';

export default function CustomLayout() {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
}
