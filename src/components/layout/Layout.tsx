import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet, useLocation } from 'react-router-dom';

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/services': 'Services',
    '/requests': 'Requests',
    '/requests/new': 'Create Request',
    '/profile': 'Profile'
  };
  
  // Handle dynamic routes
  if (pathname.startsWith('/requests/') && pathname !== '/requests/new') {
    return 'Request Details';
  }
  
  return routes[pathname] || 'Portal';
};

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Mobile */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden transition-transform duration-300 ease-in-out fixed left-0 top-0 bottom-0 z-30 w-[280px]`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-64">
        <div className="fixed h-full">
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          title={pageTitle}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};