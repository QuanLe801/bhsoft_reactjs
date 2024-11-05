import Header from 'container/header';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export default function CustomLayout() {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
}
