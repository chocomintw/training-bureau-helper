import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import DebugWrapper from '../components/debug/debugWrapper';

const RootLayout: React.FC = () => {
  return (
    <DebugWrapper componentName="RootLayout">
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </DebugWrapper>
  );
};

export default RootLayout;