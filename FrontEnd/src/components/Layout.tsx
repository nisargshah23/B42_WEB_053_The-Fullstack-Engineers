import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { LayoutDashboard, Truck, Users, PenTool as Tool, FileBarChart, LogOut, Menu, ChevronLeft, X } from 'lucide-react';

const Layout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsExpanded(!isMobileView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Vehicles', href: '/vehicles', icon: Truck },
    { name: 'Drivers', href: '/drivers', icon: Users },
    { name: 'Maintenance', href: '/maintenance', icon: Tool },
    { name: 'Reports', href: '/reports', icon: FileBarChart },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-blue-600 rounded-md text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className="flex h-screen">
        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          ${isMobile ? 'fixed z-50' : 'relative'}
          ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          ${!isMobile && !isExpanded ? 'w-16' : 'w-64'}
          bg-white shadow-lg transition-all duration-300 h-full
        `}>
          <div className="flex relative flex-col h-full">
            <div className={`flex items-center h-16 px-4 bg-blue-600 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
              {(isExpanded || isSidebarOpen) && <h1 className="text-xl font-bold text-white">Fleet Manager</h1>}
              {!isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:text-gray-200"
                >
                  {isExpanded ? <ChevronLeft className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white absolute left-[90%] hover:text-gray-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="flex-1 py-6 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => isMobile && setIsSidebarOpen(false)}
                    className={`
                      flex items-center px-2 py-2 text-sm font-medium rounded-md mx-2
                      ${location.pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                      ${!isMobile && !isExpanded ? 'justify-center' : ''}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {(isExpanded || isSidebarOpen) && <span className="ml-3">{item.name}</span>}
                  </Link>
                );
              })}
            </div>

            <div className="p-4 border-t">
              <div className={`flex items-center ${!isMobile && !isExpanded ? 'justify-center' : 'justify-between'}`}>
                {(isExpanded || isSidebarOpen) && (
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-500"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <main className={`p-6 ${isMobile ? 'mt-16' : ''}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;