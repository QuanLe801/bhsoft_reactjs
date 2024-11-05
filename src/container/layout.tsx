import Header from 'container/header';
import { ReactNode } from 'react';

export default function CustomLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${className}`}>
      <Header />
      {children}
    </section>
  );
}
