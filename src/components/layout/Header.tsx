import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  title?: string;
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  isSidebarOpen,
  onMenuClick,
}) => {
  return (
    <header className="bg-white shadow-sm px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
      {!isSidebarOpen && (
        <Button
          variant="text"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </Button>
      )}
      <h1 className="text-xl font-semibold text-gray-800">
        {title || 'Portal'}
      </h1>
    </header>
  );
};