import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterNav from '../components/FooterNav';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterNav />
    </div>
  );
};

export default AppLayout;
