import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, X } from 'lucide-react';
import { logout } from '../../services/auth';
import { Button } from '../ui/Button';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const handleLogout = () => {
    logout().catch(console.error);
  };

  return (
    <div className="w-[280px] lg:w-64 bg-secondary text-white h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Portal</h1>
          {onClose && (
            <Button
              variant="text"
              className="lg:hidden text-white hover:text-white/80"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </Button>
          )}
        </div>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition-colors ${
                isActive ? 'bg-primary' : 'hover:bg-primary/20'
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/services"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition-colors ${
                isActive ? 'bg-primary' : 'hover:bg-primary/20'
              }`
            }
          >
            <FileText className="w-5 h-5" />
            <span>Services</span>
          </NavLink>
          <NavLink
            to="/requests"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition-colors ${
                isActive ? 'bg-primary' : 'hover:bg-primary/20'
              }`
            }
          >
            <FileText className="w-5 h-5" />
            <span>Requests</span>
          </NavLink>
          <NavLink
            to="/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md transition-colors ${
                isActive ? 'bg-primary' : 'hover:bg-primary/20'
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span>Profile</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-primary/20 w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};