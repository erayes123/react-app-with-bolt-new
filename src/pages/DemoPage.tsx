import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  UserCheck, 
  Shield, 
  LayoutDashboard, 
  FileText, 
  ClipboardList, 
  FilePlus, 
  FileSearch,
  User
} from 'lucide-react';

interface PageCard {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  color: string;
}

export const DemoPage: React.FC = () => {
  const navigate = useNavigate();

  const pages: PageCard[] = [
    {
      title: 'Login',
      description: 'SSO authentication with Identity Server 4',
      path: '/login',
      icon: <LogIn className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Complete Profile',
      description: 'Update missing profile information',
      path: '/complete-profile',
      icon: <UserCheck className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'OTP Verification',
      description: 'Verify phone number with OTP',
      path: '/verify-otp',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Dashboard',
      description: 'Overview of requests and services',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-6 h-6" />,
      color: 'bg-primary',
    },
    {
      title: 'Services',
      description: 'Browse available services',
      path: '/services',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-secondary',
    },
    {
      title: 'Requests',
      description: 'View and manage requests',
      path: '/requests',
      icon: <ClipboardList className="w-6 h-6" />,
      color: 'bg-third',
    },
    {
      title: 'Create Request',
      description: 'Submit a new request',
      path: '/requests/new',
      icon: <FilePlus className="w-6 h-6" />,
      color: 'bg-orange-500',
    },
    {
      title: 'Request Details',
      description: 'View request information',
      path: '/requests/123',
      icon: <FileSearch className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Profile',
      description: 'Manage profile information',
      path: '/profile',
      icon: <User className="w-6 h-6" />,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Application Pages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <div
              key={page.path}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => navigate(page.path)}
            >
              <div className={`${page.color} p-4 text-white`}>
                {page.icon}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
                <p className="text-gray-600">{page.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};