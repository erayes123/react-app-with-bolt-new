import React from 'react';
import { Button } from '../components/ui/Button';
import { loginWithSSO } from '../services/auth';

export const LoginPage: React.FC = () => {
  const handleLogin = () => {
    loginWithSSO().catch(console.error);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>
        <p className="text-gray-600 text-center mb-8">
          Please sign in to access your account
        </p>
        <Button
          className="w-full"
          onClick={handleLogin}
        >
          Sign in with SSO
        </Button>
      </div>
    </div>
  );
};